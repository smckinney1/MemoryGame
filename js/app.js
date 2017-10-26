$(function() {

	//TODO: Get this into a function
	var openCards = [];
	var score = 0;
	var clickedCards = [];

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

	function Card(cardClass) {
		this.cardClass = cardClass;
		this.isOpen = false;
		//creating a new element for the DOM - not actually appending it here
		this.listItem = $('<li class="card"><i class="' + cardClass + '"></i></li>');
	}

	Card.prototype.show = function() {
		//change class of card to include "open"
		//possibly turn this into "flip" instead of "open" depending on functionality requirements
		// if (openCards.length === 0 || open.cards.length === 1) {
		// 	openCards.push(card.firstElementChild.getAttribute('class'));
		// 	card.setAttribute('class', 'card open show');
		// 	return true;
		// }
		// return false;
		//TODO: card.isOpen = true....



	}

	//Shuffle the deck and add cards to DOM
	//Display the cards face-down on the page
	function generateNewGame() {

		var listOfCardClasses = [
			'fa fa-diamond',
			'fa fa-paper-plane-o',
			'fa fa-anchor',
			'fa fa-bolt',
			'fa fa-leaf',
			'fa fa-bicycle',
			'fa fa-cube',
			'fa fa-bomb'
		];

		listOfCards = [];

		//generate a new card for each class and add it twice to the list of cards
		//this allows 16 cards to be generated on the screen
		listOfCardClasses.forEach(function(cardClass) {
			//create 2 card with same class and push to list
			var card1 = new Card(cardClass);
			var card2 = new Card(cardClass);
			listOfCards.push(card1, card2);
		});

		//shuffle the cards and add the correct CSS class to each one
		listOfCards.shuffle();
		listOfCards.forEach(function(card) {
			$('.deck').append(card.listItem);
		});
	}

	function onCardClick(e) {
		//add card to list of open cards
		////ensure only 2 cards open at once --> might control this through a different function
		//display card
		clickedCards.push(this);

		this.classList.add('open', 'show');

		if (clickedCards.length === 2) {
			var card1Class = clickedCards[0].firstElementChild.getAttribute('class');
			var card2Class = clickedCards[1].firstElementChild.getAttribute('class');

			if (card1Class === card2Class) {
				clickedCards[0].classList.add('match');
				clickedCards[1].classList.add('match');
			} else {
				setTimeout(function() {
					clickedCards[0].firstElementChild.setAttribute('class', 'card');
					clickedCards[1].firstElementChild.setAttribute('class', 'card');
				}, 2000);
			}
		}
	}

	$('.deck').on('click', '.card', onCardClick);

	$('.restart').click(function() {
		//ask user if they really want to restart
		//TODO: Make this a modal
		if(confirm('Are you sure you wish to restart?')) {
			$('.card').remove();
			generateNewGame();
		}
	});

	//TODO: Is this the best way to get the list of cards out of generateNewGame? Would it be better to simply have listOfCards be global and then change it within generateNewGame?
	var listOfCards = generateNewGame();

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


