/* =============================================
   Global State
   ============================================= */
var pos = 0;
var turn = 0;
var isClicked = false;
var isScrolled = false;

/* =============================================
   Typewriter
   ============================================= */
var nm_byline = ['Computer Scientist', 'PhD Candidate', 'Master of Science (M.Sc.)', 'Microsoft Learn Student Ambassador', 'Research Assistant', 'Located in Stuttgart'];
var speed = 200;

setTimeout(typeWriter, 3000);

function typeWriter() {
	if (pos < nm_byline[turn].length) {
		document.getElementById("nm_byline").innerHTML += nm_byline[turn].charAt(pos);
		pos++;
		setTimeout(typeWriter, speed);
	} else {
		setTimeout(erase, speed + 1000);
	}
}

function erase() {
	if (pos >= 0) {
		document.getElementById("nm_byline").innerHTML = nm_byline[turn].substring(0, pos);
		pos--;
		setTimeout(erase, speed - 100);
	} else {
		turn = (turn + 1) % nm_byline.length;
		setTimeout(typeWriter, speed);
	}
}

/* =============================================
   Age Calculation
   ============================================= */
var birthday = new Date(1998, 5, 6);

function calculateAge() {
	var today = new Date();
	var age = today.getFullYear() - birthday.getFullYear();
	if (today.getMonth() < birthday.getMonth() ||
		(today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())) {
		age--;
	}
	return age;
}

/* =============================================
   Show / Hide List Helper
   ============================================= */
function initCollapsibleList(listSelector, itemSelector, btnId, label, visibleCount) {
	var items = document.querySelectorAll(listSelector + ' ' + itemSelector);
	var btn = document.getElementById(btnId);
	if (!btn || !items.length) return;

	for (var i = visibleCount; i < items.length; i++) {
		items[i].classList.add("hidden");
	}
	btn.textContent = 'Show more ' + label + ' (' + (items.length - visibleCount) + ')';
	btn.dataset.expanded = "false";
}

function toggleCollapsibleList(listSelector, itemSelector, btnId, label, visibleCount, scrollTargetId, scrollOffset) {
	var items = document.querySelectorAll(listSelector + ' ' + itemSelector);
	var btn = document.getElementById(btnId);
	if (!btn || !items.length) return;

	var expanded = btn.dataset.expanded === "true";

	for (var i = visibleCount; i < items.length; i++) {
		items[i].classList.toggle("hidden", expanded);
	}

	if (expanded) {
		btn.textContent = 'Show more ' + label + ' (' + (items.length - visibleCount) + ')';
		btn.dataset.expanded = "false";
		var section = document.getElementById(scrollTargetId);
		if (section) {
			window.scrollTo({
				top: section.getBoundingClientRect().top + window.scrollY - scrollOffset,
				behavior: "smooth"
			});
		}
	} else {
		btn.textContent = 'Show less ' + label;
		btn.dataset.expanded = "true";
	}
}

/* ----- Public toggle functions called from HTML ----- */
function toggleProfessionalJobs() {
	toggleCollapsibleList("#nm_professional-job-list", ".nm_job", "pbj-show-more-btn", "Professional Background", 3, "nm_prof", 50);
}

function toggleAcademicJobs() {
	toggleCollapsibleList("#nm_academic-job-list", ".nm_academic", "abj-show-more-btn", "Academic Background", 3, "nm_academic", 30);
}

function togglePublications() {
	toggleCollapsibleList("#nm_publication_list", ".nm_publication", "show-more-btn", "Publications", 3, "nm_publications_section", 30);
}

function toggleCertifications() {
	var btn = document.getElementById("cert-show-more-btn");
	var expanded = btn && btn.dataset.expanded === "true";
	var items = document.querySelectorAll("#nm_certificate-list .nm_certificate");

	for (var i = 5; i < items.length; i++) {
		items[i].classList.toggle("hidden", expanded);
	}

	if (expanded) {
		btn.textContent = 'Show more Certifications (' + (items.length - 5) + ')';
		btn.dataset.expanded = "false";
		var section = document.getElementById("certifications");
		if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
	} else {
		btn.textContent = "Show less Certifications";
		btn.dataset.expanded = "true";
	}
}

/* =============================================
   Deep Linking (Social Media)
   ============================================= */
function isMobile() {
	return /iPhone|iPod|iPad|Android/.test(navigator.platform + navigator.userAgent);
}

function isIOS() {
	return /iPhone|iPod|iPad/.test(navigator.platform);
}

function isAndroid() {
	return navigator.platform.indexOf("Android") !== -1;
}

function linkedIn() {
	if (isIOS()) {
		window.open("voyager://in/niklas-meissner", '_blank');
	} else if (isAndroid()) {
		window.open("intent://www.linkedin.com/in/niklas-meissner/#Intent;package=com.linkedin.android;scheme=https;end", '_blank');
	} else {
		window.open('https://www.linkedin.com/in/niklas-meissner', '_blank');
	}
}

