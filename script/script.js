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
				clearInterval(idInterval);
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
			}
		}
		const idInterval = setInterval(updateClock, 1000);
		updateClock();
	}

	countTimer('09 september 2020');

	// Меню
	const toggleMenu = () => {

		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItems = menu.querySelectorAll('ul>li');

		const handlerMenu = () => {

			menu.classList.toggle('active-menu');

			// if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
			// 	menu.style.transform = `translate(0)`;
			// } else {
			// 	menu.style.transform = `translate(-100%)`;
			// }
		};

		btnMenu.addEventListener('click', handlerMenu);
		closeBtn.addEventListener('click', handlerMenu);

		menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
	};

	toggleMenu();

	// popup

	const togglePopUp = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popUpClose = document.querySelector('.popup-close'),
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
				popup.style.display = 'block';
				if (window.screen.availWidth > 768) modalAnimation();
			});
		});

		popUpClose.addEventListener('click', () => {
			popup.style.display = 'none';
		});


	};

	togglePopUp();













});
