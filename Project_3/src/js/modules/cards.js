import { getResourses } from "../services/services";

function cards() {
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

}

export default cards;