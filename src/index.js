import p5 from 'p5';
import {Cell} from './Cell.js';
import {AutoCell} from './AutoCell.js';
import {DeadCell} from './DeadCell.js';
import { transform } from 'lodash';


const s = ( sketch  ) => {

  let x = 100;
  let y = 100;

  let rows = window.global.rows;
  let cols = window.global.cols

  let myCell = new Cell(100, 100, 20, 20);
    
  sketch.setup = () => {  
    sketch.createCanvas(500, 500);
    for (let i = 0; i < cols; i++) {
      tissue[i] = [];

      for (let j = 0; j < rows; j++) {

        if( i == 10  && j == 10) {
          tissue[i][j] = new AutoCell(i*10, j*10, 10, 10, i, j)
        }
        else {
          tissue[i][j] = new Cell(i*10, j*10, 10, 10, i, j);
        }
      }      
    }
  };

  sketch.draw = () => {
    sketch.background(0);

    // console.log('X:',sketch.mouseX, ' Y:',sketch.mouseY);
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let cell = tissue[i][j];

        cell.membranePotential();
        cell.calculateAlpha();
        cell.calculateCharge();

        sketch.rect(cell.x, cell.y, cell.width, cell.height);
        sketch.fill(cell.stateColor());

        //MEASURE 
        if( i == 48 && j == 48) {
          console.log(cell.alpha, cell.state, cell.Vm, cell.charge)
        }
      }      
    }

  };

  sketch.mouseClicked = () => {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let cell = tissue[i][j];
        if (cell.isInSide(sketch.mouseX, sketch.mouseY)) 
        {
          tissue[i][j] = new DeadCell(i*10, j*10, 10, 10, i, j);
        }
      }      
    }

  }

};

window.global = {
  tissue: [],
  rows: 50,
  cols: 50
};

let tissue = window.global.tissue;
let myp5 = new p5(s, 'chart');
 