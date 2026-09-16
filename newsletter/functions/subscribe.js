const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');
const { v4: uuidv4 } = require('uuid');

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const ses = new SESClient({});
const ssm = new SSMClient({});

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'https://kumar-ayush.com',
};

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
    const email = (body.email || '').toLowerCase().trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Invalid email address' }) };
    }

    const existing = await dynamo.send(new GetCommand({
      TableName: process.env.SUBSCRIBERS_TABLE,
      Key: { email },
    }));

    if (existing.Item?.status === 'confirmed') {
      return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ message: 'Already subscribed' }) };
    }

    const [apiUrl, fromEmail] = await Promise.all([
      getParam('api-url'),
      getParam('from-email'),
    ]);

    const confirmation_token = uuidv4();
    const unsubscribe_token = uuidv4();

    await dynamo.send(new PutCommand({
      TableName: process.env.SUBSCRIBERS_TABLE,
      Item: {
        email,
        status: 'pending',
        subscriber_type: 'free',
        subscribed_at: new Date().toISOString(),
        confirmation_token,
        unsubscribe_token,
      },
    }));

    const confirmUrl = `${apiUrl}/confirm?token=${confirmation_token}`;

    await ses.send(new SendEmailCommand({
      Source: fromEmail,
      Destination: { ToAddresses: [email] },
      Message: {
        Subject: { Data: 'Confirm your subscription to Kumar Ayush' },
        Body: {
          Html: {
            Data: `
              <p>Thanks for subscribing.</p>
              <p><a href="${confirmUrl}">Click here to confirm your email address</a></p>
              <p style="color:#999;font-size:12px;">If you didn't subscribe, ignore this email.</p>
            `,
          },
          Text: {
            Data: `Thanks for subscribing to Kumar Ayush's blog.\n\nConfirm your email: ${confirmUrl}\n\nIf you didn't subscribe, ignore this email.`,
          },
        },
      },
    }));

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ message: 'Check your email to confirm your subscription' }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Something went wrong' }) };
  }
};
