//Animate.css library available here: https://github.com/daneden/animate.css
//Extending jQuery object allows us to use animateCss as a method to a $-wrapped object
$.fn.extend({
    animateCss: function (animationName) {
        let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});

//Shuffle function from https://www.kirupa.com/html5/shuffling_array_js.htm
//Updating the Array prototype so we can use .shuffle as an array method
Array.prototype.shuffle = function() {
    let input = this;
     
    for (let i = input.length - 1; i >= 0; i--) {
     
        let randomIndex = Math.floor(Math.random()*(i+1));
        let itemAtIndex = input[randomIndex];
         
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}

//gameData is set within generateNewGame()
let gameData = {};

let modalData = {
	modal: $('#simple-modal'),
	closeBtn: $('#close-btn'),
	openModal: function(e) {
		modalData.modal[0].style.display = 'block';
		if (!e) {
			$('#game-end').text('You win! Your final score is ' + $('.stars li').length + ' star(s).');
		} else {
			$('#game-end').text('Are you sure you wish to restart the game?');
			$('.btn-group').css('display', 'block');
		}
	},
	closeModal: function(e) {
		//close the modal if the event target is the close button or outside of the modal content
		if (e.target == modalData.modal[0] || e.target == modalData.closeBtn[0]) {
			modalData.modal[0].style.display = 'none';
		}
	}
};

//Card constructor function
function Card(cardClass) {
	let self = this;
	
	//cardClass handles the image displayed from Font Awesome for this card instance
	self.cardClass = cardClass;

	self.isOpen = false;

	//creating a new element for the DOM - not actually appending it here
	self.listItem = $('<li class="card"><i class="' + cardClass + '"></i></li>');

	self.listItem.on('click', function (e) {
		self.onCardClick(e);
	});

}

//click handler for Card constructor
Card.prototype.onCardClick = function(e) {

	//If a card is already open, or if there are already 2 cards clicked on the screen, don't proceed.
	if (this.isOpen || gameData.clickedCards.length === 2) {
		return false;
	}

	let clickedEl = e.target;

	$(clickedEl).animateCss('flipInY');

	gameData.clickedCards.push(this);
	clickedEl.classList.add('open', 'show');
	this.isOpen = true;
	this.compareCards();
}

Card.prototype.compareCards = function() {

	//Ensure there are 2 open cards shown on screen
	if (gameData.clickedCards.length === 2) {

		trackMovesAndScore();

		let card1 = gameData.clickedCards[0].listItem[0];
		let card2 = gameData.clickedCards[1].listItem[0];
		let card1Class = card1.firstElementChild.getAttribute('class');
		let card2Class = card2.firstElementChild.getAttribute('class');

		//Check match
		if (card1Class === card2Class) {
			card1.classList.add('match');
			card2.classList.add('match');
			gameData.matches += 1;

			setTimeout(function() {
				card1.setAttribute('class', 'card open show match animated pulse');
				card2.setAttribute('class', 'card open show match animated pulse');
			}, 500);

			//Alert **after** the other card has been flipped.
			setTimeout(function(){
				if (gameData.matches === 8) {
					modalData.openModal();
				}
			}, 1000);

			gameData.clickedCards = [];

		} else {
			setTimeout(function() {
				card1.setAttribute('class', 'card open show animated shake');
				card2.setAttribute('class', 'card open show animated shake');
			}, 500);

			setTimeout(function() {
				card1.setAttribute('class', 'card');
				card2.setAttribute('class', 'card');
				gameData.clickedCards.forEach(function(card) {
					card.isOpen = false;
				});
				gameData.clickedCards = [];
			}, 2000);
		}
	}
}

function trackMovesAndScore () {
	gameData.moves++;
	$('.moves').text(gameData.moves);

	if (gameData.moves > 15 && gameData.moves < 20) {
		$('.stars').html(gameData.starsHTML + gameData.starsHTML);
	} else if (gameData.moves >= 20) {
		$('.stars').html(gameData.starsHTML);
	}
}

function generateNewGame() {

	//initialize all game data to defaults
	gameData.openCards = [];
	gameData.score = 0;
	gameData.moves = 0;
	gameData.matches = 0;
	gameData.clickedCards = [];
	gameData.starsHTML = '<li><i class="fa fa-star"></i></li>';

	$('.moves').text(0);
	$('.stars').empty();
	$('.stars').append(gameData.starsHTML + gameData.starsHTML + gameData.starsHTML);

	let listOfCardClasses = [
		'fa fa-diamond',
		'fa fa-paper-plane-o',
		'fa fa-anchor',
		'fa fa-bolt',
		'fa fa-leaf',
		'fa fa-bicycle',
		'fa fa-cube',
		'fa fa-bomb'
	];

	let listOfCards = [];

	//generate two instances of each card class and add to overall list of cards
	listOfCardClasses.forEach(function(cardClass) {
		let card1 = new Card(cardClass);
		let card2 = new Card(cardClass);
		listOfCards.push(card1, card2);
	});

	//shuffle the list of cards and add the correct CSS class to each one
	listOfCards.shuffle();
	listOfCards.forEach(function(card) {
		$('.deck').append(card.listItem);
	});
}

function confirmRestart() {
	$('#game-end').text('Refreshing game data...');
	setTimeout(function() {
		$('.card').remove();
		modalData.modal[0].style.display = 'none';
		generateNewGame();
	}, 1800);
}

//CLICK HANDLERS

//Restart game
$('.restart').click(modalData.openModal);

//Confirm restart
$('.restart-confirm').click(confirmRestart);

//Close modal if someone clicks on "X" within the modal, or they click outside of the modal
$(modalData.closeBtn).click(modalData.closeModal);
$(window).click(modalData.closeModal);

//Generate new game when document is finished loading
$(function() {
	generateNewGame();
});
