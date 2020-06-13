import 'core-js';

import timer from './modules/timer';
import tabs from './modules/tabs';
import modal from './modules/modal';
import {openModal} from './modules/modal'
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calculator from './modules/calculator';


document.addEventListener('DOMContentLoaded', () => {

const banner = setTimeout(() => openModal('.modal', banner), 100000);
// --------Tabs --------------------
tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
// ------------- Timer -----------
timer('.timer', '2020-06-18');
//------------------------ Modal window -----------------------
modal('[data-modal]', '.modal', banner);
//-----------------Card Item ----------------------------------
cards();
//-------------------------SERVER(FORMS) -----------------
forms('form', banner)
//--------------------- SLIDER ------------------------------
slider({
	sliderOffer: '.offer__slider',
	slidesOffers: '.offer__slide',
	prevOffer: '.offer__slider-prev',
	nextOffer: '.offer__slider-next',
	currentOffer: '#current',
	slidesWrapperOffer: '.offer__slider-wrapper',
	slidesFieldOffer: '.offer__slider-inner',
	totalOffer:'#total'
});
//----------------------- Calculator ------------------------------
calculator();


})
