const output = document.getElementById('collisionType'),
      canvas = document.getElementById('canvas'),
      enmColor = document.getElementById('inpEnemy'),
      enmWidth = document.getElementById('inpEnemyWidth'),
      enmHeight = document.getElementById('inpEnemyHeight'),
      enmLine = document.getElementById('inpEnemyLineWidth');

const plrColor = document.getElementById('inpPlayer'),
      plrWidth = document.getElementById('inpPlayerWidth'),
      plrHeight = document.getElementById('inpPlayerHeight'),
      plrLine = document.getElementById('inpPlayerLineWidth'),
      plrSpeed = document.getElementById('inpPlayerSpeed'),
      plrOffSet = document.getElementById('inpPlayerOffset');


/**
 * KEYBOARD - EVENTLISTENERS
 */
 window.onkeydown = function(e) {
    keyStates[e.keyCode] = true
}
  
window.onkeyup = function(e) {
    keyStates[e.keyCode] = false
}

/**
 * PLAYER SETTINGS
 */
plrColor.oninput = function() {
    playerColor = this.value;
};

plrWidth.oninput = function () {
    document.getElementById('outPlayerWidth').innerText = ' ' + this.value;
};

plrHeight.oninput = function () {
    document.getElementById('outPlayerHeight').innerText = ' ' + this.value;
};

plrLine.oninput = function () {
    document.getElementById('outPlayerLineWidth').innerText = ' ' + this.value;
};

plrSpeed.oninput = function () {
    document.getElementById('outPlayerSpeed').innerText = ' ' + this.value;
};

plrOffSet.oninput = function () {
    document.getElementById('outPlayerOffset').innerText = ' ' + this.value;
};


/**
 * ENEMY SETTINGS
 */
enmColor.oninput = function() {
    enemyColor = this.value;
};

enmWidth.oninput = function () {
    document.getElementById('outEnemyWidth').innerText = ' ' + this.value;
};

enmHeight.oninput = function () {
    document.getElementById('outEnemyHeight').innerText = ' ' + this.value;
};

enmLine.oninput = function () {
    document.getElementById('outEnemyLineWidth').innerText = ' ' + this.value;
};