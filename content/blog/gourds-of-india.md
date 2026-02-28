---
layout: blog
title: Gourds of India
date: 2026-02-28T12:00:00.000Z
categories:
  - food
subtitle: Rediscovering the humble gourd, one recipe at a time
---

What makes our palate? We grow up in different cultures.
Our home food largely depends on our parents' ethnic backgrounds.
Our street food depends on where we live.
And another small part of our ethnicity seeps in from the ceremonies - birthdays and marriages we attend.
And then there is a significant contribution by globalisation—all of us like Maggi.
It is a cultural phenomenon, as much natural as much as driven by Nestle's marketing.
All of us like pizza, thanks to Domino's and Pizza Hut.
All of us like Dosa.
How do our taste buds measure what is tasty and what is not? Is there an absolute measure?

Perhaps all taste is acquired.
Few of us have tried Neapolitan style pizza.
Fewer of us like it in comparison to Domino's.
Neapolitan pizza is too bland, not much flavour at all.
Of course, Domino's is much better! Have you tried the cheeseburst? Look, if you hate me for whatever reason, an effortless way to ensure my death would be to show this paragraph to an Italian.
Anyway, this is a good line of thought.
It leads us to believe that there is probably nothing inherently good or bad about the food we like or don't.
Perhaps all taste really is acquired.

Not so easy.
There are contradictions.
We have memories of disliking particular food as children.
Our parents force us in the name of nutrition, and we pledge to never touch that food again once we are grown-ups.
We should have acquired the taste, especially as children, when we are a blank slate.
What did we miss? I believe this happens because our taste buds form an identity.
There will exist certain food items that will contradict that identity.
Most people will not want to have *karela* (bitter gourd) as a juicy curry.
Still, it is an entirely different matter when it's a fried side.
Most people complain about *lauki* (bottle gourd), but not as much when you make kofta out of it.
And in contrast, large scale conglomerates have worked hard to build a taste which would appeal to the masses.
When did you last hear someone say they disliked Maggi? 

As the title would have suggested, I am particularly concerned with how did gourds end up contradicting the palate identities for most of us.
There are so many of them.
*lauki* (bottle gourd), *turai* (sponge gourd), *karela* (bitter gourd), *parval* (pointed gourd), *kundru* (little gourd), *tinda* (apple gourd) and more! Are they just unblessed by God to be boring things? 
I am not one to give up.
I don't think there is anything inherently "bad" with the gourd itself.
Gourds are bland nutritious pulp which is capable of absorbing any flavour you choose to give it.
I think that we have not explored to the full extent the recipes that gourds can yield to.
I accept that gourds' everyday recipes are not the best fit for modern Indian youth's taste buds.
Still, there is room to rediscover or perhaps invent a new identity

<style>
.gourd-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    margin: 2em 0;
    padding: 0;
    list-style: none;
}

.gf-radio {
    display: none;
}

.gourd-filter-btn {
    display: inline-block;
    background: transparent;
    border-radius: 3px;
    box-shadow: inset 0 0 0 2px #2e3842;
    color: #2e3842;
    cursor: pointer;
    font-family: 'Open Sans', Helvetica, sans-serif;
    font-size: 0.75em;
    font-weight: 600;
    letter-spacing: 0.225em;
    text-transform: uppercase;
    padding: 0.6em 1.4em;
    transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
    white-space: nowrap;
    border-bottom: none;
}

.gourd-filter-btn:hover {
    background-color: rgba(46,56,66,0.1);
}

#gf-all:checked ~ .gourd-filters label[for="gf-all"],
#gf-bottle:checked ~ .gourd-filters label[for="gf-bottle"],
#gf-sponge:checked ~ .gourd-filters label[for="gf-sponge"],
#gf-ridge:checked ~ .gourd-filters label[for="gf-ridge"] {
    background-color: #2e3842;
    color: #fff;
    box-shadow: inset 0 0 0 2px #2e3842;
}

#gf-bottle:checked ~ .gourd-grid .gourd-card:not([data-gourds*="bottle-gourd"]),
#gf-sponge:checked ~ .gourd-grid .gourd-card:not([data-gourds*="sponge-gourd"]),
#gf-ridge:checked ~ .gourd-grid .gourd-card:not([data-gourds*="ridge-gourd"]) {
    display: none;
}

.gourd-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5em;
    margin: 1em 0 2em 0;
}

@media (max-width: 736px) {
    .gourd-grid {
        grid-template-columns: 1fr;
    }
}

