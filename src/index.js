import p5 from 'p5';
import {Cell} from './Cell.js';
import { AutoCell, DeadCell, FastCell } from './AltCell.js';

class Tissue {
  constructor(xSize, ySize) {

    let boxSize = window.global.size;
    this.xSize = xSize;
    this.ySize = ySize;
    this.tissue = [];

    for (let i = 0; i < this.xSize; i++) {
      this.tissue[i] = [];
  
      for (let j = 0; j < this.ySize; j++) {
        if( i == 10  && j == 10) {
          this.tissue[i][j] = new Cell(i*boxSize, j*boxSize, boxSize, i, j);
        }
        else {
          this.tissue[i][j] = new Cell(i*boxSize, j*boxSize, boxSize, i, j);
        }
      }
    }
  }
  getCell(x, y) {
    return this.tissue[x][y];
  }
  setCell(x, y, cell) {
    this.tissue[x][y] = cell;
  }
  forAll(func) {
    for (let x = 0; x < this.xSize; x++) 
      for(let y = 0; y < this.ySize; y++) {
        console.log(x,"-", y);
        func.call(this.tissue[x][y]);
    }
  }
}

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

   function paint(cell) {
    sketch.rect(cell.x, cell.y, cell.width, cell.height);
    sketch.fill(cell.stateColor());
  }

  sketch.setup = () => {  
    let cvn_height = (size * (cols - 2));
    let cvn_width = (size * (rows-2));

    sketch.createCanvas(cvn_height, cvn_width);

    window.global.tissue = new Tissue(cols, rows);
  };

  sketch.draw = () => {
    sketch.background(0);

    //Shifts canvas to remove 2top rows and col.
    sketch.translate((size * -1), (size * -2))

    let play = window.global.play;
    let AltCellBtn = window.global.AltCellBtn;
    
    if (play == true) {
      window.global.tissue.forAll( function() { this.membranePotential() } );
      window.global.tissue.forAll( function() { this.calculateAlpha() } );
      window.global.tissue.forAll( function() { this.calculateCharge() } );
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let cell = window.global.tissue.getCell(i, j);
        
        paint(cell);
        if (cell.isInSide(sketch.mouseX, sketch.mouseY)) {
            console.log(i,", ", j, ": ", cell.Vm);
        }
        if (sketch.mouseIsPressed && cell.isInSide(sketch.mouseX, sketch.mouseY)) 
        { 
          switch (AltCellBtn) {
            case 'Dead':
              window.global.tissue.setCell(i, j, new DeadCell(i*size, j*size, size, i, j));
              break;
            case 'Auto':
              window.global.tissue.setCell(i, j, new AutoCell(i*size, j*size, size, i, j));
              break;
            case 'Fast':
              window.global.tissue.setCell(i, j, new FastCell(i*size, j*size, size, i, j));
              break;
          }
        }
      }      
    }
  };
};

let tissue = window.global.tissue;
let myp5 = new p5(s, 'chart');
 
