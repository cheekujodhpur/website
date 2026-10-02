all:
	npm run build
	aws s3 sync public/ s3://kumar-ayush.com --delete

email:
	npm run build
	aws s3 cp public/newsletter-feed.xml s3://kumar-ayush.com/newsletter-feed.xml
	aws cloudfront create-invalidation --distribution-id E1RBMQAYDIFYGP --paths "/newsletter-feed.xml"

serve:
	npm run develop

clean:
	npx gatsby clean

.PHONY: all serve clean email
