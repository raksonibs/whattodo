
$(document).ready(function() {

	// Top nav slide down on load.
	$(".topnav").animate({ opacity: 0 }, 0);
	$(".topnav").delay(200).animate({top:"+=45", opacity: 1},1200);

	// top question and bottom statement fade-in on load.
	$(".question").hide().delay(200).fadeIn(1200);
	$(".bottom").hide().delay(200).fadeIn(1200);

	// Category boxes animate from left to right on load.
	$(".categories").animate({ opacity: 0 }, 0);
	$(".categories").delay(200).animate({left:"+=20", opacity: 1},1800);

	// This is where 6 new boxes need to be brought in ajax

	$(".categories1").hide();
	$(".categories1").animate({ opacity: 0 }, 0);

	$(".price").hide();
	$(".price").animate({ opacity: 0 }, 0);

	$(".categories").one('click', function() {
  		$(".categories").fadeOut( "slow", function() {
  			$(".categories1").show().animate({left:"+=20", opacity: 1},1800);
  		});
  		
	});

	$(".categories1").one('click', function() {
  		$(".categories1, .question").fadeOut( "slow", function() {
  			$(".price").show().animate({left:"+=20", opacity: 1},1800);
  		});
  		
	});
	
});