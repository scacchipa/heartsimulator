export class Cell  {
     constructor(_x, _y, _w, _h, _colPosition, _rowPosition){
          this.x = _x;
          this.y = _y;
          this.width = _w;
          this.height = _h;
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
     }

     stateColor() {
          switch (this.state) {
               case 'resting': return '#ea1313'; //red
               case 'open': return '#008080'; //green
               case 'inactive': return '#4224ff'; //blue
          }
     }

     membranePotential() {
          this.Vm = (61.5 * Math.log10((this.Ko + (this.alpha * this.No)) / (this.Ki + (this.alpha * this.Ni))) );
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
                    this.alpha = this.alpha + (0.05 - this.alpha) / 50; 
                    break;
          }
     }

     calculateCharge() {
          if (this.colPosition < 1 || this.colPosition >= (50-1) || this.rowPosition < 1 || this.rowPosition >= (50-1)) {
               return; 
          }

          let preCol  = this.colPosition - 1;
          let postCol = this.colPosition + 1;
          let preRow  = this.rowPosition - 1;
          let postRow = this.rowPosition + 1;

          this.charge =
          //centro
          (0.4 * window.tissue[this.colPosition][this.rowPosition].Vm) +
          //arriba
          (0.15 * window.tissue[this.colPosition][preRow].Vm) +
          //abajo
          (0.15 * window.tissue[this.colPosition][postRow].Vm) +
          //derecha
          (0.15 * window.tissue[preCol][this.rowPosition].Vm) +
          //izquierda
          (0.15 * window.tissue[postCol][this.rowPosition].Vm);

          this.updateState();
     }

     updateState() {
          if (this.state == 'resting' && this.charge > -50) {
               this.state = 'open';
             }
          else if (this.state == 'open' && this.charge > 10) {
               this.state = 'inactive';
          }
          else if (this.state == 'inactive' && this.charge < -55) {
               this.state = 'resting';
          }
     }
}
