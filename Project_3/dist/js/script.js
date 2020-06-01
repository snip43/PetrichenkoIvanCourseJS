/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

document.addEventListener('DOMContentLoaded', () => {
  // --------Tabs --------------------
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        parentTabs = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabsContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabsContent();
  parentTabs.addEventListener('click', e => {
    const target = e.target;
    tabs.forEach((item, i) => {
      if (target == item && !target.classList.contains('tabheader__item_active')) {
        hideTabContent();
        showTabsContent(i);
      }
    });
  }); //---------------------------------
  // ------------- Timer -----------

  const targetDate = new Date('2020,6,5');

  function createDiffDate(endtime) {
    const timerDate = Date.parse(endtime) - new Date();
    const leftDays = Math.floor(timerDate / (1000 * 60 * 60 * 24));
    const leftHours = Math.floor(timerDate / (1000 * 60 * 60) % 24);
    const leftMinutes = Math.floor(timerDate / 1000 / 60 % 60);
    const leftSeconds = Math.floor(timerDate / 1000 % 60);
    return {
      targetDate,
      leftDays,
      leftHours,
      leftMinutes,
      leftSeconds
    };
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

  insertTimerBlock('.timer', targetDate); //--------------------------------------------------------------
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

  btnConnectMe.forEach(item => {
    item.addEventListener('click', openModal);
  });
  modalW.addEventListener('click', e => {
    if (e.target.classList.contains('show') || e.target.classList.contains('modal__close')) {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  }); // const banner = setTimeout( openModal, 10000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll); //--------------------------------------------------------------
  //-----------------Card Item ----------------------------------

  class CardItem {
    constructor(caption, alt, subtitle, descr, price, courseChange, parentSelector, ...classes) {
      this.caption = caption;
      this.alt = alt;
      this.subtitle = subtitle;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.courseChange = courseChange;
      this.parent = document.querySelector(parentSelector);
    }

    changeToRub() {
      this.price = this.price * this.courseChange;
    }

    createCard() {
      this.changeToRub();
      const cardDiv = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        cardDiv.classList.add(this.element);
      } else {
        this.classes.forEach(className => cardDiv.classList.add(className));
      }

      cardDiv.innerHTML = `
				<img src="${this.caption}" alt="${this.alt}">
				<h3 class="menu__item-subtitle">${this.subtitle}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total">
								<span>${this.price}</span> руб/день
						</div>
				</div>`;
      this.parent.append(cardDiv);
    }

  }

  const cardItem_1 = new CardItem('img/tabs/vegy.jpg', 'vegy', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 15, 70, '.menu .container');
  cardItem_1.createCard();
  const cardItem_2 = new CardItem('img/tabs/elite.jpg', 'elite', 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 20, 70, '.menu .container');
  cardItem_2.createCard();
  const cardItem_3 = new CardItem('img/tabs/post.jpg', 'post', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 10, 70, '.menu .container');
  cardItem_3.createCard();
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map