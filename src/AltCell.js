import { Cell } from './Cell';

class AutoCell extends Cell {
    
    constructor(_x, _y, _s,  _colPosition, _rowPosition) {
        super(_x, _y, _s,  _colPosition, _rowPosition);

        this.funnySlope = 1;
    }
    init() {
        this.depolPotential = this.ecuationGolman(2);
        this.polPotential = this.ecuationGolman(0.05);

        this.Vm = this.polPotential;
        this.charge = this.polPotential;
    }
    updateState() {
        if (this.state == 'resting' && this.charge > -50) {
             this.state = 'open';
           }
        else if (this.state == 'open' && this.charge > 0) {
             this.state = 'inactive';
        }
        else if (this.state == 'inactive' && this.charge < -60) {
             this.state = 'resting';
        }
    }
    calculateDesiredPotential() {
        switch (this.state) {
            case 'resting':
                return Math.min(this.Vm + this.funnySlope, this.depolPotential);
            case 'open':
                return Math.min(this.Vm + (this.depolPotential - this.Vm) / 15, this.depolPotential);
            case 'inactive':
                return Math.max(this.Vm + (this.polPotential - this.Vm) / 15, this.polPotential);
       }
    }
    
    calculateCharge() {
        if (this.colPosition < 1 || this.colPosition >= (this.cols-1) || this.rowPosition < 1 || this.rowPosition >= (this.rows-1)) {
             return; 
        }

        this.charge =
        //centro
        (0.8 * this.Vm) +
        //arriba
        (0.025 * this.upperCell.Vm) +
        //abajo
        (0.025 * this.lowerCell.Vm) +
        //derecha
        (0.025 * this.leftCell.Vm) +
        //izquierda
        (0.025 * this.rightCell.Vm) +
        //Diagonals
        (0.025 * this.lowerRightCell.Vm) + 
        (0.025 * this.upperRightCell.Vm) + 
        (0.025 * this.upperLeftCell.Vm) +
        (0.025 * this.lowerLeftCell.Vm);
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

    }
    
    calculateDesiredPotential() {
        switch (this.state) {
            case 'resting':
                return this.polPotential;
            case 'open':
                return this.depolPotential;
            case 'inactive':
                return Math.max(this.Vm - 3.5, this.polPotential);
       }
    }
    membranePotential() {
        const coef1 = 0.5;
        const coef2 = 0.8;

        const desiredVm = this.calculateDesiredPotential();

        const pending1 = (desiredVm - this.Vm) * coef1;
        this.pending2 = this.pending2 + (pending1 - this.pending2) * coef2;
        this.Vm = this.Vm + this.pending2;
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