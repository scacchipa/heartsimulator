import { Tissue } from './Tissue.js';
import { Helper } from './Helper.js';

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

    let tissue = window.global.tissue; 
    let play = window.global.play;
    let stop = window.global.stop;
    
    if (play == true) {
      tissue.forAll( function() { this.membranePotential() } );
      tissue.forAll( function() { this.calculateAlpha() } );
      tissue.forAll( function() { this.calculateCharge() } );
      tissue.forAll( function() { this.updateState() } );
    }

    if (stop == true){
      tissue = new Tissue(cols, rows);
      tissue.refreshAllReference();
      stop = false;
    }

    tissue.forAll( function() { 
      paint(this);

      if (this.colPosition == 12 && this.rowPosition == 12){
        window.global.request_data.data.push(this.Vm);
      }

      if (this.isInSide(sketch.mouseX, sketch.mouseY)) {
        console.log("State", this.state ,"Coord", this.colPosition,", ", this.rowPosition, " Vm=", this.Vm);
      
        if (sketch.mouseIsPressed) Helper.transaform_cell.call(this); 
      }
    } );    
  };
};

