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

<em>Last updated on 18<sup>th</sup> May 2024.</em>

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
                'drink': 'Espresso, Piccolo, Cortado, Cappuccino', 'presentation': 4, 'texture': 5, 'flavour': 5,
                'remarks': 'Would appreciate if the espresso was presented with a cookie. However, the texture and flavour take the game away. For the milk coffees, the foam texture is outstanding.',
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
                'drink': 'Espresso, Cortado, Cappuccino, Atay, Spiced Coffee', 'presentation': 5, 'texture': 4, 'flavour': 4,
                'remarks': 'Beautiful Moroccan decor. Flavour is strong, reminded me of molasses. Texture could be one-notch thicker, but great taste overall.',
            },
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/vdV6KZBKty4HqoYN7">Hoof - Dubai Mall</a><br />',
                'first_visit_date': '2022-11-05',
                'drink': 'Espresso, Cortado', 'presentation': 5, 'texture': 5, 'flavour': 5,
                'remarks': 'Presented with sparkling water and a description of the roast. Their roast is too dark for milk coffees in my opinion',
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
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/xZ7sKxwnVUo5v2Hd9">Bliss\'d DIFC</a><br />',
                'first_visit_date': '2023-01-04',
                'drink': 'Espresso, Macchiato, Cappuccino', 'presentation': 3, 'texture': 4, 'flavour': 3,
                'remarks': 'They have great outdoor seating, but their coffee is not consistent.',
            },
            {
                'cafe': '<a target="_blank" href="https://goo.gl/maps/jTjX7u52BJ1q88XXA">KIMBO Espresso Italiano</a><br />',
                'first_visit_date': '2023-01-31',
                'drink': 'Espresso', 'presentation': 4, 'texture': 4, 'flavour': 4,
                'remarks': 'It\'s in the name. Typical acidic roast served with cookie.',
            },
            {
                'cafe': '<a target="_blank" href="https://maps.app.goo.gl/HiXcJ7HjEQ3DuMEEA">Bo\'s Coffee</a><br />',
                'first_visit_date': '2023-10-14',
                'drink': 'Espresso', 'presentation': 3, 'texture': 3, 'flavour': 3,
                'remarks': 'Good location and ambience, unimpressive coffee',
            },
            {
                'cafe': '<a target="_blank" href="https://maps.app.goo.gl/W2E5JgCQx8jMfQkB7">Spaces Eatery</a><br />',
                'first_visit_date': '2023-10-24',
                'drink': 'Espresso', 'presentation': 3, 'texture': 5, 'flavour': 5,
                'remarks': 'Excellent mesa ambience, all medium roasts and Barista\'s finest blend is beautiful',
            },
            {
                'cafe': '<a target="_blank" href="https://maps.app.goo.gl/YM4uQ2wKYTKcNHDU9">Roasters Specialty Coffee House</a><br />',
                'first_visit_date': '2023-11-28',
                'drink': 'Espresso', 'presentation': 4, 'texture': 3, 'flavour': 3,
                'remarks': 'Nothing exceptional about it, more hype than worth',
            },
            {
                'cafe': '<a target="_blank" href="https://maps.app.goo.gl/Euh6yavwrtNeZ1T39">Common Grounds - DIFC</a><br />',
                'first_visit_date': '2023-12-11',
                'drink': 'Espresso', 'presentation': 4, 'texture': 4, 'flavour': 4,
                'remarks': 'Generically good stuff',
            },
            {
                'cafe': '<a target="_blank" href="https://maps.app.goo.gl/YMvaSE3yvxZrcVv68">Nightjar Coffee Roasters</a><br />',
                'first_visit_date': '2023-12-17',
                'drink': 'Espresso', 'presentation': 5, 'texture': 5, 'flavour': 5,
                'remarks': 'Legendary place, have multiple roast options and great food too',
            },
            {
                'cafe': '<a target="_blank" href="https://maps.app.goo.gl/VUjVkbe44F4P3nCU8">%ARABICA</a><br />',
                'first_visit_date': '2024-03-20',
                'drink': 'Espresso', 'presentation': 3, 'texture': 4, 'flavour': 4,
                'remarks': 'This is a front cover cafe for UAE, and a good one to add to regulars',
            },
            {
                'cafe': '<a target="_blank" href="https://maps.app.goo.gl/v67F1CfswRsWXkd66">Risen Café and Artisanal Bakery</a><br />',
                'first_visit_date': '2024-05-14',
                'drink': 'Espresso', 'presentation': 3, 'texture': 4, 'flavour': 5,
                'remarks': 'Quite an unordinary place since part of a hotel, not famous for anything. Surprisingly good.',
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

