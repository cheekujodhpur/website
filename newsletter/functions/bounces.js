const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, UpdateCommand } = require('@aws-sdk/lib-dynamodb');

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));

exports.handler = async (event) => {
  for (const record of event.Records) {
    const message = JSON.parse(record.Sns.Message);
    const { notificationType } = message;

    if (notificationType === 'Bounce') {
      // Only act on permanent (hard) bounces — transient ones may recover
      if (message.bounce.bounceType !== 'Permanent') continue;

      for (const recipient of message.bounce.bouncedRecipients) {
        const email = recipient.emailAddress.toLowerCase();
        await dynamo.send(new UpdateCommand({
          TableName: process.env.SUBSCRIBERS_TABLE,
          Key: { email },
          UpdateExpression: 'SET #s = :bounced, bounced_at = :now',
          ExpressionAttributeNames: { '#s': 'status' },
          ExpressionAttributeValues: { ':bounced': 'bounced', ':now': new Date().toISOString() },
        }));
        console.log(`Hard bounce: ${email}`);
      }
    } else if (notificationType === 'Complaint') {
      for (const recipient of message.complaint.complainedRecipients) {
        const email = recipient.emailAddress.toLowerCase();
        await dynamo.send(new UpdateCommand({
          TableName: process.env.SUBSCRIBERS_TABLE,
          Key: { email },
          UpdateExpression: 'SET #s = :unsubscribed, unsubscribed_at = :now',
          ExpressionAttributeNames: { '#s': 'status' },
          ExpressionAttributeValues: { ':unsubscribed': 'unsubscribed', ':now': new Date().toISOString() },
        }));
        console.log(`Complaint (unsubscribed): ${email}`);
      }
    }
  }
};
