import { Tissue } from './Tissue.js';
import { Helper } from './Helper.js';

export default( sketch ) => {

  let rows = window.global.rows;
  let cols = window.global.cols;
  let size = window.global.size;
  
  sketch.setup = () => { 
    create_canvas(sketch)
    create_grid()
  };

  sketch.draw = () => {
    
    let tissue = window.global.tissue; 
    let play = window.global.play;
    let stop = window.global.stop;
    
    sketch.translate((size * -1), (size * -2))  //Shifts canvas to remove 2top rows and col.
    
    if (play == true) {
      tissue.forAll( function() { this.membranePotential() } );
      tissue.forAll( function() { this.calculateAlpha() } );
      tissue.forAll( function() { this.calculateCharge() } );
      tissue.forAll( function() { this.updateState() } );
    }

    if (stop == true) {
      create_grid();
      window.global.stop = false;
    }

    tissue.forAll( function() { 
      paint(this);

      Helper.record_data_for_graph.call(this)

      if (this.isInSide(sketch.mouseX, sketch.mouseY)) {
        console.log(`State: ${this.state} Coord: ${this.colPosition}, ${this.rowPosition}  Vm: ${this.Vm}`);
        if (sketch.mouseIsPressed) Helper.transaform_cell.call(this); 
      }
    });
  };

  function paint(cell) {
    sketch.rect(cell.x, cell.y, cell.width, cell.height);
    sketch.fill(cell.stateColor());
  }

  function create_canvas(sketch){
    let cvn_height = (size * (cols - 2));
    let cvn_width = (size * (rows-2));

    sketch.createCanvas(cvn_height, cvn_width);
  }

  function create_grid(){
    window.global.tissue = new Tissue(cols, rows);
    window.global.tissue.refreshAllReference();
  }

};

