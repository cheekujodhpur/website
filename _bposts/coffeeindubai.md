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

#ratingTable {
    font-size: 0.75em;
}
</style>


I moved to Dubai recently for work, and one of my ventures here has been to find the best coffee. This was not as deliberate as it was coincidental. I decided to try a fancy-looking cafe close to my office. I liked the drink so much that I tried multiple other cafes to ensure my earlier judgement was not an overreaction. After a couple of weeks, trying out the coffee at a new place has become a habit. Thus, I wonder why not document all the cafes I've tried.

<table id="ratingTable"></table>

<em>Last updated on 15<sup>th</sup> January 2023.</em>

<script>
function convertToStars(num, type) {
    if(type == 'display')
        return '<div class="Stars" style="--rating: ' + num + ';"></div>';
    else return num;
}

function convertDate(datestr, type) {
    if(type == 'display') {
        var d = new Date(Date.parse(datestr));
        return d.toLocaleDateString(undefined, {'day': 'numeric', 'month': 'short', 'year': '2-digit'})
    }
    else return datestr
}

$(document).ready(function (){
    $('#ratingTable').DataTable({
        data: [
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/LXokNVVUmEyKWyJB9">Have Coffee - DIFC</a><br />',
                'first_visit_date': '2022-10-07',
                'drink': 'Espresso', 'presentation': 4, 'texture': 5, 'flavour': 5,
                'remarks': 'Would appreciate if the espresso was presented with a cookie. However, the texture and flavour take the game away.',
            },
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/LXokNVVUmEyKWyJB9">Have Coffee - DIFC</a><br />',
                'first_visit_date': '2022-10-07',
                'drink': 'Piccolo', 'presentation': 5, 'texture': 5, 'flavour': 5,
                'remarks': 'One can taste both the coffee and the milk. Great texture, great taste.',
            },
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/LXokNVVUmEyKWyJB9">Have Coffee - DIFC</a><br />',
                'first_visit_date': '2022-10-07',
                'drink': 'Cortado', 'presentation': 5, 'texture': 5, 'flavour': 5,
                'remarks': 'Just a double piccolo or perhaps a piccolo is a half cortado. My go-to drink.',
            },
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/hcYpC9MJzNfh7pmD7">Around Eleven cafe - DIFC</a><br />',
                'first_visit_date': '2022-10-12',
                'drink': 'Piccolo', 'presentation': 4, 'texture': 3, 'flavour': 3,
                'remarks': 'This had too much milk, which completely overshadowed the taste of coffee.',
            },
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/rDDo5epFTkeCWh5b8">The Coffee Lab</a><br />',
                'first_visit_date': '2022-10-23',
                'drink': 'Cortado', 'presentation': 4, 'texture': 2, 'flavour': 2,
                'remarks': 'All I could taste was burnt milk.',
            },
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/jkU5h9gepsx1yREX9">Fenna Eatery</a><br />',
                'first_visit_date': '2022-10-27',
                'drink': 'Cortado', 'presentation': 5, 'texture': 4, 'flavour': 4,
                'remarks': 'Beautiful Moroccan decor. Flavour is strong, reminded me of molasses. Texture could be one-notch thicker, but great taste overall.',
            },
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/vdV6KZBKty4HqoYN7">Hoof - Dubai Mall</a><br />',
                'first_visit_date': '2022-11-05',
                'drink': 'Espresso', 'presentation': 5, 'texture': 5, 'flavour': 5,
                'remarks': 'Presented with sparkling water and a description of the roast.',
            },
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/vdV6KZBKty4HqoYN7">Hoof - Dubai Mall</a><br />',
                'first_visit_date': '2022-11-05',
                'drink': 'Cortado', 'presentation': 4, 'texture': 4, 'flavour': 3,
                'remarks': 'Too much of a dark roast for cortado.',
            },
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/65jK6Mk8BjGSsbgE8">The Espresso Lab - D3</a><br />',
                'first_visit_date': '2022-11-12',
                'drink': 'Espresso', 'presentation': 5, 'texture': 4, 'flavour': 5,
                'remarks': 'Their roasts are class apart. Definitely going to buy from them.',
            },
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/V2x1j1qNp7hphMgo7">DXBlends Cafe</a><br />',
                'first_visit_date': '2023-01-14',
                'drink': 'Espresso', 'presentation': 5, 'texture': 3, 'flavour': 3,
                'remarks': 'Good cafe. Loved the service and decor.',
            },
        ],
        columns: [
            { data: 'cafe', title: 'Cafe' },
            { data: 'drink', title: 'Drink' },
            { data: 'presentation', title: 'Presentation', render: convertToStars },
            { data: 'texture', title: 'Texture', render: convertToStars},
            { data: 'flavour', title: 'Flavour', render: convertToStars },
            { data: 'first_visit_date', title: 'First Visit', render: convertDate },
            { data: 'remarks', title: 'Remarks' },
        ],
        paging: false,
        searching: false,
        bInfo: false,
        responsive: true,
        order: [[5, "desc"]],
    });
});
</script>

