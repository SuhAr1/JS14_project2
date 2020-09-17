'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

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
countTimer('18 september 2020');

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