import p5 from 'p5';
import  s from './sketch/sketch.js'

window.global = {
  tissue: [],
  AltCellBtn: 'Auto',
  play: false,
  stop: false,
  cell_size: 15
}; 

window.global.rows = calculateRows();
window.global.cols = calculateCols();

let myp5 = new p5(s, 'chart');

function calculateRows() { //height
  let cell_to_be_removed; 

  if(mobile()) cell_to_be_removed = 8;
  else cell_to_be_removed = 10;
  
  return Math.floor(window.innerHeight / window.global.cell_size) - cell_to_be_removed;
}

function calculateCols(){ //width
  if(mobile())
  {
    return Math.floor(window.innerWidth / window.global.cell_size) +1 ;
  }
    else return Math.floor(window.innerWidth / window.global.cell_size) -1;
}

function mobile() {
  if (/Mobi|Android/i.test(navigator.userAgent)) return true; 
}

