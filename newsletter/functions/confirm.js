const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const ses = new SESClient({});
const ssm = new SSMClient({});

async function getParam(name) {
  const res = await ssm.send(new GetParameterCommand({ Name: `/newsletter/${name}`, WithDecryption: true }));
  return res.Parameter.Value;
}

exports.handler = async (event) => {
  const token = event.queryStringParameters?.token;

  if (!token) {
    return { statusCode: 400, body: 'Invalid confirmation link.' };
  }

  const result = await dynamo.send(new QueryCommand({
    TableName: process.env.SUBSCRIBERS_TABLE,
    IndexName: 'ConfirmationTokenIndex',
    KeyConditionExpression: 'confirmation_token = :token',
    ExpressionAttributeValues: { ':token': token },
  }));

  const subscriber = result.Items?.[0];

  if (!subscriber) {
    return { statusCode: 404, body: 'Confirmation link not found or already used.' };
  }

  const [siteUrl, apiUrl, fromEmail] = await Promise.all([
    getParam('site-url'),
    getParam('api-url'),
    getParam('from-email'),
  ]);

  if (subscriber.status === 'confirmed') {
    return { statusCode: 302, headers: { Location: `${siteUrl}/newsletter/?subscribed=already` } };
  }

  await dynamo.send(new UpdateCommand({
    TableName: process.env.SUBSCRIBERS_TABLE,
    Key: { email: subscriber.email },
    UpdateExpression: 'SET #s = :confirmed, confirmed_at = :now REMOVE confirmation_token',
    ExpressionAttributeNames: { '#s': 'status' },
    ExpressionAttributeValues: {
      ':confirmed': 'confirmed',
      ':now': new Date().toISOString(),
    },
  }));

  const unsubUrl = `${apiUrl}/unsubscribe?token=${subscriber.unsubscribe_token}`;

  await ses.send(new SendEmailCommand({
    Source: `Kumar Ayush <${fromEmail}>`,
    Destination: { ToAddresses: [subscriber.email] },
    Message: {
      Subject: { Data: "You're subscribed to Kumar Ayush" },
      Body: {
        Html: {
          Data: `
            <p>You're confirmed. You'll get an email whenever a new post is published.</p>
            <p><a href="${siteUrl}/blog/">Visit the blog</a></p>
            <p style="color:#999;font-size:12px;"><a href="${unsubUrl}" style="color:#999;">Unsubscribe</a></p>
          `,
        },
        Text: {
          Data: `You're confirmed. You'll get an email whenever a new post is published.\n\nVisit: ${siteUrl}\nUnsubscribe: ${unsubUrl}`,
        },
      },
    },
  }));

  return {
    statusCode: 302,
    headers: { Location: `${siteUrl}/newsletter/?subscribed=true` },
  };
};
