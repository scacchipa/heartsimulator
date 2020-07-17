import { Cell } from './Cell';

class AutoCell extends Cell {
    calculateAlpha() 
    {   
        let funny_current = 0.00125;
        
        switch (this.state) {
            case 'resting':
                this.alpha = this.alpha + funny_current;
                break;
            case 'open':
                this.alpha = this.alpha + (5 - this.alpha) / 50;
                break;
            case 'inactive':
                this.alpha = this.alpha + (0.05 - this.alpha) / 50;
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
    calculateAlpha() {
        this.alpha = .1;
   }

    stateColor() {
        return '#000000'; 
    }
}

class FastCell extends Cell {
    calculateAlpha() {
        switch (this.state)
        {
            case 'resting':
                 this.alpha = this.alpha + (0.09 - this.alpha) / 10; 
                 break;
            case 'open':
                 this.alpha = this.alpha + (50 - this.alpha) / 50; 
                 break;
            case 'inactive':
                 this.alpha = this.alpha + (0.05 - this.alpha) / 50; 
                 break;
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