const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const ssm = new SSMClient({});

async function getParam(name) {
  const res = await ssm.send(new GetParameterCommand({ Name: `/newsletter/${name}`, WithDecryption: true }));
  return res.Parameter.Value;
}

exports.handler = async (event) => {
  const token = event.queryStringParameters?.token;

  if (!token) {
    return { statusCode: 400, body: 'Invalid unsubscribe link.' };
  }

  const result = await dynamo.send(new QueryCommand({
    TableName: process.env.SUBSCRIBERS_TABLE,
    IndexName: 'UnsubscribeTokenIndex',
    KeyConditionExpression: 'unsubscribe_token = :token',
    ExpressionAttributeValues: { ':token': token },
  }));

  const subscriber = result.Items?.[0];

  if (!subscriber) {
    return { statusCode: 404, body: 'Unsubscribe link not found.' };
  }

  await dynamo.send(new UpdateCommand({
    TableName: process.env.SUBSCRIBERS_TABLE,
    Key: { email: subscriber.email },
    UpdateExpression: 'SET #s = :unsubscribed, unsubscribed_at = :now',
    ExpressionAttributeNames: { '#s': 'status' },
    ExpressionAttributeValues: {
      ':unsubscribed': 'unsubscribed',
      ':now': new Date().toISOString(),
    },
  }));

  const siteUrl = await getParam('site-url');

  return {
    statusCode: 302,
    headers: { Location: `${siteUrl}/newsletter/?unsubscribed=true` },
  };
};
