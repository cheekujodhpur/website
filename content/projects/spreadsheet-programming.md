---
layout: project
title: Haskell versus Excel
subtitle: Spreadsheet Programming
date: 2018-04-11T12:16:00.000Z
categories:
  - functional
  - spreadsheet
image: /media/spreadsheet.png
weight: 211
excerpt: >-
  <p>While trying to make an extremely powerful electromagnet, I came across a
  spreadhseet which had calculations for the magnetic field produced based on
  the thickness of the wire, voltage available and radius of the solenoid. The
  calculation for optimal parameters gets complicated because you also have to
  think of heat generated which changes the resistance of the wire and perhaps a
  few other issues. The spreadsheet had all the calculations encoded and we just
  had to input some parameters and it would output the rest. It was very handy,
  but it struck me then, spreadsheets are just programs</p>
---
<p>While trying to make an extremely powerful electromagnet, I came across a spreadhseet which had calculations for the magnetic field produced based on the thickness of the wire, voltage available and radius of the solenoid. The calculation for optimal parameters gets complicated because you also have to think of heat generated which changes the resistance of the wire and perhaps a few other issues. The spreadsheet had all the calculations encoded and we just had to input some parameters and it would output the rest. It was very handy, but it struck me then, spreadsheets are just programs</p>

<p>Some time later I came across this book called "[Exercises in Programming Styles](www.amazon.com/Exercises-Programming-Style-Cristina-Videira/dp/1482227371/)" by Cristina Vidiera which has a companion [GH repo](https://github.com/crista/exercises-in-programming-style). Style number 26 is called <em>spreadsheet</em> and she emphasises on how data oriented this style is. Her implementation uses lambda functions in python to apply an operation over a column and get the next. This made me wondering if spreadhseets are capable of implementing functional programming. I am afraid I do not know enough, at the time of this writing, to prove or disprove this claim in a mathematically rigorous fashion. However, I was able to implement all functionalities provided in the basic Haskell tutorial. Some things are easier to do on Spreadsheets than in Haskell and vice versa. I could not wrap my head around how monads can be written onto spreadsheets but then I think you don't really need to for all practical purposes I can imagine.</p>
<!--break-->
<p>Most of my ideas are documented at this wiki page about [Spreadsheet Programming](https://wncc-iitb.org/wiki/index.php/Spreadsheet_Programming). Do check out the work of [Prof. Felienne](http://www.felienne.com/archives/tag/spreadsheets) who has written a Turing Machine in MS Excel and has more exciting research in spreadsheet programming. Regretfully, I discovered her much after my own exploration. There is a [YouTube video](https://www.youtube.com/watch?v=B4Ms65fdE_0) about my adventures. I am only partly embarassed by it, hence I find it worthy to share. You might want to watch it sped up. The gentleman helping me out here is <em>Meet Udeshi</em></p>
