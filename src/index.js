import p5 from 'p5';
import {Cell} from './Cell.js';
import { AutoCell, DeadCell } from './AltCell.js';

const s = ( sketch  ) => {

  let rows = window.global.rows;
  let cols = window.global.cols;

  sketch.setup = () => {  
    sketch.createCanvas(850, 850);

    for (let i = 0; i < cols; i++) {
      tissue[i] = [];

      for (let j = 0; j < rows; j++) {

        if( i == 10  && j == 10) {
          tissue[i][j] = new AutoCell(i*17, j*17, 17, 17, i, j)
        }
        else {
          tissue[i][j] = new Cell(i*17, j*17, 17, 17, i, j);
        }
      }      
    }
  };

  sketch.draw = () => {
    sketch.background(0);
    let play = window.global.play;

    // console.log('X:',sketch.mouseX, ' Y:',sketch.mouseY);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let cell = tissue[i][j];
          
          if (play == true) {
            cell.membranePotential();
            cell.calculateAlpha();
            cell.calculateCharge();
  
          }
  
          sketch.rect(cell.x, cell.y, cell.width, cell.height);
          sketch.fill(cell.stateColor());
  
          //MEASURE 
          // if( i == 48 && j == 48) {
          //   console.log(cell.alpha, cell.state, cell.Vm, cell.charge)
          // }
        }      
      }
    


  };

  sketch.mouseClicked = () => {
    let AltCellBtn = window.global.AltCellBtn;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let cell = tissue[i][j];
        if (cell.isInSide(sketch.mouseX, sketch.mouseY)) 
        { 
          switch (AltCellBtn) {
            case 'Dead':
              tissue[i][j] = new DeadCell(i*17, j*17, 17, 17, i, j);
              break;
            case 'Auto':
              tissue[i][j] = new AutoCell(i*17, j*17, 17, 17, i, j);
              break;
            default: 
              console.log('click')
          }
        }
      }      
    }

  }

};

window.global = {
  tissue: [],
  rows: 50,
  cols: 50,
  AltCellBtn: 'Dead',
  play: true
};

let tissue = window.global.tissue;
let myp5 = new p5(s, 'chart');
 
