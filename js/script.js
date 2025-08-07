/* ----- Global Var ----- */
var pos = 0;
var turn = 0;
var nm_byline = ['Computer Scientist', 'PhD Candidate', 'Master of Science (M.Sc.)', 'Microsoft Learn Student Ambassador', 'Research Assistant', 'Located in Stuttgart'];
var speed = 200;
var isClicked = false;
var isScrolled = false;
var year = new Date();
var age = 0;
var birthday = new Date(1998, 5, 6);
var currentTime = new Date().getHours();

/* ----- Birthday ----- */
age = year.getFullYear() - birthday.getFullYear();
if (year.getMonth() == birthday.getMonth()) {
	if (year.getDate() < birthday.getDate()) {
		age = age - 1;
	}
} else if (year.getMonth() < birthday.getMonth()) {
	age = age - 1;
}

/* ----- TypeWriter ----- */
setTimeout(typeWriter, 3000);

function typeWriter() {
	if (pos < nm_byline[turn].length) {
		document.getElementById("nm_byline").innerHTML += nm_byline[turn].charAt(pos);
		console.log(nm_byline[turn].charAt(pos));
		pos++;
		setTimeout(typeWriter, speed);
	} else {
		setTimeout(erase, speed + 1000);
	}
}

function erase() {
	if (pos >= 0) {
		var str = nm_byline[turn].toString().substring(0, pos);
		document.getElementById("nm_byline").innerHTML = str;
		pos--;
		setTimeout(erase, speed - 100);
	} else {
		turn++;
		if (turn >= nm_byline.length)
			turn = 0;
		setTimeout(typeWriter, speed);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const sections = document.querySelectorAll("section[id]");
	const navLinks = document.querySelectorAll(".nm_menu ul li a");
  
	function setActiveLink() {
	  let scrollPos = window.scrollY || document.documentElement.scrollTop;
  
	  sections.forEach((section) => {
		const offsetTop = section.offsetTop - 100; // adjust if nav height differs
		const offsetBottom = offsetTop + section.offsetHeight;
  
		if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
		  // Remove active from all
		  navLinks.forEach((link) => link.classList.remove("active"));
  
		  // Add active to matching link
		  const activeLink = document.querySelector(
			`.nm_menu ul li a[href="#${section.id}"]`
		  );
		  if (activeLink) {
			activeLink.classList.add("active");
		  }
		}
	  });
	}
  
	window.addEventListener("scroll", setActiveLink);
	setActiveLink(); // initial call
  });

  // Show & Hide Professional Background
  document.addEventListener("DOMContentLoaded", () => {
	const jobs = document.querySelectorAll("#nm_professional-job-list .nm_job");
	const showMoreBtn = document.getElementById("pbj-show-more-btn");
  
	for (let i = 3; i < jobs.length; i++) {
		jobs[i].classList.add("hidden");
	}
  
	const hiddenCount = jobs.length - 3;
	showMoreBtn.textContent = `Show more Professional Background (${hiddenCount})`;
	showMoreBtn.dataset.expanded = "false";
  });
  
  function toggleProfessionalJobs() {
	const jobs = document.querySelectorAll("#nm_professional-job-list .nm_job");
	const showMoreBtn = document.getElementById("pbj-show-more-btn");
	const expanded = showMoreBtn.dataset.expanded === "true";
  
	if (expanded) {
	  for (let i = 3; i < jobs.length; i++) {
		jobs[i].classList.add("hidden");
	  }
	  showMoreBtn.textContent = `Show more Professional Background (${jobs.length - 3})`;
	  showMoreBtn.dataset.expanded = "false";
  
	  const section = document.getElementById("nm_prof");
	  if (section) {
		const topPosition = section.getBoundingClientRect().top + window.scrollY - 50;
	  
		window.scrollTo({
		  top: topPosition,
		  behavior: "smooth"
		});
	  }
	} else {
	  for (let i = 3; i < jobs.length; i++) {
		jobs[i].classList.remove("hidden");
	  }
	  showMoreBtn.textContent = "Show less Professional Background";
	  showMoreBtn.dataset.expanded = "true";
	}  
  }

