var isPlaying = false;
var isClicked = false;
const timeout = 300;

$(window).load(function() {
    $('.loading').fadeOut(1000);
    
    setTimeout(function() {
        $('.balalaika').show();
    }, 1000);
    
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
		
        $('audio').trigger("play");
		
		setTimeout(function() {
			isPlaying = false;
			
			if(!isClicked) {
                $('audio').trigger("pause");
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