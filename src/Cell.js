export class Cell  {
     constructor(_x, _y, _s,  _colPosition, _rowPosition){
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
          this.charge = 0;

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

     membranePotential() {
          this.Vm = (61.5 * Math.log10(((this.Ko) + (this.alpha * this.No)) / (this.Ki + (this.alpha * this.Ni))));
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

     calculateCharge() {
          if (this.colPosition < 1 || this.colPosition >= (this.cols-1) || this.rowPosition < 1 || this.rowPosition >= (this.rows-1)) {
               return; 
          }

          let preCol  = this.colPosition - 1;
          let postCol = this.colPosition + 1;
          let preRow  = this.rowPosition - 1;
          let postRow = this.rowPosition + 1;

          this.charge =
          //centro
          (0.4 * this.tissue[this.colPosition][this.rowPosition].Vm) +
          //arriba
          (0.075 * this.tissue[this.colPosition][preRow].Vm) +
          //abajo
          (0.075 * this.tissue[this.colPosition][postRow].Vm) +
          //derecha
          (0.075 * this.tissue[preCol][this.rowPosition].Vm) +
          //izquierda
          (0.075 * this.tissue[postCol][this.rowPosition].Vm) +
          //Diagonals
          (0.075 * this.tissue[postCol][postRow].Vm) + 
          (0.075 * this.tissue[postCol][preRow].Vm) + 
          (0.075 * this.tissue[preCol][preRow].Vm) + 
          (0.075 * this.tissue[preCol][postRow].Vm);

          this.updateState();
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
               (mY >= this.y) && (mY <=this.y + this.height))
               return true;
          else {
               return false;
          }
     }
}
