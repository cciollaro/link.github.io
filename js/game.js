
var active_kana = new ActiveKana();
var score = 0;
var paused = true;
var pausedShowing = false;
var firstPass = true;
var difficulty = 1;
var speed = 0.5;
var new_kana_in = 120;


document.getElementById('in').addEventListener('focus', function(){
    paused = false;
});

document.getElementById('in').addEventListener('blur', function(){
   paused = true;
});

function pause(){
    document.getElementById("settings_overlay").style.display = "block";
}

function unpause(){
    document.getElementById("settings_overlay").style.display = "none";
    document.getElementById("in").focus();
}
//for cross-browser compatibility
//is floating around on internet, I forgot where I got this from
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

//fixes stretched out text
//http://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas 
var RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
    return dpr / bsr;
})();

var WIDTH = 980;
var HEIGHT = 640;

var canvas = document.getElementById('game');
canvas.addEventListener("click", function(){
    document.getElementById("in").focus();
});
var ctx = canvas.getContext("2d");
ctx.setTransform(RATIO, 0, 0, RATIO, 0, 0);

function refreshCanvasSize(newWidth, newHeight){
    canvas.width = newWidth * RATIO;
    canvas.height = newHeight * RATIO;
    canvas.style.width = newWidth + "px";
    canvas.style.height = newHeight + "px";
    ctx.fillStyle = '#000000';
    ctx.fillRect(0,   0, newWidth, newHeight);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = "20pt sans-serif";
    
    active_kana.forEach(function(kana){
        kana.x = kana.x / WIDTH * newWidth;
        kana.y = kana.y / HEIGHT * newHeight;
    });
    
    WIDTH = newWidth;
    HEIGHT = newHeight;
}
refreshCanvasSize(WIDTH,HEIGHT);

function redrawScore(){
    document.getElementById('score').innerText = 'Score: ' + score;
}

function animate() {
    if(paused) {
        if(!pausedShowing){
                ctx.fillStyle = '#000000'; // set canvas background color
                ctx.fillRect(0,0,WIDTH,HEIGHT);
                ctx.fillStyle = '#FFFFFF'; // set canvas font color
                ctx.fillText("paused", WIDTH/2 - 40, HEIGHT/2);
        }
        requestAnimFrame(animate);
        return;
    }

    if(firstPass){
        active_kana.add(new Kana());
        firstPass = false;
    }

    // update
    new_kana_in--;
    if(new_kana_in <= 0){
        active_kana.add(new Kana());
        new_kana_in = 120 - difficulty*8;
    }

    active_kana.forEach(function(kana){
        if(kana.y > HEIGHT){
            active_kana.remove(kana);
            score--;
            redrawScore();
        } else {
            kana.y += .5 + difficulty/10;
        }
    });

    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle   = '#000000'; // set canvas background color
    ctx.fillRect  (0,   0, WIDTH, HEIGHT);
    ctx.fillStyle   = '#FFFFFF'; // set canvas font color

    // draw stuff
    active_kana.forEach(function(kana){
        ctx.fillText(kana.hiragana, kana.x, kana.y);
    });

    // request new frame
    requestAnimFrame(animate);
}
animate();

//when you type into the input
document.getElementById('in').addEventListener('keyup', function(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code === 27){ //esc
            this.blur();
    } else if(code === 13){ //enter
            this.value = "";
    } else {
        var val = this.value;
        var playedSound = false;
        var gotOne = false;
        active_kana.forEach(function(kana){
            if(kana.english === val){
                if(!playedSound){
                    if(playSounds) {sounds[val].play();}
                    playedSound = true;
                }
                active_kana.remove(kana);
                gotOne = true;
            }
        });
        if(gotOne){
            this.value = "";
            score++;
            redrawScore();
        }
     }   
});
