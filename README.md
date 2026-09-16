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

The RSS feed at `/feed.xml` is updated automatically on deploy (latest 10 posts). The newsletter system polls this feed daily to detect new posts.

## Newsletter

The newsletter backend lives in `newsletter/` and is deployed separately as an AWS SAM stack to `ap-south-1`.

### Architecture

- **Subscribe** — API Gateway → `subscribe` Lambda → DynamoDB (status: `pending`) → SES confirmation email
- **Confirm** — link in confirmation email → `confirm` Lambda → DynamoDB (status: `confirmed`) → SES welcome email
- **Unsubscribe** — link in every sent email → `unsubscribe` Lambda → DynamoDB (status: `unsubscribed`)
- **Send** — EventBridge cron (daily, 8:30 UTC) → `send` Lambda → reads RSS feed → sends to confirmed subscribers → records guid in `newsletter-sent-issues-prod` to avoid duplicates
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

### Subscriber management

Subscribers are stored in DynamoDB table `newsletter-subscribers-prod`. Manage directly via the AWS console (DynamoDB → Explore items). Status values: `pending`, `confirmed`, `unsubscribed`, `bounced`.

### Environment variables

`GATSBY_NEWSLETTER_API_URL` must be set at Gatsby build time. Lives in `.env.production` (gitignored).
