import 'core-js';


document.addEventListener('DOMContentLoaded', () => {


	// --------Tabs --------------------

	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		parentTabs = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		})

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		})
	}

	function showTabsContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabsContent();

	parentTabs.addEventListener('click', (e) => {

		const target = e.target;

		tabs.forEach((item, i) => {
			if (target == item && !target.classList.contains('tabheader__item_active')) {
				hideTabContent();
				showTabsContent(i);
			}
		})
	})

	//---------------------------------

	// ------------- Timer -----------

	const targetDate = new Date('2020,6,22');

	function createDiffDate(endtime) {

		const timerDate = Date.parse(endtime) - new Date();

		const leftDays = Math.floor(timerDate / (1000 * 60 * 60 * 24));
		const leftHours = Math.floor(timerDate / (1000 * 60 * 60) % 24);
		const leftMinutes = Math.floor((timerDate / 1000 / 60) % 60);
		const leftSeconds = Math.floor((timerDate / 1000) % 60);

		return {
			targetDate,
			leftDays,
			leftHours,
			leftMinutes,
			leftSeconds
		}
	}

	function addZero(num) {
		if (num >= 0 && num < 10) {
			num = `0${num}`;
			return num;
		} else {
			return num;
		}
	}

	function insertTimerBlock(selector, endtime) {

		const timerBlock = document.querySelector(selector),

			timerBlockDays = timerBlock.querySelector('#days'),
			timerBlockHours = timerBlock.querySelector('#hours'),
			timerBlockMinutes = timerBlock.querySelector('#minutes'),
			timerBlockSeconds = timerBlock.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = createDiffDate(endtime);

			timerBlockDays.innerHTML = addZero(t.leftDays);
			timerBlockHours.innerHTML = addZero(t.leftHours);
			timerBlockMinutes.innerHTML = addZero(t.leftMinutes);
			timerBlockSeconds.innerHTML = addZero(t.leftSeconds);

			if (t.targetDate <= 0) {
				clearInterval(timeInterval);
			}
		}

	}

	insertTimerBlock('.timer', targetDate)

	//--------------------------------------------------------------

	//------------------------ Modal window -----------------------

	const btnConnectMe = document.querySelectorAll('[data-modal]'),
		modalW = document.querySelector('.modal');

	function openModal() {
		modalW.classList.toggle('show');
		document.body.classList.add('overFix');
		clearInterval(banner);
	}

	function closeModal() {
		modalW.classList.toggle('show');
		document.body.classList.remove('overFix');
	}


	btnConnectMe.forEach((item) => {
		item.addEventListener('click', openModal)
	})

	modalW.addEventListener('click', (e) => {
		if (e.target.classList.contains('show') || e.target.classList.contains('modal__close')) {
			closeModal();
		}
	})

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape') {
			closeModal();
		}
	})

	const banner = setTimeout(openModal, 100000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

	//--------------------------------------------------------------

	//-----------------Card Item ----------------------------------

	class CardItem {
		constructor(caption, alt, subtitle, descr, price, parentSelector, ...classes) {
			this.caption = caption;
			this.alt = alt;
			this.subtitle = subtitle;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.courseChange = 71;
			this.parent = document.querySelector(parentSelector)
		}

		changeToRub() {
			this.price = this.price * this.courseChange;
		}

		createCard() {
			this.changeToRub();
			const element = document.createElement('div');

			if (this.classes.length === 0) {
				this.classes = "menu__item";
				element.classList.add(this.classes);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
					<img src=${this.caption} alt=${this.alt}>
					<h3 class="menu__item-subtitle">${this.subtitle}</h3>
					<div class="menu__item-descr">${this.descr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
							<div class="menu__item-cost">Цена:</div>
							<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
					</div>
			`;
			this.parent.append(element);
		}
	}

	axios.get('http://localhost:3000/menu')
		.then(data => {
			data.data.forEach(({ img, altimg, title, descr, price }) => {
				new CardItem(img, altimg, title, descr, price, '.menu .container').createCard();
			});
		});




	//--------------------------------------------------

	//-------------------------SERVER(FORMS) -----------------

	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});
		return await res.json();
	}



	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
						display: block;
						margin: 0 auto;
				`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()))

			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				})
				.catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});
		});
	}


	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog')

		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
			<div class="modal__title">${message}</div>
			<div class="modal__close" data-close>&times;</div>
		</div>
	`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000)
	}

	//--------------------- SLIDER ------------------------------
	let offset = 0;
	let slideIndex = 1;

	const slides = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		width = window.getComputedStyle(slidesWrapper).width,
		slidesField = document.querySelector('.offer__slider-inner');

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
		dots = [];
	indicators.classList.add('carousel-indicators');
	indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; // Если хотите - добавьте в стили, но иногда у нас нет доступа к стилям
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	function numberOfString(str) {
		return +str.replace(/\D/g, '')
	}

	next.addEventListener('click', () => {
		if (offset == numberOfString(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += numberOfString(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;



		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = ".5");
		dots[slideIndex - 1].style.opacity = 1;
	});



	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = numberOfString(width) * (slides.length - 1);
		} else {
			offset -= numberOfString(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = ".5");
		dots[slideIndex - 1].style.opacity = 1;
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = numberOfString(width) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			if (slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}

			dots.forEach(dot => dot.style.opacity = ".5");
			dots[slideIndex - 1].style.opacity = 1;
		});
	});

	//----------------------- Calculator ------------------------------

	const result = document.querySelector('.calculating__result span');
			
	let sex = 'female',
		height,
		weight,
		age,
		ratio = 1.375;

	function calc() {
		height = +document.querySelector('#height').value,
			weight = +document.querySelector('#weight').value,
			age = +document.querySelector('#age').value;

		if (!sex || !height || !age || !weight || !ratio) {
			result.innerHTML = '___';
			return;
		}

		if (sex === 'female') {
			result.innerHTML = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio);
		} else {
			result.innerHTML = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio);
		}

	}

	function removeElem (arr,activeClass) {
		arr.forEach( elem => {
			elem.classList.remove(activeClass);
		})
	}

	function genderInfo() {
		const gender = document.querySelectorAll('[data-sex]');

		gender.forEach(item => {
			item.addEventListener('click', (e) => {
				removeElem(gender,'calculating__choose-item_active');
				if (e.target.getAttribute('id') == 'female') {
					sex = 'female';
				} else {
					sex = 'male';
				}
				e.target.classList.add('calculating__choose-item_active');
				calc();
			});
		})
	}

	function activityInfo() {
		const elements = document.querySelectorAll('.calculating__choose_big .calculating__choose-item');

		elements.forEach(item => {
			item.addEventListener('click', (e) => {
				removeElem(elements,'calculating__choose-item_active');
				
				switch (e.target.getAttribute('id')) {
					case 'low':
						ratio = 1.2;
						break;
					case 'small':
						ratio = 1.375;
						break;
					case 'medium':
						ratio = 1.55;
						break;
					case 'high':
						ratio = 1.725;
						break;
					default:
						ratio = 1.375;
				}
				e.target.classList.add('calculating__choose-item_active');
				calc();
			})
		})
	}

function inputChange() {
	const inputs = document.querySelectorAll('.calculating__choose_medium input');

	inputs.forEach(input => {


		input.addEventListener('input', () => {
			if(input.value.match(/\D/g)) {
				input.style.border = '2px solid red';
			} else {
				input.style.border = 'none';
			}
			calc();
		})
	})
}

function getTotalValue() {
	calc();
	genderInfo();
	activityInfo();
	inputChange();
}

getTotalValue();


});

