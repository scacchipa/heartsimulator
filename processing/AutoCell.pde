class AutoCell extends Cell {

 AutoCell(int tempX, int tempY, int tempW, int tempH, int tempColPosition, int tempRowPosition){
   super(tempX, tempY, tempW, tempH, tempColPosition, tempRowPosition);
 }

 public void calculateAlpha() {
    if (state == resting) {
      alpha = alpha + 0.05;
    }
    else if (state == open) {
      alpha = alpha + (5 - alpha) / 50;
    }
    else if (state == inactive) {
      alpha = alpha + (0.05 - alpha) / 50;
    }
 }

}
