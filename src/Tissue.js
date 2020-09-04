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
          let cell = new Cell(i*boxSize, j*boxSize, boxSize, i, j);
          this.tissue[i][j] = cell;
          cell.init();
        }
      }
    }

    getCell(x, y) {
      return this.tissue[x][y];
    }
    
    setCell(x, y, cell) {
      this.tissue[x][y] = cell;
      cell.init();
      this.refreshReference();
    }

    refreshReference() {
      this.forAll( function () {
        let x = this.colPosition;
        let y = this.rowPosition;
        let xSize = this.cols;
        let ySize = this.rows;
        let tissue = this.getTissue();

        if (y > 0) this.upperCell = tissue.getCell(x, y - 1);
        if (y < ySize - 1) this.lowerCell = tissue.getCell(x, y + 1);
        if (x > 0) {
          this.leftCell = tissue.getCell(x - 1, y);
          if (y < ySize - 1) this.lowerLeftCell = tissue.getCell(x - 1, y + 1);
          if (y > 0) this.upperLeftCell = tissue.getCell(x - 1, y - 1);
        }
        if (x < xSize - 1) {
          this.rightCell = tissue.getCell(x + 1, y);
          if (y > 0) this.upperRightCell = tissue.getCell(x + 1, y - 1);
          if (y < ySize - 1) this.lowerRightCell = tissue.getCell(x + 1, y + 1);
        }
      });
    }
    forAll(func) {
      this.tissue.forEach(row => row.forEach(cell => func.call(this.tissue[x][y])));
    }
  }