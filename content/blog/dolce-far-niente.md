---
layout: blog
title: Dolce far niente
date: 2021-08-08T00:20:37.000Z
categories:
  - musings
---

Why do we get bored? Are there not enough things to do in the world? Are there not enough books left to read? Not enough shows or movies left to watch? Not enough hobbies to learn, and not enough activities to do? 

Often, we choose to rewatch or reread something we like against exploring something new. Thus, we avoid risk. Why not do something that gives guaranteed joy than try something which only has a chance of giving us pleasure? This makes sense, but I don't like it.

There is a concept in game theory called the Gittins index and an associated theorem that helps you decide optimal action policy under certain assumptions. The theorem is non-robust in the sense that it is dangerously unhelpful under any variations in the assumptions. 

Thus, we cannot distil an easy rule from this theory to apply to our problem of picking which Netflix show to watch next. However, we can derive some intuition here. Consider you have two biased coins. You can flip one coin each turn, and you win two rupees if you get heads, and you lose a rupee if you get tails. Let us say both are biased in favour of heads but differently so. Quite obviously, if you know the biases, your best interest is to keep flipping the coin with a heavier bias. But let us think about what happens if you do not know the biases. 
If you flip coin A seven times, for 4 heads and 3 tails, your estimate for your mean income is 5/7. Now you flip coin B twice, for 1 heads and 1 tails and a mean income of 1/2. Is coin A better? But you haven't tried B as much! If you believe in this made-up number called the Gittins index, you will go for B next. Gittins index solves precisely the problem here - it puts a number on your cost of exploration. And for the example scenario here, the cost is lower than the possible reward. The Gittins index for coin A after 4W3L is 0.6276, and for coin B after 1W1L is 0.6346. For a coin that you have tried zero times, the Gittins index would be 0.7029.

What I have presented here is a version of the multi-armed bandit problem. Let us draw our intuition and move on. The first thing to realise is that there is indeed a cost of exploration. There are indeed scenarios where this is low enough that you are losing out by not exploring further. The second thing to realise is that this cost is higher if you have a limited number of total turns. 

A fair number of people have used this idea to argue that you should explore. But it is easily refuted. If life is short, you must exploit what known pleasures you have. And life _is_ short. Thankfully, the Gittins index does not apply to life. The reward structure is quite different. If we like a joke, we cannot keep hearing the same joke every day and enjoy it. But if we like sci-fi movies, we can keep watching different sci-fi movies every day and enjoy them on average. Can we? Maybe we would be bored in a month. But if we like movies, we could keep watching a movie every day and enjoy them on average. This is not at all like the multi-armed bandit problem. We evolve, and the expected rewards of our actions evolve not only because we discover more information about it but simply because the hidden state evolves too.

Boredom is different. It stems from a lack of energy rather than risk aversion. Entertaining ourselves requires draining mental energy. Rewatching or rereading is not done in a desire for a higher expected reward but for a lower expected cost. Active entertainment such as singing, playing an instrument, gardening, weaving or writing requires a higher cost than passive entertainment such as listening or reading. But passive entertainment costs nonetheless. And you may have experienced boredom watching even your favourite show sometime. It gives you a guaranteed reward, and it exacts a low cost on you, but a cost nonetheless. There would be days when you do not have even that to spare. 

Thus, this is an energy management problem and not a risk management problem. What do you do here? My advice - menial tasks or chores. Take a walk, wash some dishes, cook a meal - and all without any background music or podcast or show playing. You need to experience the joy of doing nothing - _dolce far niente_!
