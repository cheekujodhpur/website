all:
	jekyll b -d _site
	jekyll b -d ../cheekujodhpur.github.io
	aws2 s3 sync _site s3://www.kumarayush.com

default:
	all
