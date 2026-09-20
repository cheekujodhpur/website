# kumar-ayush.com

Personal website and blog built with Gatsby, hosted on S3.

## Development

```bash
make serve       # start local dev server at localhost:8000
make             # build and deploy to production (S3)
make clean       # clear Gatsby cache
```

Local dev mocks the newsletter subscribe API — no real emails are sent.

## Adding a blog post

Create a Markdown file under `content/blog/`. Frontmatter fields:

```yaml
---
title: "Post title"
date: "2026-09-16"
categories: ["category"]
---
```

The RSS feed at `/feed.xml` is updated automatically on deploy (latest 10 posts). A separate `/newsletter-feed.xml` is used by the newsletter system — it includes email-only posts and excludes posts with `email: false` in frontmatter.

Optional frontmatter fields:
- `send_email: false` — publish to blog but skip this post in the newsletter
- `show_on_web: false` — send to newsletter subscribers only; no public blog page or URL

## Newsletter

The newsletter backend lives in `newsletter/` and is deployed separately as an AWS SAM stack to `ap-south-1`.

### Architecture

- **Subscribe** — API Gateway → `subscribe` Lambda → DynamoDB (status: `pending`) → SES confirmation email
- **Confirm** — link in confirmation email → `confirm` Lambda → DynamoDB (status: `confirmed`) → SES welcome email
- **Unsubscribe** — link in every sent email → `unsubscribe` Lambda → DynamoDB (status: `unsubscribed`)
- **Send** — manually triggered → `send` Lambda → reads `/newsletter-feed.xml` → sends to confirmed subscribers → records guid in `newsletter-sent-issues-prod` to avoid duplicates
- **Bounces** — SES → SNS → `bounces` Lambda → hard bounces marked as `bounced`, complaints marked as `unsubscribed`

### Deploying the newsletter stack

```bash
cd newsletter
python -m samcli build
python -m samcli deploy
```

Requires `aws-sam-cli` installed via pip (`pip install aws-sam-cli`). Config is in `newsletter/samconfig.toml` (region: ap-south-1, stage: prod).

### First-time setup

One-time: create Parameter Store entries before first deploy:

```bash
python newsletter/scripts/setup-params.py
```

### Sending the newsletter

To trigger a send manually:

```bash
bash newsletter/scripts/trigger-send.sh
```

This invokes the `send` Lambda, which picks up the next unsent post from `/newsletter-feed.xml` (posts newer than `start-date` in Parameter Store, not yet in `newsletter-sent-issues-prod`). One post per invocation.

### Subscriber management

Subscribers are stored in DynamoDB table `newsletter-subscribers-prod`. Manage directly via the AWS console (DynamoDB → Explore items). Status values: `pending`, `confirmed`, `unsubscribed`, `bounced`.

### CloudFront invalidation

After deploying, invalidate CloudFront if needed (e.g. if an existing feed file was updated):

```bash
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
```

New files (like `/newsletter-feed.xml` on first deploy) don't need invalidation — CloudFront passes through to S3 on first request.

### Environment variables

`.env.production` (gitignored) holds local config needed for deployment:

- `GATSBY_NEWSLETTER_API_URL` — baked into the Gatsby build at deploy time
- `CLOUDFRONT_DISTRIBUTION_ID` — used for cache invalidation commands
