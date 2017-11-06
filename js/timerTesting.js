var hours = 0;
var minutes = 0;
var seconds = 0;
  
var timer = setInterval(timeCounter, 10);

function timeCounter() {
  var timerDiv = document.getElementById('timer');
  seconds += 1;
  /*if (seconds % 3600 === 0) {
    hours += 1;
  } else if (seconds % 60 === 0) {
    minutes += 1;
  }*/
  var timeFormatted = timeFormatter(seconds);
 timerDiv.innerHTML = timeFormatted[2] + ' seconds, ' + timeFormatted[1] + ' minutes, ' + timeFormatted[0] + ' hours.';
}

function timeFormatter(seconds) {
  
}