.gourd-card {
    border: solid 2px #dfdfdf;
    border-radius: 3px;
    padding: 1.5em;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.gourd-card h3 {
    margin: 0 0 0.6em 0;
}

.gourd-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4em;
    margin-bottom: 1em;
}

.gourd-tag {
    display: inline-block;
    font-size: 0.65em;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.3em 0.7em;
    border-radius: 2px;
    color: #fff;
}

.gourd-tag.bottle-gourd { background-color: #21b2a6; }
.gourd-tag.sponge-gourd { background-color: #505393; }
.gourd-tag.ridge-gourd  { background-color: #ed4933; }

.gourd-card .pair-label {
    font-size: 0.75em;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #8E8892;
    margin-bottom: 0.3em;
}

.gourd-card .pair-value {
    font-weight: 600;
    margin-bottom: 1em;
}

.gourd-card .description {
    margin-bottom: 1em;
    font-size: 0.95em;
    line-height: 1.65em;
}

.gourd-card .tip {
    font-style: italic;
    font-size: 0.85em;
    color: #8E8892;
    margin-bottom: 1em;
}

.gourd-card .recipe-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    list-style: none;
    padding: 0;
    margin: 0;
}

.gourd-card .recipe-links a {
    display: inline-block;
    font-size: 0.7em;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.4em 1em;
    border: solid 1px #bfbfbf;
    border-radius: 3px;
    color: #2e3842;
    text-decoration: none;
    transition: background-color 0.2s ease, border-color 0.2s ease;
}

.gourd-card .recipe-links a:hover {
    background-color: rgba(46,56,66,0.1);
    border-color: #2e3842;
}

</style>

<div class="gourd-container">

<input type="radio" name="gf" id="gf-all" class="gf-radio" checked>
<input type="radio" name="gf" id="gf-bottle" class="gf-radio">
<input type="radio" name="gf" id="gf-sponge" class="gf-radio">
<input type="radio" name="gf" id="gf-ridge" class="gf-radio">

<div class="gourd-filters">
    <label for="gf-all" class="gourd-filter-btn">All</label>
    <label for="gf-bottle" class="gourd-filter-btn">Bottle Gourd (Lauki)</label>
    <label for="gf-sponge" class="gourd-filter-btn">Sponge Gourd (Nenua)</label>
    <label for="gf-ridge" class="gourd-filter-btn">Ridge Gourd (Turai)</label>
</div>

<div class="gourd-grid">

<div class="gourd-card" data-gourds="sponge-gourd ridge-gourd bottle-gourd">
<h3>Nenua Kadala</h3>
<div class="gourd-tags">
    <span class="gourd-tag sponge-gourd">Sponge Gourd</span>
    <span class="gourd-tag ridge-gourd">Ridge Gourd</span>
</div>
<div class="pair-label">Pairs with</div>
<div class="pair-value">Kadala (Tyson black chickpea)</div>
<div class="description">
A dry-ish sabzi which you can have as a side to a rice based meal, or have with wheat chapati directly. Both kadala and nenua have an earthy aftertaste. The nenua adds a bit of sweetness if cooked tenderly, which balances the heat from the spices. A good balance of fiber and protein.
</div>
<div class="tip">Cheeku recommends sponge gourd for this recipe. Ridge gourd has a thicker skin which can overpower the texture if not peeled carefully.</div>
<div class="recipe-links">
    <a href="https://www.youtube.com/watch?v=cc7EceYtIek" target="_blank">Video recipe</a>
    <a href="https://www.archanaskitchen.com/recipe/chana-turai-nenua-chana-sabzi-recipe-ridge-gourd-with-black-chana-recipe" target="_blank">Archana's Kitchen</a>
</div>
</div>

<div class="gourd-card" data-gourds="bottle-gourd">
<h3>Lauki Chana Dal</h3>
<div class="gourd-tags">
    <span class="gourd-tag bottle-gourd">Bottle Gourd</span>
</div>
<div class="pair-label">Pairs with</div>
<div class="pair-value">Chana Dal</div>
<div class="description">
Perhaps one of the most common gourd recipes in India. Lauki is a good middle ground between cucumber and pumpkin. Good moisture content, more volume, and a thick skin so it doesn't rot fast. Its neutral texture makes it versatile enough even for desserts. Both lauki and chana dal go well with rice and bread, from dal tadka to dal fry.
</div>
<div class="tip">Simple to cook: diced lauki with chana dal in a pressure cooker, then temper to taste.</div>
</div>

</div>

</div>
