import p5 from 'p5';
import {Cell} from './Cell.js';
import {AutoCell} from './AutoCell.js';


const s = ( sketch  ) => {

  let x = 100;
  let y = 100;

  let cols = 50;
  let rows = 50;

  let myCell = new Cell(100, 100, 20, 20);
    
  sketch.setup = () => {  
    sketch.createCanvas(500, 500);
    for (let i = 0; i < cols; i++) {
      window.tissue[i] = [];

      for (let j = 0; j < rows; j++) {

        if( i == 5 && j == 5) {
          window.tissue[i][j] = new AutoCell(i*10, j*10, 10, 10, i, j)
        }
        else {
          window.tissue[i][j] = new Cell(i*10, j*10, 10, 10, i, j);
        }
      }      
    }
  };

  sketch.draw = () => {
    sketch.background(0);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let cell = window.tissue[i][j];

        sketch.rect(cell.x, cell.y, cell.width, cell.height);
        sketch.fill(cell.stateColor());

        cell.membranePotential();
        cell.calculateAlpha();
        cell.calculateCharge();

      }      
    }

  };
};

window.tissue = [];
let myp5 = new p5(s, 'chart');
 