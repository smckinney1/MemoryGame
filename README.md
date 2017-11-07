# Memory Game Project

## Table of Contents

* [About](#about)
* [Instructions](#instructions)
* [Contributing](#contributing)
* [Code](#code)

## About

This project provides practice with creating constructor functions, modifying prototypes, asynchronous scripting, asynchronous programming, and a mix of functional and object-oriented programming.

Cards are represented by Font Awesome icon classes.

## Instructions

Players should match cards on screen until all cards have been matched. The game will track how many moves a player has made as well as determine a score based on the number of moves, represented by star icons. The star score defaults to three and will decrease with a greater number of moves made.

If a player wishes, they can restart the game at any time by clicking the refresh icon in the upper right.

A timer tracks how long it takes to finish the game. It is reset when restarting the game.

## Contributing

At this time I am not accepting pull requests on this project. This may change in the future if I decide to further build this game out.

## Code

Udacity provided the basic structure of the HTML and most of the CSS. I made modifications to the HTML where I felt necessary, including adding a modal, and added CSS related to the modal within the CSS file. All JavaScript code, minus the Array.prototype.shuffle() method, is my own.

Thanks to Kirupa.com for the aforementioned Array.prototype.shuffle() method: https://www.kirupa.com/html5/shuffling_array_js.htm

Rather than using Bootstrap modals or jQuery UI, I elected to learn how to create a modal on my own using Traversy Media's YouTube tutorial. I modified styling and markup where I felt appropriate: https://www.youtube.com/watch?v=6ophW7Ask_0

Libraries used:
-- jQuery
-- Animate.css

Also thanks to Font Awesome for the icons used on the cards, and Google Fonts for the font I used throughout the app.