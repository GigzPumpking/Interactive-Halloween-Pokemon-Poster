let lampBody;
let Pokemons = [];
let PokemonsA = [];
let p = [];
let smoke = [];
let Lamps = [];
let LampsStation;
let On = false;
let seen = [];
let title = [];
let speed = 1;
let gameover = false;
let PokemonNoise = [];
let titleLetters = [];
let Click;
let alreadyPlayed = [];
for (let i = 0; i<9; i++) {
  alreadyPlayed[i] = false;
}

function preload(){
  soundFormats('mp3');
  Click = loadSound('noises/Click.mp3');
  titleLetters[0] = loadSound('noises/P.mp3');
  titleLetters[1] = loadSound('noises/O.mp3');
  titleLetters[2] = loadSound('noises/K.mp3');
  titleLetters[3] = loadSound('noises/E.mp3');
  titleLetters[4] = loadSound('noises/M.mp3');
  titleLetters[5] = loadSound('noises/O.mp3');
  titleLetters[6] = loadSound('noises/N.mp3');
  titleLetters[7] = loadSound('noises/Pokémon.mp3');
  titleLetters[8] = loadSound('noises/Thanks.mp3');
  PokemonNoise[0] = loadSound('noises/Polteageist.mp3');
  PokemonNoise[1] = loadSound('noises/Rotom.mp3');
  PokemonNoise[2] = loadSound('noises/Yamask.mp3');
  PokemonNoise[3] = loadSound('noises/Gengar.mp3');
  PokemonNoise[4] = loadSound('noises/Misdreavus.mp3');
  PokemonNoise[5] = loadSound('noises/Spiritomb.mp3');
  PokemonNoise[6] = loadSound('noises/Chandelure.mp3');
  title[0] = loadImage('Poster/P.png');
  title[1] = loadImage('Poster/O.png');
  title[2] = loadImage('Poster/K.png');
  title[3] = loadImage('Poster/E.png');
  title[4] = loadImage('Poster/M.png');
  title[5] = loadImage('Poster/O.png');
  title[6] = loadImage('Poster/N.png');
  lampBody = loadImage('lamps/LampBody.png');
  Lamps[0] = loadImage('lamps/LampOff.png');
  Lamps[1] = loadImage('lamps/LampOnLeft.png');
  Pokemons[0] = loadImage('images/PolteageistB.png');
  PokemonsA[0] = loadImage('images2/PolteageistA.png');
  Pokemons[1] = loadImage('images/RotomB.png');
  PokemonsA[1] = loadImage('images2/RotomA.png');
  Pokemons[2] = loadImage('images/YamaskB.png');
  PokemonsA[2] = loadImage('images2/YamaskA.png');
  Pokemons[3] = loadImage('images/GengarB.png');
  PokemonsA[3] = loadImage('images2/GengarA.png');
  Pokemons[4] = loadImage('images/MisdreavusB.png');
  PokemonsA[4] = loadImage('images2/MisdreavusA.png');
  Pokemons[5] = loadImage('images/SpiritombB.png');
  PokemonsA[5] = loadImage('images2/SpiritombA.png');
  Pokemons[6] = loadImage('images/ChandelureB.png');
  PokemonsA[6] = loadImage('images2/ChandelureA.png');
  
  
}

function setup() {
  createCanvas(1050, 1000);
  for (let j = 0; j < 1000; j++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 40);
    smoke[j] = new Smoke(x, y, r);
  }
  for (let i = 0; i < Pokemons.length; i++) {
    let x = random(width);
    let y = random(height);
    let r = 150;
    let n = i;
    p[i] = new Pokemon(n, x, y, r);
  }
  for (let i = 0; i< Pokemons.length; i++) {
     seen[i]=false;
  }
   LampsStation = new LampHead(0, 850, 75);
  
}

