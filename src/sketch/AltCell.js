import { Cell } from './Cell';

class AutoCell extends Cell {

  constructor(_x, _y, _s, _colPosition, _rowPosition) {
    super(_x, _y, _s, _colPosition, _rowPosition);
    this.alphaVector = [-55, -53, -50, -43, -35, -27, -17, -7, -1, 5, 7, 8, 8, 8, 7, 6, 4, 1, -2, -6, -10, -14, 
      -19, -24, -29, -34, -38, -42, -46, -50, -54, -57, -60, -62, -64, -65, -65, -64, -63, -62, -61, -60,
      -59, -58, -57, -56, -55, -54, -53, -52, -51, -50,
      -49, -48, -47, -46, -45, -44, -43, -42, -41, -40,
      -39, -38, -37, -36, -35, -34, -33, -32, -31, -30,
      -29, -28, -27, -26, -25, -24, -23, -22, -21, -20,
      -19, -18, -17, -16, -15, -14, -13, -12]
      .map(Vm => (Vm + 10) * 1.3)
      .map(Vm => this.invAlpha(Vm));
  }
  updateState() {
    if (this.state == 'resting' && this.charge > -45) {
      this.state = 'open';
      this.step = 0;
    }
    else if (this.state == 'open' && this.charge > 0) {
      this.state = 'inactive';
    }
    else if (this.state == 'inactive' && this.charge < -45) {
      this.state = 'resting';
    }
  } 
  calculateCharge() {
    if (this.colPosition < 1 || this.colPosition >= (this.cols - 1) || this.rowPosition < 1 || this.rowPosition >= (this.rows - 1)) {
      return;
    }

    this.charge =
      //centro
      (0.6 * this.Vm) +
      //arriba
      (0.05 * this.upperCell.Vm) +
      //abajo
      (0.05 * this.lowerCell.Vm) +
      //derecha
      (0.05 * this.leftCell.Vm) +
      //izquierda
      (0.05 * this.rightCell.Vm) +
      //Diagonals
      (0.05 * this.lowerRightCell.Vm) +
      (0.05 * this.upperRightCell.Vm) +
      (0.05 * this.upperLeftCell.Vm) +
      (0.05 * this.lowerLeftCell.Vm);
  }

  stateColor() {
    switch (this.state) {
      case 'resting': return '#feb38b'; //blue'
      case 'open': return '#F9C80E'; //green
      case 'inactive': return '#EA3546'; //red
    }
  }
}

class DeadCell extends Cell {
  calculateAlpha() {
    this.alpha = .05;
  }

  stateColor() {
    return '#000000';
  }
}

class FastCell extends Cell {
  updateState() {
    if (this.state == 'resting' && this.charge > -55) {
      this.state = 'open';
    }
    else if (this.state == 'open' && this.charge > 0) {
      this.state = 'inactive';
    }
    else if (this.state == 'inactive' && this.charge < -55) {
      this.state = 'resting';
    }
  }

  stateColor() {
    switch (this.state) {
      case 'resting': return '#FFFFF0'; //blue'
      case 'open': return '#F9C80E'; //yellow
      case 'inactive': return '#EA3546'; //red
    }
  }
}

export { AutoCell, DeadCell, FastCell };