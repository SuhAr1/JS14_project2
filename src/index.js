'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImageTeam from './modules/changeImageTeam';
import inputCostValidate from './modules/inputCostValidate';
import calc from './modules/calc';
import sendForm from './modules/sendForm'

// Timer
countTimer('17 september 2020');

// Menu
toggleMenu();

// popup
togglePopUp();

// tabs
tabs();

// slider
slider();

// change image
changeImageTeam();

// validation
inputCostValidate();

// calculator
calc(100);

// send-ajax-form
sendForm();