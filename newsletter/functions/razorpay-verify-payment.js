const crypto = require('crypto');
const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');

const ssm = new SSMClient({});

const ALLOWED_ORIGINS = ['https://kumar-ayush.com', 'http://localhost:8000'];

function corsHeaders(event) {
  const origin = (event.headers || {})['origin'] || (event.headers || {})['Origin'] || '';
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  };
}

async function getParam(name) {
  const res = await ssm.send(new GetParameterCommand({
    Name: `/newsletter/${name}`,
    WithDecryption: true,
  }));
  return res.Parameter.Value;
}

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return {
        statusCode: 400,
        headers: corsHeaders(event),
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const keySecret = await getParam('razorpay-key-secret');
    const generated = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated !== razorpay_signature) {
      return {
        statusCode: 400,
        headers: corsHeaders(event),
        body: JSON.stringify({ error: 'Payment verification failed' }),
      };
    }

    return {
      statusCode: 200,
      headers: corsHeaders(event),
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('verify-payment error:', err);
    return {
      statusCode: 500,
      headers: corsHeaders(event),
      body: JSON.stringify({ error: 'Verification failed' }),
    };
  }
};
