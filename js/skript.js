// get offset=======================================================

function getOffset(el) {
	const rect = el.getBoundingClientRect();
	return {
		left: rect.left + window.scrollX,
		top: rect.top + window.scrollY,
	};
}

// Circle cursor=====================================================
const cursor = document.querySelector(".cursor"),
	victims = document.querySelectorAll(".victim");

document.addEventListener("mousemove", (e) => {
	cursor.setAttribute("style", "top: " + e.pageY + "px; left: " + e.pageX + "px;");
});

victims.forEach((victim) => {
	victim.addEventListener("mouseover", () => {
		cursor.classList.add("predator");
		victim.classList.add("victim--color");
	});
	victim.addEventListener("mouseleave", () => {
		cursor.classList.remove("predator");
		victim.classList.remove("victim--color");
	});
});

// header color======================================================

let projects = document.querySelector(".projects"),
	header = document.querySelector(".header"),
	webinars = document.querySelector(".webinars"),
	footer = document.querySelector(".footer");

function colorChange(e) {
	let projectTop = getOffset(projects).top,
		projectBottom = getOffset(projects).top + projects.offsetHeight,
		webinarsTop = getOffset(webinars).top,
		webinarsBottom = getOffset(webinars).top + webinars.offsetHeight,
		footerTop = getOffset(footer).top,
		footerBottom = getOffset(footer).top + footer.offsetHeight,
		headerBottom = getOffset(header).top + header.offsetHeight - 25;

	if (
		(projectTop < headerBottom && projectBottom > headerBottom) ||
		(webinarsTop < headerBottom && webinarsBottom > headerBottom) ||
		(footerTop < headerBottom && footerBottom > headerBottom)
	) {
		document.querySelector(".header__logo").style.color = "#fff";
		document.querySelectorAll(".header__circle").forEach((span) => {
			span.style.background = "#fff";
		});
	} else {
		document.querySelector(".header__logo").style.color = "#000";
		document.querySelectorAll(".header__circle").forEach((span) => {
			span.style.background = "#000";
		});
	}
}

document.addEventListener("scroll", colorChange);

// header burger====================================================

document.querySelector(".header__burger").click(function () {
	document.querySelector(".header__hidden").classList.add("visible");
});

// banner scale======================================================
window.addEventListener("scroll", function () {
	let scroll = window.pageYOffset;
	let banner = document.querySelector(".banner");
	banner.style.transform = "translate3d(0," + scroll / 100 + "%,0) scale(" + (100 - scroll / 30) / 100 + ")";
});

// banner eagle================================================

document.addEventListener("mousemove", function (e) {
	let eagle = document.querySelector(".banner__image");

	eagle.style.left = e.pageX / 20 + "px";
});

// swiper=====================================================
new Swiper(".swiper-container", {
	spaceBetween: 30,
	loop: true,
	breakpoints: {
		480: {
			slidesPerView: 1,
			spaceBetween: 30,
		},
		680: {
			slidesPerView: 1.5,
			spaceBetween: 30,
		},
		1024: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		1350: {
			slidesPerView: 2.5,
			spaceBetween: 30,
		},
		1900: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
	},
	pagination: {
		el: ".swiper-pagination",
		type: "fraction",
		clickable: true,
		renderFraction: function (currentClass, totalClass) {
			return '<span class="' + currentClass + '"></span>' + '<span class="' + totalClass + '"></span>';
		},
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});

// shaking==============================================

var root = document.querySelectorAll(".shaky-block");

root.forEach(function (el) {
	var mouse_monitor = function (e) {
		let eleDistanceToTop = document.body.scrollTop,
			eleTop = el.offsetTop,
			eleLeft = el.offsetLeft,
			eleHeight = el.offsetTop + el.offsetHeight - eleTop,
			eleWidth = el.offsetLeft + el.offsetWidth - eleLeft;

		let x = e.clientX - eleLeft,
			y = e.clientY - eleDistanceToTop;

		let move_x = x > eleWidth / 2 ? "15px" : "-15px",
			move_y = y > eleHeight / 2 ? "11px" : "-11px",
			move_x1 = x > eleWidth / 2 ? "8px" : "-8px",
			move_y1 = y > eleHeight / 2 ? "6px" : "-6px";

		el.style.setProperty("--translate-x", move_x);
		el.style.setProperty("--translate-y", move_y);
		el.style.setProperty("--translate-x1", move_x1);
		el.style.setProperty("--translate-y1", move_y1);
	};

	el.addEventListener("mousemove", mouse_monitor);
});

// добавление sticy для footera

let animItems = document.querySelectorAll(".webinars");
let animItems2 = document.querySelectorAll(".footer");
let degBox = document.querySelector(".footer__rectangle");

if (animItems.length > 0) {
	window.addEventListener("scroll", addSticky);

	function addSticky() {
		for (let i = 0; i < animItems.length; i++) {
			const animItem = animItems[i];
			const animItem2 = animItems2[i];
			const animItemTop = animItem.offsetTop;
			const animItemBottom = animItem.offsetTop + animItem.offsetHeight;

			if (animItemTop < pageYOffset) {
				animItem2.style.position = "sticky";
			} else {
				animItem2.style.position = "relative";
			}

			if (animItemBottom - 400 < pageYOffset) {
				degBox.style.transform = "translateY(-50%) rotate(-90deg)";
			} else {
				degBox.style.transform = "translateY(-50%) rotate(0deg)";
			}
		}
	}
}
