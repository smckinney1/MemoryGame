$(function() {

	//TODO: Get this into a function
	var openCards = [];
	var score = 0;

	//Shuffle function from https://www.kirupa.com/html5/shuffling_array_js.htm
	//Updating the Array prototype so we can use .shuffle as an array method
	Array.prototype.shuffle = function() {
	    var input = this;
	     
	    for (var i = input.length - 1; i >= 0; i--) {
	     
	        var randomIndex = Math.floor(Math.random()*(i+1)); 
	        var itemAtIndex = input[randomIndex]; 
	         
	        input[randomIndex] = input[i]; 
	        input[i] = itemAtIndex;
	    }
	    return input;
	}

	//Shuffle the deck and add cards to DOM
	//Display the cards face-down on the page
	function generateNewGame() {
	 	var cards = [
			'fa fa-diamond',
			'fa fa-paper-plane-o',
			'fa fa-anchor',
			'fa fa-bolt',
			'fa fa-leaf',
			'fa fa-bicycle',
			'fa fa-cube',
			'fa fa-bomb',
			'fa fa-diamond',
			'fa fa-paper-plane-o',
			'fa fa-anchor',
			'fa fa-bolt',
			'fa fa-leaf',
			'fa fa-bicycle',
			'fa fa-cube',
			'fa fa-bomb'
		];
		cards.shuffle();
		cards.forEach(function(card) {
			$('.deck').append('<li class="card"><i class="' + card + '"></i></li>');
		});
	}

	function displayCard(e) {
		//add card to list of open cards
		////ensure only 2 cards open at once --> might control this through a different function
		//display card
		if (openCards.length === 0) {
			//show the card and push it to array
		} else if (openCards.length === 1) {
			//show the card, push it to the array, and 
		}
		var cardType = this.firstElementChild.getAttribute('class');
		openCards.push(cardType);
		console.log(openCards);
	}

	$('.deck').on('click', '.card', displayCard);

	$('.restart').click(function() {
		//ask user if they really want to restart
		//TODO: Make this a modal
		if(confirm('Are you sure you wish to restart?')) {
			$('.card').remove();
			generateNewGame();
		}
	});

	generateNewGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
});


