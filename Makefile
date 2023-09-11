all:
	jekyll b -d _site
	aws s3 sync _site s3://kumar-ayush.com --delete

serve:
	jekyll serve

default:
	all
