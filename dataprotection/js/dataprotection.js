/* ----- Global Var ----- */
var isClicked = false;
var isScrolled = false;
var year = new Date();

/* ----- Scroll Navbar ----- */
$(document).ready(function() {
	$(window).scroll(function() {
	if($(document).scrollTop() > 10) {
		$('nav').addClass('onscroll');
		$('.nm_head').addClass('nm_nav_bold');
		$('#nm_header_frame').addClass('nm_header_sticky');
		isScrolled = true;
	}
	else {
		$('nav').removeClass('onscroll');
		$('nav').removeClass('deepscroll'); 
		$('.nm_head').removeClass('nm_nav_bold');
		$('#nm_header_frame').removeClass('nm_header_sticky');
		if (document.getElementById('nm_menu-btn').checked) {
			$('nav').addClass('onscroll');
			$('nav').addClass('deepscroll'); 
			$('.nm_head').addClass('nm_nav_bold');
		}
		isScrolled = false;
	}
  });
});

window.onload = function() {
	/* ----- Onscroll ----- */
	document.getElementById('nm_menu-btn').addEventListener('click', function () {
		isClicked = !isClicked;
		if (isClicked) {
			$('nav').addClass('deepscroll');
			$('.nm_menu').addClass('active');
			$('.nm_head').addClass('nm_nav_bold');
			if ($(window).width() < 550) {
				$('.nm_head').addClass('onscroll');
			}
		}
		else {
			if (!isScrolled){
				$('nav').removeClass('onscroll');	
				$('.nm_head').removeClass('nm_nav_bold');				
			}	
			$('nav').removeClass('deepscroll');   
			$('.nm_menu').removeClass('active');
			if (($(window).width() < 550) && (!isScrolled)) {
				$('.nm_head').removeClass('onscroll');
			}
		}
	});

	/* ----- Copyright ----- */
    document.getElementById("nm_copyright").innerHTML = "Copyright &copy; <em>" + year.getFullYear() + " Niklas Meißner <em> - All rights reserved.";
	
	/* ----- Reload to Top ----- */
	$(document).ready(function(){
		$(this).scrollTop(0);
	});
}
