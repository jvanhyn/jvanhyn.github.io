
class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    mag() {
      return Math.sqrt(this.x ^ 2 + this.y ^ 2);
    }

    sub(v) {
      let x = this.x - v.x;
      let y = this.y - v.y;
      return new Vector(x,y);
    }

    add(v) {
      var u = new Vector(this.x + v.x ,this.y +v.y);
      return u;
    }3
    class Vector {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }
    
        mag() {
          return Math.sqrt(this.x ^ 2 + this.y ^ 2);
        }
    
        sub(v) {
          let x = this.x - v.x;
          let y = this.y - v.y;
          return new Vector(x,y);
        }
    
        add(v) {
          let x = this.x + v.x;
          let y = this.y + v.y;
          print(x)
          return new Vector(x,y);
        }
    
        dist(v){
            return this.mag(this.sub(v));
        }
        
        set(x,y){
          this.x = x;
          this.y = y;
        }
        
      
    }
    
    class PhysicsObject {
      constructor() {
        this.position = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.force = new Vector(0,0);
        this.mass = 1;
        this.size = 100;
        this.g = new Vector(0,9.8*10)
        this.k = 100;
        this.b = 1;
      }
      
       collision(v){
        
      }
      
      
      update(dt){
        this.velocity.x = this.velocity.x + (this.force.x/this.mass + this.g.x)*dt;
        this.velocity.y = this.velocity.y + (this.force.y/this.mass + this.g.y)*dt;
        this.position.x = this.position.x + this.velocity.x*dt;
        this.position.y = this.position.y + this.velocity.y*dt;
        this.force.set(0,0);
      }
      
      display(){
        circle(this.position.x,this.position.y,this.size)
      }
      
      run(dt){
        this.update(dt);
        this.display();
      }
    }
    
    class PhysicsEnvironment{
      constructor(objects){
        this.objects = objects;
        this.dt = 0.1;
      }
      
      boundries(){
        for (let i in this.objects){
          if (this.objects[i].position.x + this.objects[i].size >= width){
            this.objects[i].force.add(new Vector(-this.objects[i].k*(this.objects[i].position.x + this.objects[i].size - width) - this.objects[i].b*this.objects[i].velocity.x,0))
          }
          
          if (this.objects[i].position.y + this.objects[i].size >=  height){
            this.objects[i].force.add(new Vector(0,-this.objects[i].k*(this.objects[i].position.y + this.objects[i].size - height) - this.objects[i].b*this.objects[i].velocity.y))
          }
          if (this.objects[i].position.x - this.objects[i].size <= 0){
            this.objects[i].force.add(new Vector(-this.objects[i].k*(this.objects[i].position.x - this.objects[i].size) - this.objects[i].b*this.objects[i].velocity.x,0))
          }
          
          if (this.objects[i].position.y - this.objects[i].size <=  0){
            this.objects[i].force.add(new Vector(0,-this.objects[i].k*(this.objects[i].position.y  -this.objects[i].size) - this.objects[i].b*this.objects[i].velocity.y))
          }
        }
        
      }
      
      run(){
        this.boundries();
        this.objects[0].run(0.1);
        this.objects[1].run(0.1);
    
      }
      
    }
    
    
    
    var ball1 = new PhysicsObject();
    var ball2 = new PhysicsObject();
    
    var ballPit = new PhysicsEnvironment([ball1,ball2]);
    
    function setup() {
      createCanvas(800, 800);
      ball1.position.set(100,100);
      ball2.position.set(300,100);
      ball1.velocity.set(100,50);
     
      
    }
    
    function draw() {
      background(0);
      ballPit.run();
    }

    dist(v){
        return this.mag(this.sub(v));
    }
    
    set(x,y){
      this.x = x;
      this.y = y;
    }
    
  
}