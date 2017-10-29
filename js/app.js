$(function() {

	var gameData = {
		openCards: [],
		score: 0,
		matches: 0,
		clickedCards: []
	}

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
		//preserve the context of "this"
		var self = this;
		
		self.cardClass = cardClass;
		self.isOpen = false;

		//creating a new element for the DOM - not actually appending it here
		self.listItem = $('<li class="card"><i class="' + cardClass + '"></i></li>');

		self.listItem.on('click', function (e) {
			//below function will carry the context of the card with it
			//this = <li>...</li>
			//self = the context of this card

			//TODO: Prevent anything from happening if card has already been clicked (use this.isOpen)
			self.onCardClick(e);
		});

	}

	//click handler for Card constructor
	Card.prototype.onCardClick = function(e) {
		var clickedEl = e.target;
		if (this.isOpen) {
			return false;
		}

		gameData.clickedCards.push(this);
		clickedEl.classList.add('open', 'show');
		this.isOpen = true;
		this.checkMatch();
	}

	Card.prototype.checkMatch = function() {
		//if 1 card is shown: add new card to shown cards list, then check for match
		//if 0 cards are shown: add new card to shown cards list
		//ON MATCH: Clear the array of shown cards, change the class to include 'match'
		if (gameData.clickedCards.length === 2) {
			var card1 = gameData.clickedCards[0].listItem[0];
			var card2 = gameData.clickedCards[1].listItem[0];
			var card1Class = card1.firstElementChild.getAttribute('class');
			var card2Class = card2.firstElementChild.getAttribute('class');

			if (card1Class === card2Class) {
				card1.classList.add('match');
				card2.classList.add('match');
				gameData.matches += 1;

				//Alert **after** the other card has been flipped.
				//TODO: Turn this into a modal
				setTimeout(function(){
					if (gameData.matches === 8) {
						//TODO: Make this a modal, ask if want to play again, if yes reset the board, else do nothing
						alert('Game over, all cards matched');
					}
				}, 1000);

				gameData.clickedCards = [];

			} else {
				setTimeout(function() {
					card1.setAttribute('class', 'card');
					card2.setAttribute('class', 'card');
					gameData.clickedCards.forEach(function(card) {
						card.isOpen = false;
					})
					gameData.clickedCards = [];
				}, 2000);
			}
		}
	}

/*	Card.prototype.show = function() {
		//update class of card to include "open show"
		this.isOpen = true;
		this.classList.add('open', 'show');
	}*/

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

		var listOfCards = [];

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

