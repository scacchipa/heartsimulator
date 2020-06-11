class Boxy {
    constructor(arrayPosition){
        this.originX = arrayPosition * 10;
        this.originY = 0;
        this.width = 10;
        this.height = 10;
    }
    display(context2D) {
        context2D.fillRect(this.originX, this.originY, this.width, this.height);
        context2D.strokeRect(this.originX, this.originY, this.width, this.height);
    }
}

class Cell extends Boxy {
    loads;
    Vm;
   
    //variables to calculate membrane potential
    alpha = .05;
    Ko = 4;
    Ki = 120;
    No = 145;
    Ni = 15;
   
    constructor(arrayPosition) {
        super(arrayPosition);
        this.Vm = this.membranePotential();
        this.state = new ClosedState();
    }
    membranePotential() {
        return (61.5 * this.log10((this.Ko + (this.alpha * this.No)) / (this.Ki + (this.alpha * this.Ni))) );
    }
    log10(x) {
        return(Math.log(x)/Math.log(10));
    }
}
class PasiveCell extends Cell {
    constructor(arrayPosition) {
        super(arrayPosition);
    }
    display(context2D) {
        context2D.strokeStyle ="#808080";
        context2D.fillStyle = "#404040";
        super.display(context2D);
    }
}
class ActiveCell extends Cell {
    state;
    constructor(arrayPosition) {
        super(arrayPosition);
        this.state = new ClosedState();
    }
}
class AutoCell extends ActiveCell {
    constructor(arrayPosition) {
        super(arrayPosition);
    }
    display(context2D) {
        if (this.state.isClosed) {
            context2D.strokeStyle ="#808080";
            context2D.fillStyle = "#FF0000";
        } else if (this.state.isOpened) {
            context2D.strokeStyle ="#808080";
            context2D.fillStyle = "#00FF00";
        } else if (this.state.isInactive) {
            context2D.strokeStyle ="#808080";
            context2D.fillStyle = "#0000FF";
        }
        super.display(context2D);
    }
}
class ConducCell extends ActiveCell {
    constructor(arrayPosition) {
        super(arrayPosition);
        this.state = new ClosedState();
    }
    display(context2D) {
        if (this.state.isClosed) {
            context2D.strokeStyle ="#808080";
            context2D.fillStyle = "#FF8888";
        } else if (this.state.isOpened) {
            context2D.strokeStyle ="#808080";
            context2D.fillStyle = "#88FF88";
        } else if (this.state.isInactive) {
            context2D.strokeStyle ="#808080";
            context2D.fillStyle = "#8888FF";
        }
        super.display(context2D);
    }
}
class AirBoxy extends Boxy {
    constructor(arrayPosition) {
        super(arrayPosition);
    }
    display(context2D) {
        context2D.strokeStyle ="black";
        context2D.fillStyle = "blue";
        super.display(context2D);
    }
}
class ChannelState {
    cell;
    isClosed;
    isOpened;
    isInactive;
    constructor(cell) {
      this.cell = cell;
      this.isClosed = false;
      this.isOpened = false;
      this.isInactive = false;
    }
}
class ClosedState extends ChannelState {
    constructor(cell) {
      super(cell);
      this.isClosed = true;
    }
    updateState() {
      if (cell.membranePotential() > - 60 )
        return new OpenedState(cell);
      else
        return this;
    }

}
class OpenedState extends ChannelState {
    constructor(cell) {
        super(cell);
        this.isOpened = true;
    }
    updateState() {
      if (cell.membranePotential() > 10)
        return new InactiveState(cell);
      else
        return this;
    }
}
class InactiveState extends ChannelState {
    constructor(cell) {
        super(cell);
        this.isInactive = true;
    }
    updateState( ){ 
      if (cell.membranePotencial() < -60)
        return new ClosedState(cell);
      else
        return this;
    }
}
  