function calculator(){
	const result = document.querySelector('.calculating__result span');
			
	let sex,
		height,
		weight,
		age,
		ratio;

	function initialSex() {
		if(localStorage.getItem('sex')) {
			sex = localStorage.getItem('sex')
			} else {
				sex = 'female';
				localStorage.setItem('sex', 'female');
		}
	}
	function initialRatio() {
		if(localStorage.getItem('ratio')) {
			let rat = localStorage.getItem('ratio');
			switch (rat) {
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
			} else {
				ratio = 1.375;
				localStorage.setItem('ratio', 'small');
		}
	}

	initialSex();
	initialRatio()

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

		removeElem(gender,'calculating__choose-item_active');

		gender.forEach(item => {

			if(item.getAttribute('id') === localStorage.getItem('sex')) {
				item.classList.add('calculating__choose-item_active')
			} 

			item.addEventListener('click', (e) => {
				removeElem(gender,'calculating__choose-item_active');
				if (e.target.getAttribute('id') === 'female') {
					sex = 'female';
					localStorage.setItem('sex', 'female')
				} else {
					sex = 'male';
					localStorage.setItem('sex', 'male');
				}
				e.target.classList.add('calculating__choose-item_active');
				calc();
			});
		})
	}

	function activityInfo() {
		const elements = document.querySelectorAll('.calculating__choose_big .calculating__choose-item');

		removeElem(elements,'calculating__choose-item_active');

		elements.forEach(item => {

			if(item.getAttribute('id') === localStorage.getItem('ratio')) {
				item.classList.add('calculating__choose-item_active');
			}

			item.addEventListener('click', (e) => {
			removeElem(elements,'calculating__choose-item_active');

			switch (e.target.getAttribute('id')) {
					case 'low':
						ratio = 1.2;
						localStorage.setItem('ratio', 'low');
						break;
					case 'small':
						ratio = 1.375;
						localStorage.setItem('ratio', 'small');
						break;
					case 'medium':
						ratio = 1.55;
						localStorage.setItem('ratio', 'medium');
						break;
					case 'high':
						ratio = 1.725;
						localStorage.setItem('ratio', 'high');
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

}

export default calculator;