// Show & Hide Academic Background
  document.addEventListener("DOMContentLoaded", () => {
	const academicJobs = document.querySelectorAll("#nm_academic-job-list .nm_academic");
	const showMoreBtn = document.getElementById("abj-show-more-btn");
  
	for (let i = 3; i < academicJobs.length; i++) {
		academicJobs[i].classList.add("hidden");
	}
  
	const hiddenCount = academicJobs.length - 3;
	showMoreBtn.textContent = `Show more Academic Background (${hiddenCount})`;
	showMoreBtn.dataset.expanded = "false";
  });
  
  function toggleAcademicJobs() {
	const academicJobs = document.querySelectorAll("#nm_academic-job-list .nm_academic");
	const showMoreBtn = document.getElementById("abj-show-more-btn");
	const expanded = showMoreBtn.dataset.expanded === "true";
  
	if (expanded) {
	  for (let i = 3; i < academicJobs.length; i++) {
		academicJobs[i].classList.add("hidden");
	  }
	  showMoreBtn.textContent = `Show more Academic Background (${academicJobs.length - 3})`;
	  showMoreBtn.dataset.expanded = "false";
  
	  const section = document.getElementById("nm_academic");
	  if (section) {
		const topPosition = section.getBoundingClientRect().top + window.scrollY - 30;
	  
		window.scrollTo({
		  top: topPosition,
		  behavior: "smooth"
		});
	  }
	} else {
	  for (let i = 3; i < academicJobs.length; i++) {
		academicJobs[i].classList.remove("hidden");
	  }
	  showMoreBtn.textContent = "Show less Academic Background";
	  showMoreBtn.dataset.expanded = "true";
	}  
  }

// Show & Hide Publications
document.addEventListener("DOMContentLoaded", () => {
	const publications = document.querySelectorAll("#nm_publication_list .nm_publication");
	const showMoreBtn = document.getElementById("show-more-btn");

	for (let i = 3; i < publications.length; i++) {
	  publications[i].classList.add("hidden");
	}
  
	const hiddenCount = publications.length - 3;
	showMoreBtn.textContent = `Show more Publications (${hiddenCount})`;
	showMoreBtn.dataset.expanded = "false";
  });
  
  function togglePublications() {
	const publications = document.querySelectorAll("#nm_publication_list .nm_publication");
	const showMoreBtn = document.getElementById("show-more-btn");
	const expanded = showMoreBtn.dataset.expanded === "true";
  
	if (expanded) {
	  for (let i = 3; i < publications.length; i++) {
		publications[i].classList.add("hidden");
	  }
	  showMoreBtn.textContent = `Show more Publications (${publications.length - 3})`;
	  showMoreBtn.dataset.expanded = "false";
  
	  const section = document.getElementById("nm_publications_section");
	  if (section) {
		const topPosition = section.getBoundingClientRect().top + window.scrollY - 30;
	  
		window.scrollTo({
		  top: topPosition,
		  behavior: "smooth"
		});
	  }
	} else {
	  for (let i = 3; i < publications.length; i++) {
		publications[i].classList.remove("hidden");
	  }
	  showMoreBtn.textContent = "Show less Publications";
	  showMoreBtn.dataset.expanded = "true";
	}  
  }
  
  // Show & Hide Abstract
  document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".read-more-btn").forEach(button => {
	  button.addEventListener("click", () => {
		const paragraph = button.closest(".nm_cv_textbox").querySelector(".read-more-content");
		if (paragraph) {
		  const isHidden = paragraph.classList.contains("hidden");
		  paragraph.classList.toggle("hidden");
		  button.innerHTML = isHidden ? "<span>Read less</span>" : "<span>Read more</span>";
		}
	  });
	});
  });

