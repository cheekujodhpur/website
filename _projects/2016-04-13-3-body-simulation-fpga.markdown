---
layout: post
title:  "3 body Simulation using FPGA"
date:   2016-04-13 19:12:04
categories: projects digital-systems coding computational
weight: 200
---

<a></a>
<p>We were supposed to make something using Terasic DE0-Nano boards equipped with Altera Cyclone IV E FPGA as a part of our course project in Digital Electronics Lab(EP 230). We went around to explore what are some things which an FPGA can do better than a CPU. Starting with High Frequency Trading and Bitcoin computation, we evolved our idea into N body simulation which we could complete for 3 body simulation. </p>
<p>The general idea is easy to grasp. Consider that you are simply calculating the vector r<sub>j</sub> - r<sub>i</sub>. This requires 3 subtractions which a simple CPU will serially do, but on an FPGA we can program three subtractors to work in parallel. The improvement in speed is challenged by a requirement of larger hardware(Flops per unit area), but hardware is cheap and time is not, thus FPGAs seek good applications in high performance computing till date.</p>
<p>The full abstract can be downloaded <a href="/media/fpga_doc.pdf">here</a>, and the presentation is available at <a href="https://docs.google.com/presentation/d/1tZKQbFShL-eHozx8fI_xyVnHJPRaeSnEXDdIa1Blzi0/edit?usp=sharing">this</a> drive link.</p>
