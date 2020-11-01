import { Cell } from './Cell.js';

export class Tissue {
  constructor(xSize, ySize) {
    this.xSize = xSize;
    this.ySize = ySize;
    this.tissue = [];

    this.Ko = 4;
    this.Ki = 120;
    this.No = 145;
    this.Ni = 15;

    this.create_grid_cell()
  }

  create_grid_cell() {
    let boxSize = window.global.size;

    for (let i = 0; i < this.xSize; i++) {
      this.tissue[i] = [];
      for (let j = 0; j < this.ySize; j++) {

        let cell = new Cell(i * boxSize, j * boxSize, boxSize, i, j);
        this.tissue[i][j] = cell;
      }
    }
  }

  getCell(x, y) {
    return this.tissue[x][y];
  }

  setCell(x, y, cell) {
    this.tissue[x][y] = cell;

    cell.refreshCellReference();
    cell.refreshNearReference();
  }

  refreshAllReference() {
    this.forAll(function () {
      this.refreshCellReference();
    });
  }

  forAll(func) {
    this.tissue.forEach(row => row.forEach(cell => func.call(cell)));
  }
}