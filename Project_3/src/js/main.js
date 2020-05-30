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

	const timerBlock = document.querySelector(selector)
	const timerBlockDays = timerBlock.querySelector('#days');
	const timerBlockHours = timerBlock.querySelector('#hours');
	const timerBlockMinutes = timerBlock.querySelector('#minutes');
	const timerBlockSeconds = timerBlock.querySelector('#seconds');
	const timeInterval = setInterval(updateClock, 1000);

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

