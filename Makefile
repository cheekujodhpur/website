all:
	jekyll b -d _site
	aws2 s3 sync _site s3://kumar-ayush.com --delete

serve:
	jekyll serve

default:
	all
