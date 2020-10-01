export class Cell {
  constructor(_x, _y, _s, _colPosition, _rowPosition) {
    this.x = _x;
    this.y = _y;
    this.width = _s;
    this.height = _s;
    this.colPosition = _colPosition;
    this.rowPosition = _rowPosition;
    this.alphaVector = [0.022477101687402, 0.38251827314835, 2.82871716348087, 1.38402094974973, 1.21075269679078,
      1.1086782784601, 1.1086782784601, 1.1086782784601, 1.1086782784601, 1.1086782784601, 1.1086782784601,
      1.1086782784601, 1.1086782784601, 1.1086782784601, 0.86398754, 1.1086782784601, 1.1086782784601,
      1.1086782784601, 1.1086782784601, 1.1086782784601, 1.1086782784601, 1.1086782784601, 1.0612199833641,
      1.01597097025097, 0.972810044748164, 0.892307692307692, 0.818894531800082, 0.751853735331184,
      0.661882236515389, 0.558931341737822, 0.452765661468594, 0.351523941345044, 0.260955656629604,
      0.184288027154434, 0.12837612913945, 0.083141073922967, 0.054187733200584, 0.040108430811134, 
      0.030624251337996, 0.024399477427085, 0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402,
      0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402,
      0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402,
      0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402,
      0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402,
      0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402,
      0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402,
      0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402, 0.022477101687402]; 

    this.state = 'resting';
    this.alpha = .05;
    this.Ko = 4;
    this.Ki = 120;
    this.No = 145;
    this.Ni = 15;

    this.Vm = this.membranePotential();
    this.charge = this.membranePotential();

    this.tissue = window.global.tissue;
    this.rows = window.global.rows;
    this.cols = window.global.cols

    this.step = 50;
  }

  stateColor() {
    switch (this.state) {
      case 'resting': return '#032B43'; //blue'
      case 'open': return '#F9C80E'; //green
      case 'inactive': return '#EA3546'; //red
    }
  }

  refreshCellReference() {
    const x = this.colPosition;
    const y = this.rowPosition;
    const xSize = this.cols;
    const ySize = this.rows;
    const tissue = this.getTissue();
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
  }

  refreshNearReference() {
    if (this.upperCell) this.upperCell.refreshCellReference();
    if (this.lowerCell) this.lowerCell.refreshCellReference();
    if (this.leftCell) this.leftCell.refreshCellReference();
    if (this.rightCell) this.rightCell.refreshCellReference();
    if (this.lowerLeftCell) this.lowerLeftCell.refreshCellReference();
    if (this.lowerRightCell) this.lowerRightCell.refreshCellReference();
    if (this.upperLeftCell) this.upperLeftCell.refreshCellReference();
    if (this.upperRightCell) this.upperRightCell.refreshCellReference();
  }

  calculateAlpha() {
    if (this.alphaVector[this.step]) {
      this.alpha = this.alphaVector[this.step];
    } else {
      this.alpha = this.alphaVector[this.alphaVector.length - 1];
    }
    this.step += 1;
  }

  membranePotential() {
    this.Vm = (61.5 * Math.log10(((this.Ko) + (this.alpha * this.No)) / (this.Ki + (this.alpha * this.Ni))));
  }

  calculateCharge() {
    if (this.colPosition < 1 || this.colPosition >= (this.cols - 1) || this.rowPosition < 1 || this.rowPosition >= (this.rows - 1)) {
      return;
    }

    this.charge =
      //centro
      (0.4 * this.Vm) +
      //arriba
      (0.075 * this.upperCell.Vm) +
      //abajo
      (0.075 * this.lowerCell.Vm) +
      //derecha
      (0.075 * this.leftCell.Vm) +
      //izquierda
      (0.075 * this.rightCell.Vm) +
      //Diagonals
      (0.075 * this.lowerRightCell.Vm) +
      (0.075 * this.upperRightCell.Vm) +
      (0.075 * this.upperLeftCell.Vm) +
      (0.075 * this.lowerLeftCell.Vm);
  }

  updateState() {
    if (this.state == 'resting' && this.charge > -50) {
      this.state = 'open';
      this.step = 0;
    }
    else if (this.state == 'open' && this.charge > -20) {
      this.state = 'inactive';
    }
    else if (this.state == 'inactive' && this.charge < -55) {
      this.state = 'resting';
    }
  }

  isInSide(mX, mY) {
    mX = mX - (this.width * -1);
    mY = mY - (this.width * -1);
    //is mouse insede mX and mY
    if (
      (mX >= this.x) &&
      (mX <= this.x + this.width) &&
      (mY >= this.y) && (mY <= this.y + this.height))
      return true;
    else {
      return false;
    }
  }

  getTissue() {
    return window.global.tissue;
  }
}
