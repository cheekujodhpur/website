all:
	jekyll b -d _site
	jekyll b -d ../cheekujodhpur.github.io
	aws2 s3 sync _site s3://kumar-ayush.com

serve:
	jekyll serve

default:
	all
