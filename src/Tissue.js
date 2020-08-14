import {Cell} from './Cell.js';

export class Tissue {
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
          func.call(this.tissue[x][y]);
        }
    }
  }