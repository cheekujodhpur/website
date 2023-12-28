---
layout: blog
title:  "Classification of Bugs: Chapter 2 - Local Variables"
date:   2020-05-23 19:27:30
categories: classification-of-bugs programming
---

### Local Variables
**Problem domain**: State and styling<br/>
**The error**: There exists a local variable intended to hold intermediate results<br/>
**The symptom**: Various

<script markdown="0" src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
The question is simple.
Is it a good idea to declare local variables which contain intermediate results when they have to be used once or twice?
Is this another matter of taste?

<pre class="prettyprint"><code class="language-python"># Using a local variable
number_of_players = len(game.players)
print(f"There are {number_of_players}} players.") 

# Avoid use of any extra variables
print(f"There are {len(game.players)} players.") 
</code></pre>

This is a relatively straightforward example. 
It does not add a lot to readability by declaring a separate variable to hold the number of players. 
It looks good, saves a line.
Let us look at another example

<pre class="prettyprint"><code class="language-python"># Using a local variable
india_tz = pytz.timezone("Asia/Kolkata")
austria_tz = pytz.timezone("Europe/Vienna")
now = datetime.datetime.now(tz=india_tz).astimezone(austria_tz)
print(f"The time is {now.strftime('%H:%M:%S')}.") 

# Avoid use of any extra variables
print(f"The time is {datetime.datetime.now(tz=pytz.timezone('Asia/Kolkata')).astimezone(tz=pytz.timezone('Europe/Vienna')).strftime('%H:%M:%S')}.") 
</code></pre>

Now we are really starting to hurt readability if we insist on not using any local variables.
We can strike a compromise.

<pre class="prettyprint"><code class="language-python"># Trying to minimise local variables
now = datetime.datetime \
        .now(tz=pytz.timezone("Asia/Kolkata")) \
        .astimezone(tz=pytz.timezone("Europe/Vienna"))
print(f"The time is {now.strftime('%H:%M:%S')}.") 
</code></pre>
 
But what do I hold against local variables? Why am I putting so much effort to avoid them? 
Once you declare a variable like `number_of_players` or `now`, you make it available to the entire scope of this code.  
Any other developer now making a change or feature improvement to the function would just use this afterwards because it already exists. 
It would not be considered good practice to re-declare this if it exists, would it?
If your function is lengthy, the variable declaration is now far from its usage. 
I really am measuring the physical distance between two lines of code here. 
This is what I am trying to optimise for. 
When maintaining or debugging or trying to understand a piece of code, it really is essential to consider how much abstract visualisation of code flow you can do. 
It helps if you can read an independent module without scrolling.
If some variables that are being used in your current view are declared far away, you are not staring at an independent module.
Being able to jump around using modern IDE tools is only going to help your thought process so much.
Maybe it is just me being stupid me, but I place immense value in seeing everything I need to know without jumping around definitions or scrolling.
How about we do this?

<pre class="prettyprint"><code class="language-python"># What are functions for?
def now():
    return datetime.datetime \
            .now(tz=pytz.timezone("Asia/Kolkata")) \
            .astimezone(tz=pytz.timezone("Europe/Vienna"))
        
print(f"The time is {now().strftime('%H:%M:%S')}.")
</code></pre>

We can use the function `now()` anywhere we need, as far as we want—no need to re-declare it.
Wait, what's the difference?
This is pretty much the same.
What difference did wrapping it in a function make?
Well, in practice, we would give the function a better name, `now_ist_to_cest`. 
This would make the purpose of the function clear.
We should aim to use it as a black box without worrying about its definition.
There is no need to jump around or scroll up.
This is still not an advantage over a variable. What is?
Variables can change midway. Functions cannot.
(In theory, functions can too, especially in a language like Python where I am drawing my examples.
In practice, this is less likely.)
Variables, however, are dangerous.
You may run into unexpected state changes.
The variable may be passed into another function by reference which could be modifying it unintentionally.
And that! would! be! a! BUG! Thus we have arrived at the point of this blog post.
Avoid using local variables if they have to be used _far_ from their definition.
Wrap them as functions.

