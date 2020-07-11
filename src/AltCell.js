import { Cell } from './Cell';

class AutoCell extends Cell {
    calculateAlpha() {
        switch (this.state) {
            case 'resting':
                this.alpha = this.alpha + 0.05;
                break;
            case 'open':
                this.alpha = this.alpha + (5 - this.alpha) / 50;
                break;
            case 'inactive':
                this.alpha = this.alpha + (0.05 - this.alpha) / 50;
                break;
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

export { AutoCell, DeadCell };