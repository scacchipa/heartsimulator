import p5 from 'p5';
import $ from  'jquery';

// const s = ( sketch  ) => {

//   let x = 100;
//   let y = 100;

//   sketch.setup = () => {
//     sketch.createCanvas(200, 200);

//   };

//   sketch.draw = () => {
//     sketch.background(0);
//     sketch.fill(255);
//     sketch.rect(x,y,50,50);
//   };
// };

// let myp5 = new p5(s, 'chart');

let x = 100;
let y = 100;

p5.setup = () => {
  p5.createCanvas(200, 200);

};

p5.draw = () => {
  p5.background(0);
  p5.fill(255);
  p5.rect(x,y,50,50);
};