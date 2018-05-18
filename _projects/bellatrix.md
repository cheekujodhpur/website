---
layout: project
title:  "Bellatrix"
subtitle: "AR Gaming Platform"
date:   2017-03-13 15:05:00
categories: ar computer-vision gaming
image: /media/bellatrix-trial.png
weight: 401
---

<p>We create an augemented reality gaming platform. We project a game on a screen and a camera records the user interaction with the screen.</p>
<!--break-->
<p>The project was inspired from [Interactive Squash](http://interactivesquash.com/) who seem to have centered their product around making a 21st century squash arena which is capable of detailed analysis and assisting with advanced training. However, we figured that we can use this for any kind of game. You can see a video of a game of darts being played on the platform [here](https://www.youtube.com/watch?v=v_A9FpL3Sa4).</p>
<p>The most trivial interaction is hitting the screen, say a softball hitting the screen in a game of "darts" and the area where it hit determining the score. The key challenge here was accurately determining a foreign object in the camera recording and deciding if it touches the screen. We use the difference of the image being projected and that being recorded to localise the foreign object and then track its speed to determine the hit location. The frame rate of the camera and lighting conditions put limitations on our implementation, as with most CV applications.</p>
<p>Few months after we did this project as part of Yahoo! Japan HACK U, a 24 hour hackathon at IIT Bombay, I discovered [Digital Playgroundz by INITI](http://www.initi.org/workss/demonz-i-installation-for-kids-prague-handball-cup-2016/) at ACM SIGGRAPH '17, which implements a solution using LIDAR. This makes it costly, but much more robust. I remain confident that we can build a cheaper solution if we put more time to this. That remains postponned to an unknown day.</p>
<p>Thanks to <em>Abhijit Tomar</em>, <em>Shievani Upadhyay</em>, <em>Arunabh Ghosh</em> and <em>Meet Udeshi</em> for working with me on this project.</p>
