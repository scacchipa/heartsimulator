import { Cell } from './Cell';

class AutoCell extends Cell {
    calculateAlpha() 
    {   
        /*  funny_current
            determines the heart rate restin > open time
            PRUDCTION: 0.0015 
        */
        let funny_current = 0.0025; 

        switch (this.state) {
            case 'resting':
                this.alpha = this.alpha + funny_current;
                break;
            case 'open':
                this.alpha = this.alpha + (5 - this.alpha) / 20;
                break;
            case 'inactive':
                this.alpha = this.alpha + (0.05 - this.alpha) / 30;
                break;
       }
    }

    stateColor() {
        switch (this.state) {
             case 'resting': return '#feb38b'; //blue'
             case 'open': return '#F9C80E'; //green
             case 'inactive': return '#EA3546'; //red
        }
   }
}

class DeadCell extends Cell {
    constructor(_x, _y, _s,  _colPosition, _rowPosition){
        super(_x, _y, _s,  _colPosition, _rowPosition);
    }

    calculateAlpha() {
        this.alpha = .05;
   }

    stateColor() {
        return '#000000'; 
    }
}

class FastCell extends Cell {
    updateState() {
        if (this.state == 'resting' && this.charge > -55) {
             this.state = 'open';
           }
        else if (this.state == 'open' && this.charge > -20) {
             this.state = 'inactive';
        }
        else if (this.state == 'inactive' && this.charge < -55) {
             this.state = 'resting';
        }
   }

   stateColor() {
        switch (this.state) {
             case 'resting': return '#FFFFF0'; //blue'
             case 'open': return '#F9C80E'; //yellow
             case 'inactive': return '#EA3546'; //red
        }
   }
}

export { AutoCell, DeadCell, FastCell };