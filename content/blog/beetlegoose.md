---
layout: blog
title: Hack InOut 6.0
date: 2019-11-01T10:43:24.000Z
categories:
  - hackathon
  - mixed-reality
  - multiprocessing
---

<p>Hello readers! Meet and I participated in the 6th edition of <a href="https://hackinout.co">Hack InOut</a> this year.
It was very convenient as both of us are now employed in Bengaluru. 
We took a repeat shot at our augmented reality venture that was <a href="/projects/bellatrix/" target="_blank" rel="noopener noreferrer">Bellatrix</a>.
I recommend reading that tiny post before you read this post, but it is not critical to understanding the following.
</p>
<h4>The Challenge</h4>
<p>Think of it like you're making a gaming hardware. Your display is a screen that is being projected upon.
Your input is an object hitting the screen and a camera detecting the point hit. An alternative method of detecting the point hit is using a LIDAR as in [INITI Playgroundz project](http://www.initi.org/workss/demonz-i-installation-for-kids-prague-handball-cup-2016).
We want(ed) to achieve the camera-based detection because it then opens the road to easy installation by anyone who has a projector and camera the quality of which comes in your phone. In theory, you could use your phone camera indeed.</p>

<p>When we had attempted this problem in the name of Bellatrix, we had two significant problems:
<ul>
    <li>You think you can detect the ball via the difference of the frame that the camera detects and what we know is projected. However, the projector has an intense (in the literal meaning of high intensity) color emissivity. This means that the camera does not see the ball in its natural colour. It sees a ball colour graded by the projected frame. This makes it very difficult to discern the ball from the background.
        Sure, you could make arguments that the projection on the ball is <i>warped</i> and so on but you have to keep in mind that we're working with a low-resolution RPi camera. Such effects are also harder to distinguish.
We were heavily relying on the ease of detecting a bright blob in heavily ambiguous video feeds. We put all our eggs in this one basket which had a big hole in it.</li>
    <li>The key computation in the project is taking the difference of the frame the camera reads and the frame you project. The read operation requires several transformations which are heavy enough to drop your framerates to about 5 fps. That game is not likely to be a fun experience to play.</li>
</ul>
</p>
<p>
The way we tackled both of those issues in Bellatrix is by making our game a dartboard with a white background and the board was drawn with extra light font. This makes it easy to detect the ball <b>and</b> you do not need a high frame rate for this game. The judges were impressed. It worked. <br />
This time around, we wanted to improve on these areas. Spoiler here is that we made zero improvements on the ball detection and miserably failed after making a colourful game. Even the poor but working algorithm from Bellatrix failed. We ended up one step behind on this front. Anyway, this post is more about glorifying what we <i>did</i> achieve rather than did not so here goes.
</p>
<p>
We had an RPi 4 which turns out to hold 4 cores. The algorithm is simple. <ol>
    <li>Mark each frame with a unique binary code. We colored the four corners in a particular way, so you get 1 to 16.</li>
    <li>The camera read and render are running on separate processes. The rendering process writes 16 frames in a looping fashion to a shared mem object. </li>
    <li>Assuming your read is not lagging by more than 16 frames, you can pick the projected frame from the shared mem and do a diff (which is done via a third process)</li>
    <li>The diff process will send the location of the hit point when it has it to the render process which can then include it in the game logic</li>
</ol>
This worked beautifully. We could churn out 30 fps and more throttled only by the occasional overheating of the RPi. However, the whole thing together was a disaster since we could not detect the bright yellow ball flying across. What would we do differently next time?
</p>
<p>
<ul>
    <li>Perhaps focus on the CV algorithm as its own thing, take images in various light conditions and perfect this separately</li>
    <li>Try to tune the RPi camera more manually. The read colour versus the write colour was obviously different. We did turn off AWB and set a manual shutter speed, but we could have done a better job of selecting the manual WB.</li>
    <li>Get a fan for the RPi OR get a more production-ready, less hobby friendly motherboard.</li>
</ul>
</p>
<p>
I take extreme pride in returning to old problems after learning new techniques. That means this is not over. Until next time...
</p>

<p>Thanks to _Meet Udeshi_ for working with me on this project. Our github repository can be found <a href="https://github.com/cheekujodhpur/beetlegoose">here</a>.</p>

