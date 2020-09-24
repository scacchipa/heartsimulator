export class Cell {
  constructor(_x, _y, _s, _colPosition, _rowPosition) {
    this.x = _x;
    this.y = _y;
    this.width = _s;
    this.height = _s;
    this.colPosition = _colPosition;
    this.rowPosition = _rowPosition;

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
    switch (this.state) {
      case 'resting':
        this.alpha = this.alpha + (0.05 - this.alpha) / 10;
        break;
      case 'open':
        this.alpha = this.alpha + (50 - this.alpha) / 50;
        break;
      case 'inactive':
        this.alpha = this.alpha + (0.05 - this.alpha) / 20;
        break;
    }
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
