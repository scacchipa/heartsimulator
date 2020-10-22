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

    this.create_grid_cell();

    this.cycle = 0;
    this.lapseQueues = {}
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
  setCheckPoints(name, x1, y1, x2, y2) {
    this.lapseQueues[name] = [];
    this.tissue[x1][y1].onOpening = function () {
      let lapse = new Lapse(name);
      lapse.initialTime = window.global.tissue.cycle;
      window.global.tissue.lapseQueues[name].push(lapse);
    }
    this.tissue[x2][y2].onOpening = function() {
      let lapse = window.global.tissue.lapseQueues[name].find(element => !(element.endingTime));
      lapse.endingTime = window.global.tissue.cycle;
      lapse.print();
    }
  }
  getCell(x, y) {
    return this.tissue[x][y];
  }

  setCell(x, y, cell) {
    cell.onOpening = this.tissue[x][y].onOpening; // copy the timer function

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

export class Lapse {
  constructor(name) {
    this.name = name;
  }
  setInitialTime(cycle) {
    this.initialTime = cycle;
  }
  setEndingTime(cycle) {
    this.endingTime = cycle;
  }
  getDuration() {
    return this.endingTime - this.initialTime;
  }
  print() {
    console.log(this.name, " Start",this.initialTime, " End:",this.endingTime, " Duration:",this.getDuration());
  }
}