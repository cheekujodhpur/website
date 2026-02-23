---
layout: project
title: Estimating Photometric Redshifts using Machine Learning Techniques
subtitle: A recurring problem
date: 2012-12-25T17:34:22.000Z
categories:
  - machine-learning
  - astronomy
image: /media/nius-2012.png
weight: 100
excerpt: >-
  <p>Redshift measurements are vital to modern astrophysics. Using spectral line
  shifts is an accurate method to calculate redshift for a distant galaxy but
  the observation time to develop the spectrum is quite high and the result's
  accuracy has a high dependence on SNR, which drastically limits its use to
  applications which require us to find redshifts for a large number of
  objects.</p>
---
<p>Redshift measurements are vital to modern astrophysics. Using spectral line shifts is an accurate method to calculate redshift for a distant galaxy but the observation time to develop the spectrum is quite high and the result's accuracy has a high dependence on SNR, which drastically limits its use to applications which require us to find redshifts for a large number of objects.</p>

<p>A faster, though less accurate way is to correlate photometric data with redshifts. We can use machine learning techniques to estimate photometric redshifts.</p>
<!--break-->
<p>I have explored this project thrice in my life, returning everytime with new skills and data. The first was NIUS Astronomy Nurture Camp 2012. I was in 10th grade and had recently read about an upcoming concept, neural networks. Using Bishop's book on [Pattern Recognition and Machine Learning](https://www.springer.com/in/book/9780387310732), I implemented a feed forward neural network with gradient descent and sigmoid activation, as was popular in those times. The technique was new to the field of astrophysics, and we got close to, if not above the state of the art results. The full report can be seen [here](/media/nius-2012.pdf).</p>
<!--break-->
<p>
I revisited the problem in 2016 with my friend [Kalpesh Krishna](http://martiansideofthemoon.github.io/) and we tried to readdress the problem, now that we understood a bit better the fundamental ideas that went behind neural networks and the superset of techniques called machine learning. We compared the results of KNN and FC networks and found KNN's to be better in accordance with a KNN variant that SDSS[^1] DR12 used to estimate photz. By this time, SDSS had started including a table of photometric redshifts based on a method decided by the committee. We did not add more to what we already understoood other than experimenting with more activation functions. For details, you can see the [Github repository](https://github.com/martiansideofthemoon/photometric-redshifts).
</p>
<!--break-->
<p>
The third visit was paid in the form of a course project for a Galactic Astrophysics course at IITB (PH 426) taken by Prof. Vikram Rentala. Our project mentor was Prof. Yogesh Wadadekar from NCRA (TIFR), Pune. This time, we combine the spectroscopic data from PRIMUS and VIPERS survey for high redshift galaxies, and obtain photometric data from SDSS for these galaxies to create a dataset which is presented in contrast to using the spectroscopic redshifts from SDSS itself, which is known to be accurate limited to lower redshift regimes.  The performance for these two datasets are compared for the two methods of ANNs and K-NN as earlier. The full report can be seen [here](/media/photz_ph426.pdf).</p>
<p>Thanks to <em>Kalpesh Krishna</em>, <em>Sheshansh Agrawal</em>, <em>Piyush Bhatore</em>, <em>Abhay Singh</em>, <em>Alankar Kotwal</em>, <em>Abhijith Varma</em>, <em>Prashansa Gupta</em>, <em>Abhinav Chikhalkar</em> for working with me on this project, and <em>Prof. Ninan Sajeeth Philip</em>, <em>Prof. Yogesh Wadadekar</em> and <em>Prof. Vikram Rentala</em> for their guidance.</p>

[^1]: [SDSS](https://www.sdss.org) stands for Sloan Digital Sky Survey. DRxx is Data Release and version.
