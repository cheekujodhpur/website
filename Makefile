all:
	npm run build
	aws s3 sync public/ s3://kumar-ayush.com --delete

serve:
	npm run develop

clean:
	npx gatsby clean

.PHONY: all serve clean
