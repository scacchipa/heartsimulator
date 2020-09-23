import {Tissue} from './Tissue.js';
import {Cell} from './Cell.js';
import { AutoCell, DeadCell, FastCell } from './AltCell.js';

export default function( sketch ) {

  let rows = window.global.rows;
  let cols = window.global.cols;
  let cell_size = window.global.cell_size;

  sketch.setup = () => {  
    let cvn_height = (cell_size * (cols - 2));
    let cvn_width = (cell_size * (rows-2));

    sketch.createCanvas(cvn_height, cvn_width);

    window.global.tissue = new Tissue(cols, rows);
  };

  sketch.draw = () => {
    let tissue = window.global.tissue;
    
    sketch.background(0);
    //Shifts canvas to remove 2top rows and col.
    sketch.translate((cell_size * -1), (cell_size * -2))

    create_grid_cell(tissue)
    cell_calculations(tissue)

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let cell = tissue.getCell(i, j);
        
        paint(cell);
        transform_cell(cell, tissue, i, j)
      }      
    }
  };

  function paint(cell) {
    sketch.rect(cell.x, cell.y, cell.width, cell.height);
    sketch.fill(cell.stateColor());
  }
  
  function create_grid_cell(tissue) {
    if (window.global.stop == true) {
      tissue.create_grid_cell();
      window.global.stop = false ;
    } 
  }

  function cell_calculations(tissue) {
    if (window.global.play == true) {
      tissue.forAll( function() { this.membranePotential() } );
      tissue.forAll( function() { this.calculateAlpha() } );
      tissue.forAll( function() { this.calculateCharge() } );
      tissue.forAll( function() { this.updateState() } );
    }
  }

  function transform_cell(cell ,tissue, i ,j){
    let AltCellBtn = window.global.AltCellBtn;

    if (sketch.mouseIsPressed && cell.isInSide(sketch.mouseX, sketch.mouseY)) 
    { 
      switch (AltCellBtn) {
        case 'Dead':
          tissue.setCell(i, j, new DeadCell(i*cell_size, j*cell_size, cell_size, i, j));
          break;W
        case 'Auto':
          tissue.setCell(i, j, new AutoCell(i*cell_size, j*cell_size, cell_size, i, j));
          break;
        case 'Fast':
          tissue.setCell(i, j, new FastCell(i*cell_size, j*cell_size, cell_size, i, j));
          break;
        case 'Normal':
          tissue.setCell(i, j, new Cell(i*cell_size, j*cell_size, cell_size, i, j));
          break;
      }
    }
  }
};

