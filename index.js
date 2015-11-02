var audio = {};
var isPlaying = false;
var isClicked = false;
const timeout = 300;

window.onload = function() {
	audio = document.getElementById("audio");
}

function playSegment() {
	if(!isPlaying) {
		isPlaying = true;
		
		audio.play();
		
		setTimeout(function() {
			isPlaying = false;
			
			if(!isClicked) {
				audio.pause();
			} else {
				isClicked = false;
				playSegment();
			}
		}, timeout);
	} else {
		isClicked = true;
	}
}

function blurString(number) {
	var string = document.getElementById(number.toString());
	
	string.className += " blurred";
	
	playSegment();
	
	setTimeout(function() {
		string.className = "string";
	}, timeout + 100);
}