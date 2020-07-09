import { Cell } from './Cell';

export class DeadCell extends Cell {
    calculateAlpha() {
        this.alpha = .1;
   }

    stateColor() {
        return '#000000'; 
    }
}