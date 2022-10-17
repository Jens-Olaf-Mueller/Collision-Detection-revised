class Rect {
    X;
    Y;
    offsetY = 0;
    offsetX = 0;
    color;
    lineWeight;
    width;
    height;
    get halfHeight() {return this.height / 2;}
    get halfWidth() {return this.width / 2;}
    get centerX() {return this.X + this.width / 2;}
    get centerY() {return this.Y + (this.height + this.offsetY) / 2;}

    get top() {return this.Y + this.offsetY;}
    get left() {return this.X;}
    get bottom() {return this.Y + this.height;}
    get right() {return this.X + this.width;}

    constructor (px, py, width, height) {
        this.X = px;
        this.Y = py;
        this.width = width;
        this.height = height;
    }
}

class Enemy extends Rect{
    constructor (px, py, width, height, line, color = 'red') {
        super(px, py, width, height);
        this.color = color;
        this.lineWeight = line;
    }
}

class Player extends Rect {    
    constructor (px, py, width, height, line, color, offset = 0) {
        super(px, py, width, height);
        this.color = color;
        this.lineWeight = line;
        this.offsetY = offset;
    }
}