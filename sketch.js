const Boxy = require('js/boxy');

function setup() {
	let graph = createCanvas(300, 200);
	
	graph.parent('#chart');

	arrayLength = 30;
	tissue = new Array();
	conexinaArray = new Array();
	for (let idx = 0; idx < arrayLength; idx++) {
		if (idx == 0 || idx == arrayLength -1) 
			tissue[idx] = new Boxy.AirBoxy(idx);
		else if (idx == 10)
			tissue[idx] = new AutoCell(idx);
		else 
			tissue[idx] = new ConducCell(idx)
	}
	for (let idx = 0; idx < arrayLength - 1; idx++) {
		conexinaArray[idx] = new Conexina(tissue[idx], tissue[idx +1]);
	}
}

function draw() {
	for (let idx = 0; idx < tissue.length; idx++) {
		tissue[idx].display();
	}
}