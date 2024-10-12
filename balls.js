var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }


    dist(v) {
        return this.mag(this.sub(v));
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    setMag(l) {
        let x = this.x / this.mag;
        let y = this.y / this.mag;
        x = this.x * l;
        y = this.y * l;
        return new Vector(x, y);
    }


}

class PhysicsObject {
    constructor() {
        this.position = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.force = new Vector(0, 0);
        this.mass = 1;
        this.size = 100;
        this.g = new Vector(0, 0)
        this.k = 100;
        this.b = 100;
    }

    collision(object) {
        var v = this.position.sub(object.position);
        let l = v.mag();
        let r = this.size / 2 + object.size / 2;
        if (l == 0) {
            this.position = this.position.add(new Vector(Math.random() * 10, Math.random() * 10))
        }
        if (l < r) {
            let k = 100;
            let b = 100;

            this.force = this.force.add(new Vector(v.x / this.size * k - b * this.velocity.x, v.y / this.size * k - b * this.velocity.y))
        }
    }


    update(dt) {
        this.mass = 100;
        this.force.x += -this.velocity.x*0.1;
        this.force.y += -this.velocity.y*0.1
        this.velocity.x = this.velocity.x + (this.force.x / this.mass + this.g.x) * dt;
        this.velocity.y = this.velocity.y + (this.force.y / this.mass + this.g.y) * dt;
        this.position.x = this.position.x + this.velocity.x * dt;
        this.position.y = this.position.y + this.velocity.y * dt;
        this.force.set(0, 0);
    }

    display() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size/2, 0, 2 * Math.PI, false);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.fill();
    }

    run(dt) {
        this.update(dt);
        this.display();
    }
}

class PhysicsEnvironment {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.objects = [];
        this.dt = 1;
    }

    addObjects(objects) {
        this.objects = objects;
    }

    boundries() {
        var Fx = 0;
        var Fy = 0;
        for (let i in this.objects) {
            Fx = 0;
            Fy = 0;
            if (this.objects[i].position.x + this.objects[i].size / 2 > this.width - 100) {
                Fx += -this.objects[i].k * (this.objects[i].position.x + this.objects[i].size / 2 - this.width + 100) - this.objects[i].b * this.objects[i].velocity.x;
            }
            if (this.objects[i].position.y + this.objects[i].size / 2 > this.height - 100) {
                Fy += -this.objects[i].k * (this.objects[i].position.y + this.objects[i].size / 2 - this.height + 100) - this.objects[i].b * this.objects[i].velocity.y;
            }
            if (this.objects[i].position.x - this.objects[i].size / 2 < 100) {
                Fx += -this.objects[i].k * (this.objects[i].position.x - this.objects[i].size / 2 - 100) - this.objects[i].b * this.objects[i].velocity.x;
            }

            if (this.objects[i].position.y - this.objects[i].size / 2 < 100) {
                Fy += -this.objects[i].k * (this.objects[i].position.y - this.objects[i].size / 2 - 100) - this.objects[i].b * this.objects[i].velocity.y;
            }
            var F = new Vector(Fx, Fy)
            this.objects[i].force = this.objects[i].force.add(F);
        }
    }

    collisions() {
        for (let i in this.objects) {
            for (let j in this.objects) {
                if (i != j) {
                    this.objects[i].collision(this.objects[j]);
                }
            }
        }
    }

    run() {
        this.boundries();
        this.collisions();
        for (let object in this.objects) {
            this.objects[object].run(this.dt);
        }

    }
}

const ballPit = new PhysicsEnvironment(canvas.width, canvas.height);
const balls = [];


function init() {

    for (let i = 0; i < 20; i++) {
        balls.push(new PhysicsObject());
    }

    for (let ball in balls) {
        balls[ball].size = (Math.random() + 0.1) * 100;
        balls[ball].position.x = Math.random() * (ballPit.width - 200) + 100;
        balls[ball].position.y = Math.random() * (ballPit.height - 200) + 100;
        balls[ball].velocity.x = (Math.random() - 0.5);
        balls[ball].velocity.y = (Math.random() - 0.5);
    }

    ballPit.addObjects(balls)
    window.requestAnimationFrame(draw);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ballPit.run();
    window.requestAnimationFrame(draw);
}

init();


