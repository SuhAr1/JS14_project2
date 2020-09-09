'use strict';
window.addEventListener('DOMContentLoaded', () => {

	// Timer
	function countTimer(deadline) {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		function getTimerRemaining() {
			const dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);
			return { timeRemaining, hours, minutes, seconds };
		}

		function updateClock() {
			const timer = getTimerRemaining();
			if (timer.timeRemaining > 0) {
				timerHours.textContent = ((timer.hours < 10) ? '0' + timer.hours : timer.hours);
				timerMinutes.textContent = ((timer.minutes < 10) ? '0' + timer.minutes : timer.minutes);
				timerSeconds.textContent = ((timer.seconds < 10) ? '0' + timer.seconds : timer.seconds);
			} else {
				clearInterval(updateClock);
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
			}
		}
		setInterval(updateClock, 1000);
		updateClock();
	}

	countTimer('11 september 2020');

	// Меню
	const toggleMenu = () => {

		// const btnMenu = document.querySelector('.menu');
		const menu = document.querySelector('menu');
		// const closeBtn = document.querySelector('.close-btn');
		// const menuItems = menu.querySelectorAll('ul>li');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		const wrapParent = document.body;
		wrapParent.addEventListener('click', event => {
			const target = event.target;
			if (target.closest('.menu')) {
				handlerMenu();
			}
			if (target.closest('.close-btn')) {
				handlerMenu();
			}
			if (target.closest('ul>li')) {
				handlerMenu();
			}
		});

	};

	toggleMenu();

	// popup
	const togglePopUp = () => {
		const popUp = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupContent = document.querySelector('.popup-content');


		// animation

		const modalAnimation = () => {
			let count = 0;
			popupContent.style.top = 0;
			function newAnimation() {
				popupContent.style.top = count + `%`;
				count++;
				if (count <= 38) {
					requestAnimationFrame(newAnimation);
				}
			}
			newAnimation();
		};

		popupBtn.forEach(elem => {
			elem.addEventListener('click', () => {
				popUp.style.display = 'block';
				if (window.screen.availWidth > 768) modalAnimation();
			});
		});

		popUp.addEventListener('click', event => {
			let target = event.target;

			if (target.classList.contains('popup-close')) {
				popUp.style.display = 'none';
			} else {
				target = target.closest('.popup-content');
				console.log(target);
				if (!target) {
					popUp.style.display = 'none';
				}
			}
		});
	};

	togglePopUp();


	// tabs
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};

		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');	// Проверяет селектор, а если не находит выводит null

			console.log(target);

			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}
		});
	};

	tabs();

});
