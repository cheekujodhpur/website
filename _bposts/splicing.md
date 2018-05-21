---
layout: blog
title:  "On Slicing Python Lists"
date:   2016-06-02 20:51:00
categories: python programming
---

<p>
A lot many are familiar with Python lists and the feature of slicing, although I find the description that most tutorials not intuitive enough. Here is how it goes.<br />
Let us start with defining an array of 10 elements
</p>
<pre><code>>>> a = [i for i in range(10)]
</code></pre>
<p>
Now, the following I assume you're familiar with.
</p>
<pre><code> >>> a[3:6]
[3, 4, 5]
</code></pre>
<p>
And the way people think about it is selecting elements starting with <i>index 3</i> till and including the element with <i>index 6-1=5.</i>
</p>
<p>
Do you digest that? I cannot. Why do I include the first index while not the second one? If I think in terms of indices, I have to spend my brain power in subtracting the second index by one, and I tell you I am very lazy about that. 
<br />
Then there are people who say that you start with <i>index 3</i> and choose <i>6-3=3</i> elements there on. This does work because we see the following happening.
</p>
<pre><code> >>> a[4:4]
[]
</code></pre>
<p>
But I do not understand that if I were inventing slicing, and I would want people to think in terms of an index and a length, why would I not just keep length as the second parameter? In this <b>hypothetical</b> situation,
</p>
<pre><code> >>> a[3:3]
[3, 4, 5]
</code></pre>
<p>
<i>DISCLAIMER: I do not claimer that this is how it went but I'll now talk about how I like to look at slicing</i>
</p>
<pre><code> >>> a[3:]
[3, 4, 5, 6, 7, 8, 9]
</code></pre>
<p>
I like to say that doing this <i>skips</i> the first <i>three</i> elements and gives the rest.
</p>
<pre><code> >>> a[:6]
[0, 1, 2, 3, 4, 5]
</code></pre>
<p>
And this picks the first <i>six</i> elements. Simple really!
</p>
<pre><code> >>> a[3:6]
[3, 4, 5]
</code></pre>
<p>
This just gives the <i>intersection</i> of the two.
</p>
<p>
My two cents.
</p>
