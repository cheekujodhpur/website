const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { SESClient, SendRawEmailCommand } = require('@aws-sdk/client-ses');
const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');
const Parser = require('rss-parser');
const { convert } = require('html-to-text');

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const ses = new SESClient({});
const ssm = new SSMClient({});
const parser = new Parser({ customFields: { item: [['content:encoded', 'content']] } });

async function getParam(name) {
  const res = await ssm.send(new GetParameterCommand({ Name: `/newsletter/${name}`, WithDecryption: true }));
  return res.Parameter.Value;
}

function buildEmailHtml(item, siteUrl, unsubUrl) {
  const date = new Date(item.pubDate).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const content = item.content || item.contentSnippet || '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${item.title}</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:'Open Sans',Helvetica,sans-serif;color:#333333;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <h1 style="margin:0 0 6px;font-size:22px;font-weight:600;color:#1a1a1a;line-height:1.3;">${item.title}</h1>
    <p style="margin:0 0 32px;font-size:12px;color:#999999;">${date}</p>
    <div style="font-size:15px;line-height:1.8;color:#333333;">${content}</div>
    <div style="margin-top:48px;padding-top:16px;border-top:1px solid #eeeeee;font-size:11px;color:#aaaaaa;">
      <a href="${siteUrl}/blog/" style="color:#aaaaaa;">More posts</a>
      &nbsp;·&nbsp;
      <a href="${unsubUrl}" style="color:#aaaaaa;">Unsubscribe</a>
    </div>
  </div>
</body>
</html>`;
}

exports.handler = async (event) => {
  const [rssUrl, siteUrl, apiUrl, fromEmail] = await Promise.all([
    getParam('rss-url'),
    getParam('site-url'),
    getParam('api-url'),
    getParam('from-email'),
  ]);

  const feed = await parser.parseURL(rssUrl);

  // Process newest-first; stop after sending one to avoid batching multiple posts
  for (const item of feed.items) {
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
};
