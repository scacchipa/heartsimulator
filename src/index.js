import p5 from 'p5';
import {Cell} from './Cell.js';
import { AutoCell, DeadCell, FastCell } from './AltCell.js';

window.global = {
  tissue: [],
  rows: 37,
  cols: 60,
  size: 22,
  AltCellBtn: 'Dead',
  play: true
};

const s = ( sketch ) => {

  let rows = window.global.rows;
  let cols = window.global.cols;
  let size = window.global.size;

  function create_grid_cell() {

    for (let i = 0; i < cols; i++) {
      tissue[i] = [];

      for (let j = 0; j < rows; j++) {

        if( i == 10  && j == 10) {
          // tissue[i][j] = new AutoCell(i*size, j*size, size, i, j)
          tissue[i][j] = new Cell(i*size, j*size, size, i, j);
        }
        else {
          tissue[i][j] = new Cell(i*size, j*size, size, i, j);
        }
      }      
    }
  }

  function paint(cell) {
    sketch.rect(cell.x, cell.y, cell.width, cell.height);
    sketch.fill(cell.stateColor());
  }

  // function for_tissue(){
  //   for (let i = 0; i < cols; i++) {
  //     for (let j = 0; j < rows; j++) {
  //       let cell = tissue[i][j];

  //       cell.membranePotential();
  //       cell.calculateAlpha();
  //       cell.calculateCharge();
  //       paint(cell);

  //     }      
  //   }
  // }
  sketch.setup = () => {  
    let cvn_height = (size * (cols - 2));
    let cvn_width = (size * (rows-2));

    sketch.createCanvas(cvn_height, cvn_width);

    create_grid_cell();
  };

  sketch.draw = () => {
    sketch.background(0);

    //Shifts canvas to remove 2top rows and col.
    sketch.translate((size * -1), (size * -2))

    let play = window.global.play;
    let AltCellBtn = window.global.AltCellBtn;
          
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let cell = tissue[i][j];
        
        if (play == true) {
          cell.membranePotential();
          cell.calculateAlpha();
          cell.calculateCharge();
        }
        
        paint(cell);
        
        if (sketch.mouseIsPressed && cell.isInSide(sketch.mouseX, sketch.mouseY)) 
        { 
          switch (AltCellBtn) {
            case 'Dead':
              tissue[i][j] = new DeadCell(i*size, j*size, size, i, j);
              break;
            case 'Auto':
              tissue[i][j] = new AutoCell(i*size, j*size, size, i, j);
              break;
            case 'Fast':
              tissue[i][j] = new FastCell(i*size, j*size, size, i, j);
              break;
          }
        }
        // MEASURE 
        // if( i == 12 && j == 16) {
        //   console.log(cell.alpha, cell.state, cell.Vm, cell.charge)
        // }
      }      
    }
  };
};

let tissue = window.global.tissue;
let myp5 = new p5(s, 'chart');
 
