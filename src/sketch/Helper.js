import { AutoCell, DeadCell, FastCell } from './AltCell.js';
import { Cell } from './Cell';

export class Helper {

  static transaform_cell() {
    let tissue = window.global.tissue;
    let AltCellBtn = window.global.AltCellBtn;
    let size = window.global.size;
    let new_cell;

    switch (AltCellBtn) {
      case 'Auto':
        new_cell = new AutoCell(this.colPosition * size, this.rowPosition * size, size, this.colPosition, this.rowPosition);
        break;
      case 'Dead':
        new_cell = new DeadCell(this.colPosition * size, this.rowPosition * size, size, this.colPosition, this.rowPosition);
        break;
      case 'Fast':
        new_cell = new FastCell(this.colPosition * size, this.rowPosition * size, size, this.colPosition, this.rowPosition);
        break;
      case 'Normal':
        new_cell = new Cell(this.colPosition * size, this.rowPosition * size, size, this.colPosition, this.rowPosition);
        break;
    }

    tissue.setCell(this.colPosition, this.rowPosition, new_cell);
  }

  static record_data_for_graph(){
    if (this.colPosition == 12 && this.rowPosition == 12) {
      window.global.request_data.data.push(this.Vm);
    } 
  }
}