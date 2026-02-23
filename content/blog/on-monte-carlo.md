---
layout: blog
title: The Essence of Monte Carlo
date: 2018-06-10T22:51:00.000Z
categories:
  - misc
---

<p>
[Eric Veach](https://en.wikipedia.org/wiki/Eric_Veach) wrote his thesis on ["Robust Monte Carlo Methods for Light Transport Simulation"](https://graphics.stanford.edu/papers/veach_thesis/thesis-bw.pdf). This is a famous piece of work, considered a groundbreaking work in rendering and ubiquitous among graphics researchers and professionals. On page 12, there is a sentence which reads
</p>
<blockquote>
The principle of Monte Carlo methods is not that the samples are truly random, but that random samples could be used in their place.
</blockquote>
<p>
It took me some time to understand what he means, and I am still not sure if I have interpret it well, but pay attention to the following piece of code, using two slightly different functions to compute the value of $\pi$ and see if you see my point.
</p>

```py
import numpy as np                                                              
                                                                                
def mc1(N):                                                                     
    c = 0                                                                       
    N = int(N)                                                                  
    for i in range(N):                                                          
        x = np.random.random()                                                  
        y = np.random.random()                                                  
        if (x-0.5)**2 + (y-0.5)**2 < 0.25:                                      
            c = c+1                                                             
                                                                                
    return 4.0*float(c)/N                                                       
                                                                                
                                                                                
def mc2(N):                                                                     
    c = 0                                                                       
    _N = int(np.sqrt(N))                                                        
    for i in range(_N):                                                         
        for j in range(_N):                                                     
            x = float(i)/_N                                                     
            y = float(j)/_N                                                     
            if (x-0.5)**2 + (y-0.5)**2 < 0.25:                                  
                c = c+1                                                         
                                                                                
    return 4.0*float(c)/(_N*_N)                                                 
                                                                                
print mc1(1e1), mc2(1e1)                                                        
print mc1(1e2), mc2(1e2)                                                        
print mc1(1e3), mc2(1e3)                                                        
print mc1(1e4), mc2(1e4)                                                        
print mc1(1e5), mc2(1e5)                                                        
print mc1(1e6), mc2(1e6)                                                        
print mc1(1e7), mc2(1e7)
```

<p>
which generates the output
</p>
<pre>3.2 1.77777777778
3.16 2.76
3.148 3.08012486993
3.132 3.13
3.1404 3.14088287133
3.14302 3.1413
3.1420544 3.14153285317
</pre>
<p>The true value of $\pi$ upto 5 decimal places is $3.14159$.</p>
<p>My two cents!</p>
