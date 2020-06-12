function timer() {
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
}

export default timer;