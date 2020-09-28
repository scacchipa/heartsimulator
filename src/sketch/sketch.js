import {Tissue} from './Tissue.js';
import { AutoCell, DeadCell, FastCell } from './AltCell.js';

export default( sketch ) => {

  let rows = window.global.rows;
  let cols = window.global.cols;
  let size = window.global.size;

  function paint(cell) {
    sketch.rect(cell.x, cell.y, cell.width, cell.height);
    sketch.fill(cell.stateColor());
  }

  sketch.setup = () => {  
    let cvn_height = (size * (cols - 2));
    let cvn_width = (size * (rows-2));

    sketch.createCanvas(cvn_height, cvn_width);

    window.global.tissue = new Tissue(cols, rows);
    window.global.tissue.refreshAllReference();
  };

  sketch.draw = () => {
    sketch.background(0);

    //Shifts canvas to remove 2top rows and col.
    sketch.translate((size * -1), (size * -2))

    let play = window.global.play;
    let AltCellBtn = window.global.AltCellBtn;
    
    if (play == true) {
      window.global.tissue.forAll( function() { this.membranePotential() } );
      window.global.tissue.forAll( function() { this.calculateAlpha() } );
      window.global.tissue.forAll( function() { this.calculateCharge() } );
      window.global.tissue.forAll( function() { this.updateState() } );
    }
    
    window.global.tissue.forAll( function() { // this is a cell from the tissue
      paint(this);

      if (this.colPosition == 12 && this.rowPosition == 12){
        console.log('i am in');
        window.global.request_data.data.push(this.Vm);
      }

      if (this.isInSide(sketch.mouseX, sketch.mouseY)) {
        console.log("State", this.state ,"Coord", this.colPosition,", ", this.rowPosition, " Vm=", this.Vm);
      
        if (sketch.mouseIsPressed) { 
          switch (AltCellBtn) {
            case 'Dead':
              window.global.tissue.setCell(this.colPosition, this.rowPosition, new DeadCell(this.colPosition*size, this.rowPosition*size, size, this.colPosition, this.rowPosition));
              break;
            case 'Auto':
              window.global.tissue.setCell(this.colPosition, this.rowPosition, new AutoCell(this.colPosition*size, this.rowPosition*size, size, this.colPosition, this.rowPosition));
              break;
            case 'Fast':
              window.global.tissue.setCell(this.colPosition, this.rowPosition, new FastCell(this.colPosition*size, this.rowPosition*size, size, this.colPosition, this.rowPosition));
              break;
          }
        }
      }
    } );    
  };
};

