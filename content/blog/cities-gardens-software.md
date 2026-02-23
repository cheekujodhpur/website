---
layout: blog
title: 'Cities, Gardens and Software Systems'
date: 2022-05-06T00:20:37.000Z
categories:
  - programming
---

What do cities, gardens and software systems have in common?

I love cities. They have the best food, the best services and the best entertainment options. All of this is true trivially due to more competition. And of course, the primary reason cities exist, and all the competition is enabled-there are more jobs in the city. On the flip side, cities are exhausting. There are slums, and there are skyscrapers. There's traffic. And there's trash at every corner. It feels like a person, alive with a beautiful soul but not free of scars.

I do not have anything similarly poetic about software systems or gardens. I work with software, and I enjoy gardens. I do not do any gardening myself, although I see that I would inherit that from my father as I grow older.
Last year, I read something about gardens and something about cities that influenced my approach toward software systems. Let's review them in order.

### On Cities

[This is a Bloomberg story](https://www.bloomberg.com/news/features/2021-09-01/how-diapers-com-founder-marc-lore-plans-to-build-utopian-city-telosa) about an American billionaire, Marc Lore, who wants to build a new city, a utopian megapolis, as the title teases. They describe how he amassed his wealth, his ideas on the path forward, and the key talent involved in making this possible. All this is fine, but what caught my attention is Lore's own remarks on the challenges of his vision.


<blockquote>
Still, as Lore talked out the details of Telosa, he kept running up against the tensions in his vision. He told Ingels's staff that he wants its initial residents to be socioeconomically and racially diverse, but he also knows that you can't just hire the population of a city the way you staff your startup. "It's not a controlled city, it's not a private city," he said in the larger meeting before musing that there must be some trick of planning to get what he's after. If there is some diversity-enhancing secret, the crowd in the room—overwhelmingly White and predominantly male—hadn't heard of it.
</blockquote>

If you go through the article, the fact that you cannot hire a city's population seems to be the problem with the entire idea and not just the demographic diversity part of it.

<blockquote>
One way to attract people, he suggested in the meeting, would be to start a venture capital firm and only invest in companies willing to move to the city. He also described a move-in day—maybe more like a move-in month?—where all 50,000 initial residents would show up at once and go through an orientation, the sort of bonding experience that's proved effective with first-year college students.
</blockquote>

This is ridiculous. You cannot expect folks to move to your city because they share your vision. You have a chicken-and-egg problem or a network externality. People move to cities because there are more jobs. More jobs require infrastructure, capital and services - which come from more people. In a way, a city is an investment by the citizens. Is the answer then to provide good institutions and investments? Well, as more people come to the city, they would require a change in the institutions. They would want to modify the tax structure and the public infrastructure to their current needs. Good Luck finding an unlimited supply of people who agree entirely with what you think your city should be, Mr Billionaire. It sounds frustrating, but one can only guide and not authoritatively control the path a city will take. A city is a complex system which grows and cannot be built.

[A more recent interview](https://www.bloomberg.com/news/articles/2022-04-08/why-don-t-we-just-build-new-cities) with a former city planner nails this.

<blockquote>
Let's say I want to build a new city, for better or worse. How should I plan it out?

The first thing you need to do is clearly demarcate the public and private realms. Think New York City's street grid or Ildefons Cerdà's plan for Barcelona. Where are the streets going to go, and what are they going to look like? Same for public spaces: Identify and preserve amenities like waterfronts or small hills, which will be your parks. These are design problems that need to be done all at once and in a top-down way before a healthy city can start to grow.

Second, you need to set up some way to finance infrastructure. Who should pay for it, and when should it be built? If you set it up correctly, new development should incrementally pay for itself. This ensures that the supply of developable land can follow demand. Texas' Municipal Utility Districts seem to work well in this regard. 

Beyond these two considerations, don't overthink it. The key is to lay the groundwork for a land market that will reveal the right way to allocate land uses and densities. This is partly what went wrong with Brasília — planners thought they could plan out every little detail about the city, right down to how many shops each neighborhood should have, and the results have been less than ideal. 

Compare Brasília to Hong Kong, arguably one of the most successful new cities in modern history. Instead of micromanaging everything, the government focused on stewarding the public realm and providing quality public services. Otherwise, they mostly let markets design the built form of the city in a spontaneous and evolutionary way.
</blockquote>

### On Gardens

One of my top reads from last year was a <a href="https://www.goodreads.com/book/show/53176781-seed-to-dust">gardener's memoir</a>. I have listed this book among my favourites in an <a href="/blog/2021-in-books/" target="_blank" rel="noopener noreferrer">earlier blog post</a>. It is pretty amusing that the author Marc Hamer shares his first name with our billionaire in the previous section.

At one point, the author recalls when he refused to spray chemicals in the garden in protest of the landlady's request. From Page 113,
<blockquote>
There are chemicals available to spray lawns with, so that it doesn't grow so quickly; others to kill the worms and beetles so there are no worm casts, no moles feeding on them. There is a company that will come and spray your lawn with a pigment to make it look green in the summer when everybody else's goes brown; others that will dig it all up and replace it with plastic grass, which never changes colour and smells of vinyl in the hot sun, and will stay looking the same shiny plastic green for all of eternity. The glossy full-colour leaflets for these poisons arrive, uninvited, through my letter box every spring. These are for the people who are not gardeners, people who want to control nature. To speak of controlling nature is like the waves wanting to control the sea, the song singing the thrush, the flower creating the earth. We are not the sea, we are not the thrush, we are not the earth. We are the wave, the song, the flower. There are about a hundred different grass species that are seeded in British lawns, and nearly 12,000 species of grass in the world. Few people care, as long as it is green.
</blockquote>

Marc Hamer's passion for gardening is infectious, and it inspires a philosophical approach. A good gardener guides and does not seek absolute control.

### On Software Systems

How are software systems different? They gather users as a city gathers its dwellers. As a city will grow in the direction its dwellers intend to, developers will add features to a software system. Suppose the original author of the system cares to protest. In that case, others will fork the system or just move to another more welcoming one. This is precisely what I expect to happen to Marc Lore's city if he remains adamant about his design. 

Like a garden, a software system has weeds and bugs. It has branches that need disentangling and pruning. A good maintainer, like a good gardener, cares. When certain routines become cumbersome, they would care to refactor. If you do not care, you could simply rewrite the routine. That would be analogous to uprooting a patch of land in your garden and replanting fresh saplings. Sure, that will work, but it is costly to keep doing that. Careful maintenance amortises your costs and is a mark of professionalism. 

I have found myself a gardener who cares but is an authoritative planner. I would spend an unreasonable amount of time pushing people to develop software my way. That inhibits growth. You have to yield control and embrace the natural path of a complex system. I have learnt that it is foolish to build a software system. Just like cities and gardens, these are grown. You can at most expect to be a guide.
