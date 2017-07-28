var rays = new Array();
var cx, cy;

function setup(){
  smooth(8);
  createCanvas(window.innerWidth,window.innerHeight);
  cx = width/2;
  cy = 100;

  background(color(0,255));
  generateRays(500);
}

function generateRays(num){
  for(var i = 1; i <= num; i++){
    var theta = ((Math.PI*2)/num)*i;
    colorMode(HSB,255);
    var ray_color = random(255);
    // colorMode(RGB,255);
    rays.push(new Ray(theta,ray_color));
  }
}

function draw(){
  background(color(0,0));

//   text("Rays: " + rays.length, 10, 10);
//   text("Framecount: " + frameCount, 10, 30);

  if(frameCount % 700 == 0){
    // rays = [];
     // generateRays(200);
  }

  for(var i = 0; i < rays.length; i++){
    rays[i].move();
  }
}

function Ray(theta,color){
  this.x = cx + (20 * Math.cos(theta));
  this.y = cy + (20 * Math.sin(theta));
  this.driver = 0;
  this.c_driver = 0;
  this.ramp_size = 10;
  this.trigger = Math.floor(random(100));
  this.ramp_dir = 0;
  this.color = color;

  this.move = function(){
    this.driver += 1;

    //when the ramp_dir is 0, hold for a random length
    if(this.ramp_dir == 0){
      //HOLD IT NOW
      if(this.driver % this.trigger == 0){
        this.trigger = Math.floor(random(100)+10);
        if(this.driver % this.ramp_size == 0){
          this.c_driver += Math.PI/2;
          this.ramp_dir = Math.round(Math.sin(this.c_driver));
        }
      }
    }else{
      //HIT IT
      if(this.driver % this.ramp_size == 0){
        this.c_driver += Math.PI/2;
        this.ramp_dir = Math.round(Math.sin(this.c_driver));
      }
    }

    this.x += Math.cos(theta + this.ramp_dir);
    this.y += Math.sin(theta + this.ramp_dir);

    stroke(color);
    point(this.x,this.y);
  }
}
