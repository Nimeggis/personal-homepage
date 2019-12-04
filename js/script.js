/* ----- Global Var ----- */
var black;
var pos = 0;
var pos1 = 0;
var turn = 0;
var nm_name = ['Niklas Meißner'];
var nm_byline = ['Computer Scientist','Located in Stuttgart'];
var speed = 200;
var isClicked = false;
var isScrolled = false;
var year = new Date();
var age = 0;
var birthday = new Date(1998, 06, 06);
var currentTime = new Date().getHours();

/* ----- Birthday ----- */
age = year.getFullYear() - birthday.getFullYear();
if(year.getMonth() < birthday.getMonth()){
	age = age-1;
}
if(year.getMonth() == birthday.getMonth()){
	if(year.getDate() < birthday.getDate()){
		age = age-1;
	}
}

/* ----- TypeWriter ----- */
setTimeout(typeWriter, 1500);

function typeWriter() {
  if (pos1 < nm_name[turn].length) {
    document.getElementById("nm_name").innerHTML += nm_name[turn].charAt(pos1);
    console.log(nm_name[turn].charAt(pos1));
    pos1++;
    setTimeout(typeWriter, speed);
  } else {
  	setTimeout(typeWriter1, 1500);
  }
}

function typeWriter1() {
  if (pos < nm_byline[turn].length) {
    document.getElementById("nm_byline").innerHTML += nm_byline[turn].charAt(pos);
    console.log(nm_byline[turn].charAt(pos));
    pos++;
    setTimeout(typeWriter1, speed);
  } else {
  	setTimeout(erase, speed+1000);
  }
}

function erase() {
	if (pos >= 0) {
      var str=nm_byline[turn].toString().substring(0, pos);
      document.getElementById("nm_byline").innerHTML = str;
      pos--;
      setTimeout(erase, speed-100);
    } else {
      turn++;
      if(turn>=nm_byline.length) 
        turn=0;
      setTimeout(typeWriter1, speed);
    }
}

/* ----- Landingpage Background ----- */
function changeColor() {
	if(black==0){
		document.getElementsByClassName("nm_wrapper")[0].style.backgroundImage = "url('img/colorDesk.jpg')";
		black = 1;
	} else {
		document.getElementsByClassName("nm_wrapper")[0].style.backgroundImage = "url('img/blackDesk.jpg')";
		black = 0;
	}
}

/* ----- Scroll Navbar ----- */
$(document).ready(function() {
	$(window).scroll(function() {
	if($(document).scrollTop() > $(window).height()) {
		$('nav').addClass('onscroll');
		$('.nm_head').addClass('nm_nav_bold');
		$('#nm_header_frame').addClass('nm_header_sticky');
		$('.nm_btn_top').addClass('nm_btn_show');
		isScrolled = true;
	}
	else {
		$('nav').removeClass('onscroll');
		$('nav').removeClass('deepscroll'); 
		$('.nm_head').removeClass('nm_nav_bold');
		$('#nm_header_frame').removeClass('nm_header_sticky');
		$('.nm_btn_top').removeClass('nm_btn_show');
		if (document.getElementById('nm_menu-btn').checked) {
			$('nav').addClass('onscroll');
			$('nav').addClass('deepscroll'); 
			$('.nm_head').addClass('nm_nav_bold');
		}
		isScrolled = false;
	}
  });
});

/* ----- Deep Linking ----- */
/* ----- LinkedIn ----- */
function linkedIn(){
    if( (navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1)) {
         window.open("voyager://in/niklas-meißner", '_blank');
    } else if(navigator.platform.indexOf("Android") != -1) {
         window.open("intent://www.linkedin.com/in/niklas-meißner/#Intent;package=com.linkedin.android;scheme=https;end", '_blank');
	} else {
		window.open('https://www.linkedin.com/in/niklas-meißner', '_blank');
	}
}

/* ----- Xing ----- */
function xing(){
    if( (navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1)) {
         window.open("https://www.xing.com/profile/Niklas_Meissner6", '_blank');
    } else if(navigator.platform.indexOf("Android") != -1) {
         window.open("intent://www.xing.com/profile/Niklas_Meissner6/#Intent;package=com.xing.android;scheme=https;end", '_blank');
	} else {
		window.open('https://www.xing.com/profile/Niklas_Meissner6', '_blank');
	}
}

/* ----- Instagram ----- */
function instagram(){
    if( (navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1) || navigator.platform.indexOf("Android") != -1) {
         window.open("https://m.instagram.com/nik.meissner/", '_blank');
	} else {
		window.open('https://www.instagram.com/nik.meissner/', '_blank');
	}
}

/* ----- Facebook ----- */
function facebook(){
    if( (navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1) || navigator.platform.indexOf("Android") != -1) {
         window.open("https://m.facebook.com/people/Niklas-Mei%C3%9Fner/100004537065246", '_blank');
	} else {
		window.open('https://www.facebook.com/people/Niklas-Mei%C3%9Fner/100004537065246', '_blank');
	}
}

/* ----- Minimize Nav ----- */
function minimize() {
	if (!isScrolled){
		$('nav').removeClass('onscroll');             
	}
	$('nav').removeClass('deepscroll');   
	$('.nm_menu').removeClass('active');
	if (document.getElementById('nm_menu-btn').checked) {
		$( ".nm_menu-btn" ).click();
	}
	if (($(window).width() < 550) && (!isScrolled)) {
		$('.nm_head').removeClass('onscroll');
	}
}

/* ----- Responsive Navbar & Copyright ----- */
window.onload = function() {
	
	/* ----- Dynamic Background ----- */
	if (8 <= currentTime && currentTime < 20) {
		document.getElementsByClassName("nm_wrapper")[0].style.backgroundImage = "url('img/colorDesk.jpg')";
		black = 1;
	}
	else {
		document.getElementsByClassName("nm_wrapper")[0].style.backgroundImage = "url('img/blackDesk.jpg')";
		black = 0;
	}
	
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
	
	/* ----- Birthday ----- */
    document.getElementById("nm_birthday").innerHTML = "June 06, 1998 (" + age + ")";
	
	/* ----- Copyright ----- */
    document.getElementById("nm_copyright").innerHTML = "Copyright &copy; <em>" + year.getFullYear() + " Niklas Meißner <em> - All rights reserved.";
}
