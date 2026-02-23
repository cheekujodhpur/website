---
layout: project
title: Epic Chat Battles of Historyyy
subtitle: Advanced ML Project
date: 2018-05-01T21:07:00.000Z
categories:
  - machine-learning
  - rnn
  - ml
  - nlp
image: /media/encoder-decoder-mixing.png
weight: 503
excerpt: >-
  <p>In this project, we consider the problem of generating a self-sustaining
  dialogue between two or more actors who speak with their own distictive
  styles. Seq2seq models have been successfully used to train recurrent neural
  networks to learn the mapping from one sequence of words to another. Here, we
  aim to see if such networks can be trained to share a common context vector
  space to enable a common understanding between the two actors.</p>
---
<p>In this project, we consider the problem of generating a self-sustaining dialogue between two or more actors who speak with their own distictive styles. Seq2seq models have been successfully used to train recurrent neural networks to learn the mapping from one sequence of words to another. Here, we aim to see if such networks can be trained to share a common context vector space to enable a common understanding between the two actors.</p>

<p>We went on with a bizarre idea of piping the output of encoder of one actor to the decoder of another and so on to generate an implicit one-to-one mapping between the context vector spaces of the two Seq2seq models, which did not work in the end but it sounds very interesting and fun to imagine. I will leave the details to the report and just show you an example conversation</p>
<ul>
<li><b>HAMLET</b>:two thousand souls and twenty thousand ducats</li>
<li><b>KANYE</b>:when we been she call you ask me no way
<br />how its just control
<br />like in the people
<br />right will probably cause on the any i cant buy her
<br />why do the mall with the dope with a lil girl throw only called
</li>
<li><b>HENRY V</b>:that you are like him down the kings quarrel
<br />the taste not the king keeps the fault
<br />my father of a king and his son
<br />and with crispian but his thought
</li>
<li><b>HAMLET</b>:come here to the to
<br />when he hath let me comply with you in this
<br />that was in your own two help all
<br />thus i should have and within of nature
<br />so horridly to shake our disposition and
<br />they are be the as as by my father
</li>
<li><b>KANYE</b>:go from it we gon be face
<br />and i wont mean no things she got they ass for money
<br />and when i know it take closed
</li>
<li><b>HAMLET</b>:digested the king and the suits of woe
<br />must to the very comment of thy soul
<br />observe mine uncle if his occulted guilt
<br />do not itself unkennel in one speech
<br />it is a damned ghost that we have seen
<br />and my imaginations are as foul
</li>
<li><b>HENRY V</b>:they are hard of this
<br />the man have their nobles that them him
<br />no yet it of god death
</li>
</ul>
<!--break-->
<p>Our complete presentation can be found [here](/media/CS726-report.pdf).</p>
<p>Thanks to <em>Anuj Shetty</em>, <em>Tejas Srinivasan</em> and <em>Sandesh Kalantre</em> for working with me on this project.</p>