function draw() {
  background(0);
  for (let j of smoke) {
     j.move();
     j.show();
  }
  for (let i = 0; i< Pokemons.length; i++) {
     p[i].move();
     p[i].show();
  }
  image(lampBody, 820, 50);
  lampBody.resize(0, 250);
  LampsStation.show();
  if (On == true) {
    let light = new Light(mouseX, mouseY, 75);
    light.show();
    for (let i = 0; i< Pokemons.length; i++) {
      let d = dist(light.x, light.y, p[i].x, p[i].y)
      if (d < p[i].r) {
        p[i].reveal();
        PokemonNoise[i].playMode('untilDone');
        PokemonNoise[i].play();
      }
    }
  }
  let count = 0;
  for (let i = 0; i<Pokemons.length; i++) {
    if (seen[i] == true) {
      count++;
      let h = height/2
      let space = 80
      let w = 300
      title[i].resize(0, 100);
      if (i != 2 && i != 6 && i != 4) {
        image(title[i], w+i*space, h);
      }
      if (i == 2 || i == 6) {
        image(title[i], w+i*space+25, h);
      }
      if (i == 4) {
        image(title[i], w+i*space+10, h);
      }
      if (alreadyPlayed[i] == false) {
        titleLetters[i].playMode('untilDone');
        titleLetters[i].play();
        alreadyPlayed[i] = true;
      }
  }
}
  if (count == 7) {

    console.log("oh baby a triple");
    On = false;
    for (let i = 0; i< Pokemons.length; i++) {
       p[i].hide();
       speed = 3;
    }
    gameover = true;
    if (alreadyPlayed[7] == false) {
      titleLetters[7].playMode('untilDone');
      titleLetters[7].play();
      alreadyPlayed[7] = true;
    }
    
  }
}

function mousePressed() {
  if (gameover == false) {
    LampsStation.clicked(mouseX, mouseY);
    for (let i = 0; i< Pokemons.length; i++) {
       p[i].clicked(mouseX, mouseY);
    }  
  }
  if (alreadyPlayed[7] == true && alreadyPlayed[8] == false) {
    titleLetters[8].playMode('untilDone');
    titleLetters[8].play();
    alreadyPlayed[8] = true;
  }
}

class Pokemon {
  constructor(n, x, y, r) {
    this.n = n;
    this.x = x;
    this.y = y;
    this.r = r;
  }
  move() {
    if (this.x < width-100 && this.x > 100 && this.y > 100 && this.y < height-100) {
      this.x = this.x + random(-5*speed, 5*speed);
      this.y = this.y + random(-5*speed, 5*speed);
    }
    else {
      this.x = random(100, width-100);
      this.y = random(100, height-100);
    }
    
  }
  reveal() {
    drawingContext.globalAlpha = 1;
    if (seen[this.n] == false) {
      image(Pokemons[this.n], this.x, this.y, this.r, this.r);
    }
    else {
      image(PokemonsA[this.n], this.x, this.y, this.r, this.r);
    }
  }
  hide() {
    drawingContext.globalAlpha = 0;
    image(Pokemons[this.n], this.x, this.y, this.r, this.r);
  }
  show() {
    drawingContext.globalAlpha = 0.025;
    if (seen[this.n] == false) {
      image(Pokemons[this.n], this.x, this.y, this.r, this.r);
    }
    else {
      image(PokemonsA[this.n], this.x, this.y, this.r, this.r);
    }
    drawingContext.globalAlpha = 1; 
  }
  clicked(x, y) {
    let d = dist(x, y, this.x, this.y)
    if (d < this.r*0.85) {
      console.log("Clicked");
      if(seen[this.n] == false) {
        seen[this.n] = true;
      }
      console.log(seen[this.n]);
    }
  }
}

class LampHead {
  constructor(n, x, y) {
    this.n = n;
    this.x = x;
    this.y = y;
  }
  show() {
    image(Lamps[this.n], this.x, this.y);
    Lamps[this.n].resize(0, 85);
  }
  clicked(x, y) {
    let d = dist(x, y, this.x, this.y)
    if (d < 85) {
      Click.playMode('untilDone');
      Click.play()
      console.log("Clicked");
      if (this.n == 0) {
        this.n = 1;
        this.x = this.x - 10;
        On = true;
      }
      else {
        this.n = 0;
        this.x = this.x + 10;
        On = false;
      }
    }
  }
}

class Smoke {
   constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
  show() {
    noStroke();
    fill(255, 5);
    ellipse(this.x, this.y, this.r*2);
  }
}

class Light {
   constructor(x, y, l) {
    this.x = x;
    this.y = y;
    this.r = 100;
    this.l = l;
    this.speed = 7;
    this.angle = radians(0);
    this.color = color(245, 230, 100, this.l);
  }
  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.r);
  }
}