function buildEmailHtml(item, siteUrl, unsubUrl) {
  const date = new Date(item.pubDate).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const content = item['content:encoded'] || item.content || item.contentSnippet || '';

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

module.exports = { buildEmailHtml };
