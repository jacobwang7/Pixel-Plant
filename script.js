const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//Set the width & height of the canvas to match the viewport dimensions
const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height = window.innerHeight;
//Get access to the sprite sheet
const saplingSpriteSheet = new Image();
saplingSpriteSheet.src = "saplingspritesheet.png";
//saplingSpriteSheet.onload = loadImages;
console.log(saplingSpriteSheet.width);

let spriteWidth = 100;
let spriteHeight = 100;

let srcX = 0;
let srcY = 0;

let frame = 0;
let framesDrawn = 10;

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(saplingSpriteSheet, srcX * spriteWidth, 0, 100, 100, CANVAS_WIDTH/2 - 50, CANVAS_HEIGHT/2 - 50, 100, 100);
    if (frame % framesDrawn == 0) {
        if (srcX < 3) {
            srcX++;
        } else {
            srcX = 0;
        } 
    }
    frame++;
    requestAnimationFrame(animate);
};
animate();