function xing() {
	if (isIOS()) {
		window.open("https://www.xing.com/profile/Niklas_Meissner6", '_blank');
	} else if (isAndroid()) {
		window.open("intent://www.xing.com/profile/Niklas_Meissner6/#Intent;package=com.xing.android;scheme=https;end", '_blank');
	} else {
		window.open('https://www.xing.com/profile/Niklas_Meissner6', '_blank');
	}
}

function instagram() {
	if (isMobile()) {
		window.open("https://m.instagram.com/nik.meissner/", '_blank');
	} else {
		window.open('https://www.instagram.com/nik.meissner/', '_blank');
	}
}

function facebook() {
	if (isMobile()) {
		window.open("https://m.facebook.com/people/Niklas-Mei%C3%9Fner/100004537065246", '_blank');
	} else {
		window.open('https://www.facebook.com/people/Niklas-Mei%C3%9Fner/100004537065246', '_blank');
	}
}

/* =============================================
   Navigation
   ============================================= */

/* ----- Sticky Navbar on scroll ----- */
$(document).ready(function () {
	$(window).scroll(function () {
		if ($(document).scrollTop() > $(window).height()) {
			$('nav').addClass('onscroll');
			$('.nm_head').addClass('nm_nav_bold');
			$('#nm_header_frame').addClass('nm_header_sticky');
			$('.nm_btn_top').addClass('nm_btn_show');
			isScrolled = true;
		} else {
			$('nav').removeClass('onscroll deepscroll');
			$('.nm_head').removeClass('nm_nav_bold');
			$('#nm_header_frame').removeClass('nm_header_sticky');
			$('.nm_btn_top').removeClass('nm_btn_show');
			if (document.getElementById('nm_menu-btn').checked) {
				$('nav').addClass('onscroll deepscroll');
				$('.nm_head').addClass('nm_nav_bold');
			}
			isScrolled = false;
		}
	});
});

/* ----- Active nav link on scroll ----- */
document.addEventListener("DOMContentLoaded", function () {
	var sections = document.querySelectorAll("section[id]");
	var navLinks = document.querySelectorAll(".nm_menu ul li a");

	function setActiveLink() {
		var scrollPos = window.scrollY || document.documentElement.scrollTop;
		sections.forEach(function (section) {
			var offsetTop = section.offsetTop - 100;
			var offsetBottom = offsetTop + section.offsetHeight;
			if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
				navLinks.forEach(function (link) { link.classList.remove("active"); });
				var activeLink = document.querySelector('.nm_menu ul li a[href="#' + section.id + '"]');
				if (activeLink) activeLink.classList.add("active");
			}
		});
	}

	window.addEventListener("scroll", setActiveLink);
	setActiveLink();
});

/* ----- Hamburger menu toggle ----- */
function minimize() {
	if (!isScrolled) $('nav').removeClass('onscroll');
	$('nav').removeClass('deepscroll');
	$('.nm_menu').removeClass('active');
	if (document.getElementById('nm_menu-btn').checked) {
		$(".nm_menu-btn").click();
	}
	if ($(window).width() < 550 && !isScrolled) {
		$('.nm_head').removeClass('onscroll');
	}
}

/* =============================================
   window.onload
   ============================================= */
window.onload = function () {

	/* ----- IE bug fixes ----- */
	if (navigator.userAgent.indexOf("MSIE") !== -1 || !!document.documentMode) {
		$('.nm_abilities_center').addClass('nm_abilities_center_ie');
		$('.nm_abilities_right').addClass('nm_abilities_right_ie');
		$('.nm_wrapper').css('background-attachment', 'scroll');
		$('.nm_about_img').css({ 'width': '100%', 'height': 'auto' });
		$('.nm_about_img_container').css('width', '60%');
		$('.nm_head').css({ 'font-weight': 'normal', 'font-size': '1.7em', 'padding-top': '0em' });
	}

	/* ----- Hamburger menu click handler ----- */
	document.getElementById('nm_menu-btn').addEventListener('click', function () {
		isClicked = !isClicked;
		if (isClicked) {
			$('nav').addClass('deepscroll');
			$('.nm_menu').addClass('active');
			$('.nm_head').addClass('nm_nav_bold');
			if ($(window).width() < 550) $('.nm_head').addClass('onscroll');
		} else {
			if (!isScrolled) {
				$('nav').removeClass('onscroll');
				$('.nm_head').removeClass('nm_nav_bold');
			}
			$('nav').removeClass('deepscroll');
			$('.nm_menu').removeClass('active');
			if ($(window).width() < 550 && !isScrolled) $('.nm_head').removeClass('onscroll');
		}
	});

	/* ----- Birthday & Copyright ----- */
	document.getElementById("nm_birthday").innerHTML = "June 06, 1998 (" + calculateAge() + ")";
	document.getElementById("nm_copyright").innerHTML = "Copyright &copy; <em>" + new Date().getFullYear() + " Niklas Meißner</em> - All rights reserved.";
};
