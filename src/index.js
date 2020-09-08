import p5 from 'p5';
import s  from './sketch/sketch.js'


window.global = {
  tissue: [],
  AltCellBtn: 'Auto',
  play: false,
  stop: false
}; 

window.global.rows = calculateRows();
window.global.cols = calculateCols();
let myp5 = new p5(s, 'chart');

function mobile() {
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    window.global.size = 15;
    return true; 
  }   
  else window.global.size = 15;
}

function calculateRows() {
  if(mobile()) 
  { 
    return Math.floor(window.innerHeight / window.global.size) - 8;
  }
  else return 50;
}

function calculateCols(){
  if(mobile())
  {
    return Math.floor(window.innerWidth / window.global.size) +1 ;
  }
  else return 70;
}


