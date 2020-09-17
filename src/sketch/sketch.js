import {Tissue} from './Tissue.js';
import {Cell} from './Cell.js';
import { AutoCell, DeadCell, FastCell } from './AltCell.js';

export default function( sketch ) {

  let rows = window.global.rows;
  let cols = window.global.cols;
  let size = window.global.size;

  let requet_data = {
    "name": 'test1',
    "data": []
  }; 

  function call_test(){
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:3000/');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(requet_data));
  }

  function paint(cell) {
  sketch.rect(cell.x, cell.y, cell.width, cell.height);
  sketch.fill(cell.stateColor());
  }

  sketch.setup = () => {  
    let cvn_height = (size * (cols - 2));
    let cvn_width = (size * (rows-2));

    sketch.createCanvas(cvn_height, cvn_width);

    window.global.tissue = new Tissue(cols, rows);
  };

  sketch.draw = () => {
    sketch.background(0);
   
    //Shifts canvas to remove 2top rows and col.
    sketch.translate((size * -1), (size * -2))

    let play = window.global.play;
    let AltCellBtn = window.global.AltCellBtn;
    let tissue = window.global.tissue;

    if (play == true) {
      tissue.forAll( function() { this.membranePotential() } );
      tissue.forAll( function() { this.calculateAlpha() } );
      tissue.forAll( function() { this.calculateCharge() } );
      tissue.forAll( function() { this.updateState() } );
    }

    if (window.global.stop == true)
    {
      tissue.create_grid_cell();
      window.global.stop = false ;
      call_test();
    } 

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let cell = tissue.getCell(i, j);
        
        paint(cell);
        if (cell.isInSide(sketch.mouseX, sketch.mouseY)) {
            // console.log("Alfa: ", cell.alpha, "Coord", i,", ", j, ": ", cell.Vm);
        }

        if (i == 20 && j == 20){
          console.log('Alfa:,', cell.alpha, ',');
          requet_data.data.push(cell.alpha);
        }

        if (sketch.mouseIsPressed && cell.isInSide(sketch.mouseX, sketch.mouseY)) 
        { 
          switch (AltCellBtn) {
            case 'Dead':
              tissue.setCell(i, j, new DeadCell(i*size, j*size, size, i, j));
              break;
            case 'Auto':
              tissue.setCell(i, j, new AutoCell(i*size, j*size, size, i, j));
              break;
            case 'Fast':
              tissue.setCell(i, j, new FastCell(i*size, j*size, size, i, j));
              break;
            case 'Normal':
              tissue.setCell(i, j, new Cell(i*size, j*size, size, i, j));
              break;
          }
        }
      }      
    }
  };
};