// Show & Hide Certifications
document.addEventListener("DOMContentLoaded", () => {
	const certifications = document.querySelectorAll("#nm_certificate-list .nm_certificate");
	const showMoreBtn = document.getElementById("cert-show-more-btn");

	for (let i = 5; i < certifications.length; i++) {
		certifications[i].classList.add("hidden");
	}
  
	const hiddenCount = certifications.length - 5;
	showMoreBtn.textContent = `Show more Certifications (${hiddenCount})`;
	showMoreBtn.dataset.expanded = "false";
  });
  
  function toggleCertifications() {
	const certifications = document.querySelectorAll("#nm_certificate-list .nm_certificate");
	const showMoreBtn = document.getElementById("cert-show-more-btn");
	const expanded = showMoreBtn.dataset.expanded === "true";
  
	if (expanded) {
	  for (let i = 5; i < certifications.length; i++) {
		certifications[i].classList.add("hidden");
	  }
	  showMoreBtn.textContent = `Show more Certifications (${certifications.length - 5})`;
	  showMoreBtn.dataset.expanded = "false";
  
	  const section = document.getElementById("certifications");
	  if (section) {
		section.scrollIntoView({ behavior: "smooth", block: "start" });
	  }
	} else {
	  for (let i = 5; i < certifications.length; i++) {
		certifications[i].classList.remove("hidden");
	  }
	  showMoreBtn.textContent = "Show less Certifications";
	  showMoreBtn.dataset.expanded = "true";
	}  
  }

/* ----- Scroll Navbar ----- */
$(document).ready(function () {
	$(window).scroll(function () {
		if ($(document).scrollTop() > $(window).height()) {
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
function linkedIn() {
	if ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1)) {
		window.open("voyager://in/niklas-meissner", '_blank');
	} else if (navigator.platform.indexOf("Android") != -1) {
		window.open("intent://www.linkedin.com/in/niklas-meissner/#Intent;package=com.linkedin.android;scheme=https;end", '_blank');
	} else {
		window.open('https://www.linkedin.com/in/niklas-meissner', '_blank');
	}
}

/* ----- Xing ----- */
function xing() {
	if ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1)) {
		window.open("https://www.xing.com/profile/Niklas_Meissner6", '_blank');
	} else if (navigator.platform.indexOf("Android") != -1) {
		window.open("intent://www.xing.com/profile/Niklas_Meissner6/#Intent;package=com.xing.android;scheme=https;end", '_blank');
	} else {
		window.open('https://www.xing.com/profile/Niklas_Meissner6', '_blank');
	}
}

/* ----- Instagram ----- */
function instagram() {
	if ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1) || navigator.platform.indexOf("Android") != -1) {
		window.open("https://m.instagram.com/nik.meissner/", '_blank');
	} else {
		window.open('https://www.instagram.com/nik.meissner/', '_blank');
	}
}

/* ----- Facebook ----- */
function facebook() {
	if ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1) || navigator.platform.indexOf("Android") != -1) {
		window.open("https://m.facebook.com/people/Niklas-Mei%C3%9Fner/100004537065246", '_blank');
	} else {
		window.open('https://www.facebook.com/people/Niklas-Mei%C3%9Fner/100004537065246', '_blank');
	}
}

/* ----- Minimize Nav ----- */
function minimize() {
	if (!isScrolled) {
		$('nav').removeClass('onscroll');
	}
	$('nav').removeClass('deepscroll');
	$('.nm_menu').removeClass('active');
	if (document.getElementById('nm_menu-btn').checked) {
		$(".nm_menu-btn").click();
	}
	if (($(window).width() < 550) && (!isScrolled)) {
		$('.nm_head').removeClass('onscroll');
	}
}

/* ----- Responsive Navbar & Copyright ----- */
window.onload = function () {
	/* ----- IE bug fixes ----- */
	if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
		$('.nm_abilities_center').addClass('nm_abilities_center_ie');
		$('.nm_abilities_right').addClass('nm_abilities_right_ie');
		$('.nm_wrapper').css('background-attachment', 'scroll');
		$('.nm_about_img').css('width', '100%');
		$('.nm_about_img').css('height', 'auto');
		$('.nm_about_img_container').css('width', '60%');
		$('.nm_head').css('font-weight', 'normal');
		$('.nm_head').css('font-size', '1.7em');
		$('.nm_head').css('padding-top', '0em');
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
			if (!isScrolled) {
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
