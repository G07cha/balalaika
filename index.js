var audio = {};
var isPlaying = false;
var isClicked = false;
const timeout = 300;

$(document).ready(function() {
	audio = $('audio')[0];
	
	$('.string').on('click', function() {
		blurString(this);
	});
	
	$(document).on('swipe', function(event) {
		var start = event.swipestart.coords;
		var stop = event.swipestop.coords;
		
		$('.string').each(function(index, string) {
			var offset = $(string).offset();
			if(start[0] < offset.left && stop[0] >= offset.left) {
				blurString(string);
			}
		});
	});
});

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

function blurString(string) {
	$(string).addClass('tb-blur');
	$(string).addClass('blur-1x');
	
	playSegment();
	
	setTimeout(function() {
		$(string).removeClass('tb-blur blur-1x');
	}, timeout + 100); // Look more realistic with additional timeout
}