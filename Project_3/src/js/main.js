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
tabs();

// ------------- Timer -----------
timer();

//------------------------ Modal window -----------------------
modal('[data-modal]', '.modal', banner);

//-----------------Card Item ----------------------------------

cards(banner);

//-------------------------SERVER(FORMS) -----------------
forms()
//--------------------- SLIDER ------------------------------
slider();

//----------------------- Calculator ------------------------------
calculator();


})
