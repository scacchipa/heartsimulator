import {Cell} from './Cell.js';

export class Tissue {
    constructor(xSize, ySize) {
  
      this.xSize = xSize;
      this.ySize = ySize;
      this.tissue = [];

      this.create_grid_cell()
    }

    create_grid_cell() {
      let boxSize = window.global.size;
      
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
      console.log(cell)
      this.tissue[x][y] = cell;
    }

    forAll(func) {
      for (let x = 0; x < this.xSize; x++) 
        for(let y = 0; y < this.ySize; y++) {
          func.call(this.tissue[x][y]);
        }
    }
  }