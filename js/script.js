// // Main js file
// // see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-
// const jquery = require("jQuery");
// const $ = require("jQuery");
// const jQuery = require("jQuery");
// window.jQuery = $;
// const fancybox = require("@fancyapps/fancybox");
// import 'slick-carousel';

//Add class header
window.addEventListener('scroll', function () {
	const header = document.querySelector('header');
	header.classList.toggle('sticky', window.scrollY > 0);
	if (screen.width <= 768) {
		header.classList.remove('sticky');
	}
});
// Burger
$('.header-burger').click(function () {
	$('.header-burger,.menu').toggleClass('show');
	$('body').toggleClass('lock');
});

$('.menu-link').click(function (event) {
	$('.header-burger,.menu').removeClass('show');
	$('body').removeClass('lock');
});

$(window).scroll(function () {
	let height = $(window).scrollTop();
	if (height > 400) {
		$('.skills-progress').addClass('animate');
	} else {
		$('.skills-progress').removeClass('animate');
	}
});

//Scroll
$(".header-menu").on("click", "a", function (event) {
	event.preventDefault();
	const id = $(this).attr('href'),
		top = $(id).offset().top;
	$('body,html').animate({
		scrollTop: top
	}, 1500);
});

//Scroll Up
$('#up, #up2').click(function () {
	$('html, body').animate({
		scrollTop: 0
	}, 1000);
	return false;
});


window.addEventListener('scroll', () => {
	let scrollDistance = window.scrollY;

	if (window.innerWidth > 768) {
		document.querySelectorAll('.page').forEach((el, i) => {
			if (el.offsetTop - document.querySelector('.header').clientHeight <= scrollDistance) {
				document.querySelectorAll('.header-menu a').forEach((el) => {
					if (el.classList.contains('active')) {
						el.classList.remove('active');
					}
				});

				document.querySelectorAll('.header-menu li')[i].querySelector('a').classList.add('active');
			}
		});
	}
});

// Popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 500;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup-content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnLock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnLock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	for (let index = 0; index < lockPadding.length; index++) {
		const el = lockPadding[index];
		el.style.paddingRight = lockPaddingValue;
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	if (!Element.prototype.closest) {
	}
	Element.prototype.closest = function (css) {
		let node = this;
		while (node) {
			if (node.matches(css)) return node;
			else node = node.parentElement;
		}
		return null;
	};
})();

(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();

//Filter
let filter = $("[data-filter]");

filter.on("click", function (event) {
	event.preventDefault();

	let cat = $(this).data('filter');

	if (cat == 'all') {
		$("[data-cat]").removeClass("hidden");
	} else {
		$("[data-cat]").each(function () {
			let workCat = $(this).data('cat');

			if (workCat != cat) {
				$(this).addClass('hidden');
			} else {
				$(this).removeClass('hidden');
			}
		});
	}
});

$(".works-btn").click(function (e) {
	$(".works-item:hidden").slice(0, 3).fadeIn();
	if ($(".works-item:hidden").length < 1) $(this).fadeOut();
});

const contact = document.querySelector('.contact-btn');
contact.addEventListener('click', function () {
	const form = document.querySelector('.contact-box');
	form.classList.toggle('open')
});

$('[data-fancybox=""]').fancybox({});

$('.doc-slider').slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	fade: true,
	arrows: true,
	dots: true,
	nextArrow: document.querySelector('.doc-arrows__next'),
	prevArrow: document.querySelector('.doc-arrows__prev'),
	responsive: [
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: false
			}
		}
	]
});


[].forEach.call(document.querySelectorAll('img[data-src]'), function (img) {
	img.setAttribute('src', img.getAttribute('data-src'));
	img.onload = function () {
		img.removeAttribute('data-src');
	};
});
//
// // Проверяем, можно ли использовать Webp формат
// function canUseWebp() {
// 	// Создаем элемент canvas
// 	let elem = document.createElement('canvas');
// 	// Приводим элемент к булеву типу
// 	if (!!(elem.getContext && elem.getContext('2d'))) {
// 		// Создаем изображение в формате webp, возвращаем индекс искомого элемента и сразу же проверяем его
// 		return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
// 	}
// 	// Иначе Webp не используем
// 	return false;
// }
//
// window.onload = function () {
// 	// Получаем все элементы с дата-атрибутом data-bg
// 	let images = document.querySelectorAll('[data-bg]');
// 	// Проходимся по каждому
// 	for (let i = 0; i < images.length; i++) {
// 		// Получаем значение каждого дата-атрибута
// 		let image = images[i].getAttribute('data-bg');
// 		// Каждому найденному элементу задаем свойство background-image с изображение формата jpg
// 		images[i].style.backgroundImage = 'url(' + image + ')';
// 	}
//
// 	// Проверяем, является ли браузер посетителя сайта Firefox и получаем его версию
// 	let isitFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
// 	let firefoxVer = isitFirefox ? parseInt(isitFirefox[1]) : 0;
//
// 	// Если есть поддержка Webp или браузер Firefox версии больше или равно 65
// 	if (canUseWebp() || firefoxVer >= 65) {
// 		// Делаем все то же самое что и для jpg, но уже для изображений формата Webp
// 		let imagesWebp = document.querySelectorAll('[data-bg-webp]');
// 		for (let i = 0; i < imagesWebp.length; i++) {
// 			let imageWebp = imagesWebp[i].getAttribute('data-bg-webp');
// 			imagesWebp[i].style.backgroundImage = 'url(' + imageWebp + ')';
// 		}
// 	}
// };