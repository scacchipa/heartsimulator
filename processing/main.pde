/**
 * @title Membrane potential simulator
 * @dev see https://github.com/scammi/membrane-potential-sim
 */

Cell[][] tissue;

// cell state
final String resting = "resting";
final String open = "open";
final String inactive = "inactive";

int cols = 50;
int rows = 50;
int time = 0;

public void setup() {
  size(500, 500);
  background(150);

  tissue = new Cell[cols][rows];

  //TODO: ADD AUTOCELL
  for (int i = 0; i < cols; i++) {
      for (int j = 0; j < rows; j++) {
        if(i == 20 && j == 20){
           tissue[i][j] = new AutoCell(i*10, j*10, 10, 10, i, j);
        }else{
          tissue[i][j] = new Cell(i*10, j*10, 10, 10, i, j);
        }
    }
  }

}

public void draw() {

 for (int w = 0; w < cols; w++) {
   for (int p = 0; p < rows; p++) {
     tissue[w][p].display();
     tissue[w][p].calculateMembranePotential();
     tissue[w][p].calculateCharge();
     tissue[w][p].calculateAlpha();


   }
   // tissue[i].calculateCharge();
   // tissue[i].calculateAlpha();

 }
}
