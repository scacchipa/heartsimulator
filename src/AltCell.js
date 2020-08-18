import { Cell } from './Cell';

class AutoCell extends Cell {
    
    constructor(_x, _y, _s,  _colPosition, _rowPosition) {
        super(_x, _y, _s,  _colPosition, _rowPosition);

        let higherAlpha = 5;
        let lowerAlpha = 0.05;
        this.higherAlpha = higherAlpha;
        this.lowerAlpha = lowerAlpha;
        this.funnySlope = 0.0015;
        this.despolarizationSlope = (this.lowerApha - this.higherAlpha) / 2000;
        this.repolarizationSlope = (this.higherAlpha - this.lowerAlpha) / 2000;
    }
    calculateAlpha() 
    {   
        switch (this.state) {
            case 'resting':
                this.alpha = Math.min(this.alpha + this.funnySlope, this.higherAlpha);
                break;
            case 'open':
                this.alpha = this.alpha + (5 - this.alpha) / 300;
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
    calculateAlpha() {
        this.alpha = .05;
    }

    stateColor() {
        return '#000000'; 
    }
}

class FastCell extends Cell {
    constructor(_x, _y, _s,  _colPosition, _rowPosition) {
        super(_x, _y, _s,  _colPosition, _rowPosition);
        let higherAlpha = 5;
        let lowerAlpha = 0.05;
        this.higherAlpha = higherAlpha;
        this.lowerAlpha = lowerAlpha;
        this.despolarizationSlope = (higherAlpha - lowerAlpha) / 20;
        this.repolarizationSlope = (lowerAlpha - higherAlpha) / 1000;
    }
    calculateAlpha() {
        switch (this.state)
        {
            case 'resting':
                this.alpha = this.alpha = this.alpha + (0.05 - this.alpha) / 10;
                break;
            case 'open':
                this.alpha = Math.min(this.alpha + this.despolarizationSlope, this.higherAlpha);  
                break;
            case 'inactive':
                this.alpha = Math.max(this. alpha + this.repolarizationSlope, this.lowerAlpha);
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