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

	countTimer('16 september 2020');

	// Menu
	const toggleMenu = () => {

		// const btnMenu = document.querySelector('.menu');
		const menu = document.querySelector('menu');
		// const closeBtn = document.querySelector('.close-btn');
		// const menuItems = menu.querySelectorAll('ul>li');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		document.body.addEventListener('click', event => {
			const target = event.target;
			if (target.closest('.menu')) {
				handlerMenu();
			}
			if (target.closest('.close-btn')) {
				handlerMenu();
			}
			if (target.closest('menu>ul>li')) {
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

	// slider

	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item');

		const newDot = () => {
			const ulDots = document.querySelector('.portfolio-dots');
			for (let i = 0; i < slide.length; i++) {
				ulDots.insertAdjacentHTML('beforeend', '<li class="dot"></li>');
				if (i === 0) {
					document.querySelector('.dot').classList.add('dot-active');
				}
			}
		};

		newDot();

		const btn = document.querySelectorAll('.portfolio-btn'),
			dot = document.querySelectorAll('.dot'),
			slider = document.querySelector('.portfolio-content');

		let currentSlide = 0,
			interval;

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};

		const startSlide = (time = 2000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', event => {
			event.preventDefault();

			const target = event.target;
			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem === target) {
						currentSlide = index;
					}
				});
			}
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}

			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});

		slider.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn') ||
			event.target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn') ||
			event.target.matches('.dot')) {
				startSlide();
			}
		});

		startSlide(3000);

	};

	slider();

	// change image

	const changeImageTeam = () => {
		const imageTeam = document.querySelectorAll('.command__photo');
		imageTeam.forEach(item => {
			item.addEventListener('mouseenter', () => {
				item.dataset.oneImg = item.src;
				item.src = item.dataset.img;
			});
			item.addEventListener('mouseout', () => {
				item.dataset.twoImg = item.src;
				item.src = item.dataset.oneImg;
			});
		});
	};

	changeImageTeam();

	// validation

	const inputCostValidate = () => {
		document.querySelector(`.calc-block`).querySelectorAll(`input`).forEach(item => {
			item.addEventListener('input', () => {
				item.value = item.value.replace(/\D/, "");
			});
		});
	};

	inputCostValidate();

	// calculator

	const calc = (price = 100) => {

		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			calcCount = document.querySelector('.calc-count'),
			totalValue = document.getElementById('total');

		const countSum = () => {
			let total = 0,
				countValue = 1,
				dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSquare.value;

			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}

			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10) {
				dayValue *= 1.5;
			}


			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;
			} else {
				total = 0;
			}



			totalValue.textContent = total;
		};

		calcBlock.addEventListener('change', event => {
			const target = event.target;
			// if (target.matches('.calc-type') || target.matches('.calc-square') ||
			// target.matches('.calc-day') || target.matches('.calc-count')) {
			// 	console.log(1);
			// }

			// if (target.matches('select') || target.matches('input')) {
			// 	console.log(1);
			// }

			if (target === calcType || target === calcSquare ||
				target === calcDay || target === calcCount) {
				countSum();
			}


		});
	};

	calc(100);


	// send-ajax-form

	const sendForm = () => {
		// написали сообщения
		const errorMessage = 'Что то пошло не так...',
			loadMessage = 'Загрузка...',
			successMessage = 'Спасибо! Мы скоро с вами свяжемся';

		// получили нашу форму
		const form = document.getElementById('form1');

		// создали элемент, который будем добавлять на страницу
		const statusMessage = document.createElement('div');
		// добавили элементу стили
		statusMessage.style.cssText = 'font-size: 2rem;';

		// прописали обработчик события submit
		form.addEventListener('submit', event => {
			// отменили стандартное поведение браузера (чтобы не перезагружалась)
			event.preventDefault();
			// добавили элемент который создали - ('div') на страницу (пока в нем нет никакого сообщения)
			form.appendChild(statusMessage);
			statusMessage.textContent = loadMessage;
			// создали объект форм дата, который считывает все данные с нашей формы(все что имеет атрибут name)
			// и сохраняет в объекте FormData
			const formData = new FormData(form);
			const body = {};
			// for (const val of formData.entries()) {
			// 	body[val[0]] = val[1];
			// }
			// получаем все данные одним из способов из нашего объекта FormData
			// записываем в переменную body (был пустой объект)
			formData.forEach((val, key) => {
				body[key] = val;
			});
			postData(body, () => {
				// пишем сообщение пользователю, что все отлично
				statusMessage.textContent = successMessage;
			}, error => {
				// если ошибка выводим, что что то не так
				statusMessage.textContent = errorMessage;
				console.error(error);
			});
		});

		const postData = (body, outputData, errorData) => {
			// создали объект request
			const request = new XMLHttpRequest();
			// повесили прослушку события "readystatechange" (возникает когда меняется статус readyState)
			// после того как 1 раз любое событие (из 0 в 1) срабатывает readystatechange и
			// добавляется сообщение (loadMessage)
			request.addEventListener('readystatechange', () => {
				// проверяем статус на = 4 (если он еще не 4 то просто выходим)
				if (request.readyState !== 4) {
					return;
				}
				//  проверяем статус на 200
				if (request.status === 200) {
					outputData();
				} else {
					errorData(request.status);
				}

			});
			// настроили сам запрос (метод и файл php)
			request.open('POST', './server.php');
			// добавили заголовки в json или в form-data
			request.setRequestHeader('Content-Type', 'application/json'); // 'multipart/form-data'
			// в зависимости от требования сервера переводим в json строку или formData
			request.send(JSON.stringify(body)); // request.send(formData)
		};


	};

	sendForm();

});


