all:
	jekyll b -d _site
	aws2 s3 sync _site s3://www.kumarayush.com

default:
	all
