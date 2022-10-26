---
layout: blog
title:  "Coffee in Dubai"
date:   2022-10-22 12:59:58  
categories: travel food lifestyle
---

<link rel="stylesheet" href="https://cdn.datatables.net/1.10.8/css/jquery.dataTables.min.css" />
<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.3.0/css/responsive.dataTables.min.css" />
<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="https://cdn.datatables.net/1.10.10/js/jquery.dataTables.min.js" defer="defer"></script>
<script src="https://cdn.datatables.net/responsive/2.3.0/js/dataTables.responsive.min.js" defer="defer"></script>

<style>
:root {
  --star-size: 1em;
  --star-color: #fff;
  --star-background: #fc0;
}

.Stars {
  --percent: calc(var(--rating) / 5 * 100%);
  display: inline-block;
  font-size: var(--star-size);
  font-family: Times;
  line-height: 1;
}
.Stars::before {
  content: "★★★★★";
  letter-spacing: 3px;
  background: linear-gradient(90deg, var(--star-background) var(--percent), var(--star-color) var(--percent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>


I moved to Dubai recently for work, and one of my ventures here has been to find the best coffee. This was not as deliberate as it was coincidental. I decided to try a fancy-looking cafe close to my office. I liked the drink so much that I tried multiple other cafes to ensure my earlier judgement was not an overreaction. After a couple of weeks, trying out the coffee at a new place has become a habit. Thus, I wonder why not document all the cafes I've tried.

<table id="ratingTable"></table>

<em>Last updated on 23<sup>th</sup> October 2022.</em>

<script>
function convertToStars(num, type) {
    if(type == 'display')
        return '<div class="Stars" style="--rating: ' + num + ';"></div>';
    else return num;
}

$(document).ready(function (){
    $('#ratingTable').DataTable({
        data: [
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/LXokNVVUmEyKWyJB9">Have Coffee - DIFC</a><br />',
                'drink': 'Espresso', 'presentation': 4, 'texture': 5, 'flavour': 5,
                'remarks': 'Would appreciate if the espresso was presented with a cookie. However, the texture and flavour take the game away.',
            },
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/LXokNVVUmEyKWyJB9">Have Coffee - DIFC</a><br />',
                'drink': 'Piccolo', 'presentation': 5, 'texture': 5, 'flavour': 5,
                'remarks': 'One can taste both the coffee and the milk. Great texture, great taste.',
            },
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/LXokNVVUmEyKWyJB9">Have Coffee - DIFC</a><br />',
                'drink': 'Cortado', 'presentation': 5, 'texture': 5, 'flavour': 5,
                'remarks': 'Just a double piccolo or perhaps a piccolo is a half cortado. My go-to drink.',
            },
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/hcYpC9MJzNfh7pmD7">Around Eleven cafe - DIFC</a><br />',
                'drink': 'Piccolo', 'presentation': 4, 'texture': 3, 'flavour': 3,
                'remarks': 'This had too much milk, which completely overshadowed the taste of coffee.',
            },
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/rDDo5epFTkeCWh5b8">The Coffee Lab</a><br />',
                'drink': 'Cortado', 'presentation': 4, 'texture': 2, 'flavour': 2,
                'remarks': 'All I could taste was burnt milk.',
            },
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/jkU5h9gepsx1yREX9">Fenna Eatery</a><br />',
                'drink': 'Cortado', 'presentation': 5, 'texture': 4, 'flavour': 4,
                'remarks': 'Beautiful Moroccan decor. Flavour is strong, reminded me of molasses. Texture could be one-notch thicker, but great taste overall.',
            },
        ],
        columns: [
            { data: 'cafe', title: 'Cafe' },
            { data: 'drink', title: 'Drink' },
            { data: 'presentation', title: 'Presentation', render: convertToStars },
            { data: 'texture', title: 'Texture', render: convertToStars},
            { data: 'flavour', title: 'Flavour', render: convertToStars },
            { data: 'remarks', title: 'Remarks' },
        ],
        paging: false,
        searching: false,
        bInfo: false,
        responsive: true,
    });
});
</script>

