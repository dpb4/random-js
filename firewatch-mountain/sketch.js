let speedMultiplier = 0.8;
let noiseScale = 0.002;

//let t;

let falloff = 1.5;
let depth = 6;
let speed = 3;

let falloffFalloff = 5;
let speedFalloff = 1.5;

let positions = [];
let heights = [];
let depths = [];
let falloffs = [];
let speeds = [];
let colors = [];

let terrains = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  positions = [
    0.35,
    0.5,
    0.6,
    0.7,
    0.8,
  ];
    
  heights = [
    0.3,
    0.25,
    0.2,
    0.2,
    0.25,
  ];
    
depths = [
    1,
    2,
    2,
    3,
    6,
  ];
    
  falloffs = [
    20,
    4,
    4,
    4,
    2,
  ];
    
  speeds = [
    1,
    2,
    3,
    4,
    5,
  ]
    
  colors = [
    "#CAD2C5",
    "#84A98C",
    "#52796F",
    "#354F52",
    "#2F3E46",
    "#D1DEDA",
  ];

  let n = colors.length-1;
  // let h = height/2/(n+0);
  // for (let i = 0; i < n; i++) {
  //   terrains.push(new Terrain(
  //     height * 0.4 + i*h, 
  //     h*2, 
  //     depth, 
  //     falloff * pow(falloffFalloff, n-i-1), 
  //     speed / pow(speedFalloff, n-i-1), 
  //     i*739, //prng
  //     color(colors[n-i-1])));
  // }

  for (let i = 0; i < n; i++) {
    terrains.push(new Terrain(positions[i]*height, heights[i]*height, depths[i], falloffs[i], speeds[i], i*739, colors[i]));
  }
}

function draw() {
  background(color(colors[colors.length-1]));

  for (let i = 0; i < terrains.length; i++) {
    terrains[i].render();
  }

}

class Terrain {
  constructor(ypos, amplitude, depth, falloff, scrollSpeed, seed, color) {
    this.ypos = ypos;
    this.amplitude = amplitude;
    this.depth = depth;
    this.falloff = falloff;
    this.scrollSpeed = scrollSpeed;
    this.seed = seed;
    this.color = color;

    this.ascale = (1 - 1/this.falloff) / (1 - pow(1/this.falloff, this.depth));
  }

  render() {
    noStroke();
    fill(this.color);
    beginShape();
    vertex(width+1, this.ypos);
    vertex(width+1, height+1);
    vertex(-1, height+1);
    vertex(-1, this.ypos);

    for (let x = 0; x < width; x++) {
      let s = x*noiseScale + this.seed + this.scrollSpeed*frameCount*noiseScale*speedMultiplier;
      let y = this.ypos;

      // console.log(ascale);

      for (let d = 0; d < this.depth; d++) {
        let f = pow(this.falloff, d);
        y += (this.amplitude / f) * ((noise(s*f + this.seed*f) - 0.5) * 2) * this.ascale;
      }
      vertex(x, y);
    }
    endShape();
  }
}
