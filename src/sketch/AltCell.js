import { Cell } from './Cell';

class AutoCell extends Cell {

  constructor(_x, _y, _s, _colPosition, _rowPosition) {
    super(_x, _y, _s, _colPosition, _rowPosition);
    this.alphaVector = [-55, -53, -50, -43, -35, -27, -17, -7, -1, 5, 7, 8, 8, 8, 7, 6, 4, 1, -2, -6, -10, -14, 
      -19, -24, -29, -34, -38, -42, -46, -50, -54, -57, -60, -62, -64, -65, 
      -65, -65, -64, -64, -63, -63,  -62, -62, -61, -61, -60, -60,
      -59, -59, -58, -58, -57, -57, -56, -56, -55, -55, -54, -54, -53, -53, -52, -52, -51, -50, -50,
      -49, -49, -48, -48, -47, -47, -46, -46, -45, -45, -44, -44, -43, -43, -42, -42, -41, -40, -40,
      -39, -39, -38, -38, -37, -37, -36, -36, -35, -35, -34, -34, -33, -33, -32, -32, -31, -31, -30, -30,
      -29, -29, -28, -28, -27, -27, -26, -26, -25, -25, -24, -24, -23, -23, -22, -22, -21, -21, -20, -20,
      -19, -19, -18, -18, -17, -17, -16, -16, -15, -15, -14, -14, -13, -13, -12, -12]
      .flatMap(Vm => [Vm, Vm, Vm])
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
  constructor(_x, _y, _s, _colPosition, _rowPosition) {
    super(_x, _y, _s, _colPosition, _rowPosition);
      this.alphaVector = [-75, -20, 25, 10, 7, 5, 5, 5, 5, 5, 5, 5, 5, 5,5, 5, 5, 5, 5, 5, 5, 5, 4, 3, 2,
          0, -2, -4, -7, -11, -16, -22, -29, -37, -45, -54, -62, -67, -71, -74, -75, -75, -75, -75, -75,
          -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75,
          -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75, -75,
          -75, -75, -75, -75, -75, -75, -75]
        .map(Vm => (Vm + 20) * 1.3)
        .map(Vm => this.invAlpha(Vm));
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