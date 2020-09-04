export class Cell  {
     constructor(_x, _y, _s,  _colPosition, _rowPosition){
          this.x = _x;
          this.y = _y;
          this.width = _s;
          this.height = _s;
          this.colPosition = _colPosition;
          this.rowPosition = _rowPosition;

          this.state = 'resting';
          this.Ko = 4;
          this.Ki = 120;
          this.No = 145;
          this.Ni = 15;

          // this.pending1 = 0;
          this.pending2 = 0;

          this.rows = window.global.rows;
          this.cols = window.global.cols
     }

     init() {
          this.depolPotential = this.ecuationGolman(5);
          this.polPotential = this.ecuationGolman(0.01);
          
          this.Vm = this.polPotential;
          this.charge = this.polPotential;
     }

     stateColor() {
          switch (this.state) {
               case 'resting': return '#032B43'; //blue'
               case 'open': return '#F9C80E'; //green
               case 'inactive': return '#EA3546'; //red
          }
     }
     calculateDesiredPotential() {
          switch (this.state) {
               case 'resting':
                    return this.polPotential; 
               case 'open':
                    return this.depolPotential; 
               case 'inactive':
                    return Math.max(this.Vm - 4, this.polPotential);
          }
     }
     membranePotential() {
          const coef1 = 0.2;
          const coef2 = 0.1;

          const desiredVm = this.calculateDesiredPotential();

          const pending1 = (desiredVm - this.Vm) * coef1;
          this.pending2 = this.pending2 + (pending1 - this.pending2) * coef2;
          this.Vm = this.Vm + this.pending2;
     }
     ecuationGolman(alpha) {
          return 61.5 * Math.log10((this.Ko + (alpha * this.No)) / (this.Ki + (alpha * this.Ni)));
     }

     calculateCharge() {
          if (this.colPosition < 1 || this.colPosition >= (this.cols-1) || this.rowPosition < 1 || this.rowPosition >= (this.rows-1)) {
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
          if (this.state == 'resting' && this.charge > -70) {
               this.state = 'open';
             }
          else if (this.state == 'open' && this.charge > +5) {
               this.state = 'inactive';
          }
          else if (this.state == 'inactive' && this.charge < -75) {
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
     getTissue() {
          return window.global.tissue;
     }
}
