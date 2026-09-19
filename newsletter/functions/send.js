const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { SESClient, SendRawEmailCommand } = require('@aws-sdk/client-ses');
const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');
const Parser = require('rss-parser');
const { convert } = require('html-to-text');
const { buildEmailHtml } = require('../lib/email');

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const ses = new SESClient({});
const ssm = new SSMClient({});
const parser = new Parser();

async function getParam(name) {
  const res = await ssm.send(new GetParameterCommand({ Name: `/newsletter/${name}`, WithDecryption: true }));
  return res.Parameter.Value;
}


exports.handler = async (event) => {
  const [rssUrl, siteUrl, apiUrl, fromEmail, startDate] = await Promise.all([
    getParam('rss-url'),
    getParam('site-url'),
    getParam('api-url'),
    getParam('from-email'),
    getParam('start-date'),
  ]);

  const feed = await parser.parseURL(rssUrl);
  let sent = null;

  // Process newest-first; stop after sending one to avoid batching multiple posts
  const startMs = new Date(startDate).getTime();

  for (const item of feed.items) {
    if (new Date(item.pubDate).getTime() < startMs) continue;

    const guid = item.guid || item.link;

    const existing = await dynamo.send(new GetCommand({
      TableName: process.env.SENT_ISSUES_TABLE,
      Key: { guid },
    }));
    if (existing.Item) continue;

    const { Items: subscribers = [] } = await dynamo.send(new ScanCommand({
      TableName: process.env.SUBSCRIBERS_TABLE,
      FilterExpression: '#s = :confirmed',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: { ':confirmed': 'confirmed' },
    }));

    sent = item.title;
    console.log(`Sending "${item.title}" to ${subscribers.length} subscribers`);

    for (const subscriber of subscribers) {
      const unsubUrl = `${apiUrl}/unsubscribe?token=${subscriber.unsubscribe_token}`;
      const html = buildEmailHtml(item, siteUrl, unsubUrl);
      const text = convert(html, { wordwrap: 80 });

      const boundary = `----=_Part_${Date.now()}`;
      const rawEmail = [
        `From: Kumar Ayush <${fromEmail}>`,
        `To: ${subscriber.email}`,
        `Subject: ${item.title}`,
        `MIME-Version: 1.0`,
        `List-Unsubscribe: <${unsubUrl}>`,
        `List-Unsubscribe-Post: List-Unsubscribe=One-Click`,
        `Content-Type: multipart/alternative; boundary="${boundary}"`,
        ``,
        `--${boundary}`,
        `Content-Type: text/plain; charset=UTF-8`,
        ``,
        text,
        ``,
        `--${boundary}`,
        `Content-Type: text/html; charset=UTF-8`,
        ``,
        html,
        ``,
        `--${boundary}--`,
      ].join('\r\n');

      await ses.send(new SendRawEmailCommand({
        RawMessage: { Data: Buffer.from(rawEmail) },
      }));
    }

    await dynamo.send(new PutCommand({
      TableName: process.env.SENT_ISSUES_TABLE,
      Item: { guid, sent_at: new Date().toISOString(), title: item.title },
    }));

    break; // one post per run
  }

  return sent ? { sent } : { sent: null, message: 'No new posts to send.' };
};
