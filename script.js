const KEY_RIGHT = 39,
      KEY_LEFT  = 37,
      KEY_UP    = 38,
      KEY_DOWN  = 40;
const STATUSBAR = document.getElementById('divStatusbar');

let enemy,
    player, 
    playerColor = 'green',
    enemyColor = 'red',
    keyStates = [],
    ctx;

// better checking if player is OUTSIDE the rectangle:
// https://www.youtube.com/watch?v=hNV-xEMALr8
//
function isColliding(player, obj) {
    if (player.top > obj.bottom || 
        player.right < obj.left || 
        player.bottom < obj.top ||
        player.left > obj.right) return false;
    return true
}

function handleCollision() {
    if (isColliding(player, enemy)) {        
        // Calculate the distance between centers
        let diffX = player.centerX - enemy.centerX,
            diffY = player.centerY - enemy.centerY;
        // Calculate the minimum distance to separate along X and Y
        let minDistX = player.halfWidth + enemy.halfWidth,
            minDistY = player.halfHeight + enemy.halfHeight;    
        // Calculate the depth of collision for both the X and Y axis
        let depthX = diffX > 0 ? minDistX - diffX : -minDistX - diffX,
            depthY = diffY > 0 ? minDistY - diffY : -minDistY - diffY;
    
        // having the depth, pick the smaller depth and move along that axis
        if (depthX != 0 && depthY != 0) {
            // Collision along the X-axis...
            if (Math.abs(depthX) < Math.abs(depthY)) {                
                if (depthX > 0) return 'left';
                return 'right';
            // Collision along the Y-axis...    
            } else { 
                if (depthY > 0) return 'top';
                return 'bottom';
            }
        } else  {      
            return 'contact';
        }
    } else {
        return null;
    }
}
  
/**
 * move the player, if there is no collision * 
 * @param {number} step amount of pixels for moving direction
 */
function move(step = 2) {
    let direction = handleCollision();
    // move right
    if (keyStates[KEY_RIGHT]) {
        if (direction != 'right') player.X += step; 
        if (player.X + player.width > canvas.width) player.X = canvas.width - player.width;
    }    
    // move left
    if (keyStates[KEY_LEFT]) {
        if (direction != 'left') player.X -= step;
        if (player.X < 0) player.X = 0;
    } 
    // move up
    if (keyStates[KEY_UP]) {
        if (direction != 'top') player.Y -= step; 
        if (player.Y < 0) player.Y = 0;
    } 
    // move down
    if (keyStates[KEY_DOWN]) {
        if (direction != 'bottom') player.Y += step; 
        if (player.Y + player.height > canvas.height) player.Y = canvas.height - player.height;
    } 
    updateStatus();
}

function updateStatus() {
    STATUSBAR.innerHTML = `
    Player Y: ${player.Y} | 
           top: ${player.top} | 
           left: ${player.X} | 
           bottom: ${player.bottom} | 
           right: ${player.right} | 
           cX: ${player.centerX} .cY: ${player.centerY}<br><br>
    Enemy  Y:  ${enemy.Y} | 
           top: ${enemy.top} |
           left: ${enemy.X} | 
           bottom: ${enemy.bottom} | 
           right: ${enemy.right} <br>
          `;
}

function draw(obj, clear = true) {
    if (clear) ctx.clearRect(0, 0, canvas.width, canvas.height);        
    ctx.strokeStyle = obj.color;
    if (obj.offsetY > 0) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.rect(obj.X, obj.Y, obj.width, obj.height);
        ctx.stroke();
    }  
    ctx.beginPath();
    ctx.lineWidth = obj.lineWeight;
    ctx.setLineDash([]);    
    ctx.rect(obj.X, obj.Y + obj.offsetY, obj.width, obj.height - obj.offsetY);
    ctx.stroke();
}

// draw the line between the center points of the rectangles
function drawVector(player, obj) {
    ctx.beginPath();
    ctx.moveTo(obj.centerX, obj.centerY);
    ctx.lineTo(player.centerX, player.centerY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "navy";
    ctx.stroke();
}


function run () {
    player = undefined;
    enemy = undefined;
    player = new Player(150, 300, +plrWidth.value, +plrHeight.value, 
                        +plrLine.value, playerColor, +plrOffSet.value);
    enemy = new Enemy(200, 200, +enmWidth.value, +enmHeight.value, +enmLine.value, enemyColor),
    main();
}

  
function main() {
    move(+plrSpeed.value);
    draw(player);
    draw(enemy, false);
    drawVector(player, enemy);
    output.innerHTML = handleCollision() + ' collision';
    window.requestAnimationFrame(main);
}

ctx = canvas.getContext('2d');  