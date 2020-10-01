import { Cell } from './Cell';

class AutoCell extends Cell {

  constructor(_x, _y, _s, _colPosition, _rowPosition) {
    super(_x, _y, _s, _colPosition, _rowPosition);
    this.alphaVector = [0.079017638316712, 0.087426274529658, 0.101319120615281, 0.140759161197691, 0.201235298258573, 0.284269044342926,
      0.434091383795049, 0.661882236515389, 0.854761953503158, 1.1086782784601, 1.21075269679078, 1.26565897635961, 1.26565897635961,
      1.26565897635961, 1.21075269679078, 1.15847592624432, 1.0612199833641, 0.931624148542893, 0.818894531800082, 0.690554903413878,
      0.583020818384816, 0.492552560038754, 0.399000972359427, 0.322970018994376, 0.260955656629604, 0.210225265294955, 0.176302912730504,
      0.147322461341934, 0.122536874039479, 0.101319120615281, 0.083141073922967, 0.071231274435892, 0.060616468443488, 0.054187733200584,
      0.048231969711805, 0.045420275435059, 0.045420275435059, 0.046532101868538, 0.047661018833159, 0.048807293899341, 0.049971198975925,
      0.051153010385086, 0.052353008938677, 0.053571480016038, 0.0548087136433, 0.056065004574214, 0.057340652372547, 0.058635961496073,
      0.059951241382198, 0.061286806535248, 0.062642976615477, 0.064020076529806, 0.065418436524359, 0.066838392278815, 0.068280285002636,
      0.069744461533201, 0.071231274435892, 0.072741082106186, 0.074274248873786, 0.075831145108853, 0.077412147330371, 0.079017638316712,
      0.080648007218445, 0.082303649673437, 0.083984967924314, 0.085692370938322, 0.087426274529658, 0.089187101484325, 0.090975281687575,
      0.092791252253995, 0.094635457660313, 0.096508349880974, 0.098410388526572, 0.100342040985194, 0.102303782566753, 0.104296096650386,
      0.106319474834993, 0.10837441709299, 0.110461431927364, 0.112581036532109, 0.11473375695613, 0.116920128270701, 0.119140694740577,
      0.12139600999883, 0.123686637225544, 0.126013149330422, 0.12837612913945, 0.13077616958569, 0.133213873904336, 0.135689855832119]; 
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