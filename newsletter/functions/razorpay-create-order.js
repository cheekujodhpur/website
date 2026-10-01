const Razorpay = require('razorpay');
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
    const amount = parseInt(body.amount, 10);

    if (!amount || amount < 100) {
      return {
        statusCode: 400,
        headers: corsHeaders(event),
        body: JSON.stringify({ error: 'Amount must be at least ₹1 (100 paise)' }),
      };
    }

    const [keyId, keySecret] = await Promise.all([
      getParam('razorpay-key-id'),
      getParam('razorpay-key-secret'),
    ]);

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `tip_${Date.now()}`,
    });

    return {
      statusCode: 200,
      headers: corsHeaders(event),
      body: JSON.stringify({
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
      }),
    };
  } catch (err) {
    console.error('create-order error:', err);
    return {
      statusCode: 500,
      headers: corsHeaders(event),
      body: JSON.stringify({ error: 'Failed to create order' }),
    };
  }
};
