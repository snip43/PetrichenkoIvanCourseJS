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
})

//---------------------------------

// ------------- Timer -----------

const targetDate = new Date('2020,6,5');

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
	if (num >=0 && num < 10) {
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

		if(t.targetDate <= 0) {
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

const banner = setTimeout( openModal, 10000);

function showModalByScroll() {
	if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight ) {
		openModal();
		window.removeEventListener('scroll', showModalByScroll);
	}
}

window.addEventListener('scroll', showModalByScroll);

//--------------------------------------------------------------

//-----------------Card Item ----------------------------------

class CardItem {
	constructor(caption, subtitle, descr, price) {
		this.caption = caption;
		this.subtitle = subtitle;
		this.descr = descr;
		this.price = price;
	}

	createCard() {
		const card = document.querySelector('[data-card_1]'),
					cardCaption = card.querySelector('img'),
					cardSubtitle = card.querySelector('.menu__item-subtitle'),
					cardDescr = card.querySelector('.menu__item-descr'),
					cardPrice = card.querySelector('.menu__item-total span');

		cardCaption.src = this.caption;
		cardSubtitle.innerHTML = this.subtitle;
		cardDescr.innerHTML = this.descr;
		cardPrice.innerHTML = this.price;
	}
}




const cardItem_1 = new CardItem(
	'img/tabs/vegy.jpg',
	'Меню "Фитнес"',
	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 229);
cardItem_1.createCard();


