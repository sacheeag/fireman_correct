console.log("movement.js is loaded");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

import { draw as drawMaze, getWalls as getMazeWalls, maze } from './maze.js';
import { updateGhosts } from './ghosts.js';

// Initialize fireman and gem
const tilesize = Math.min(canvas.width / maze[0].length, canvas.height / maze.length);
console.log(tilesize);
export const fireman = {
    x: 32,
    y: tilesize,
    width:30,
    height: tilesize
};

const gem = {
    x: 50,
    y: 50,
    width: 20,
    height: tilesize
};

let score = 0;
const validPositions = [];

// Load images
const firemanImage = new Image();
firemanImage.src = "images/file.png";

const gemImage = new Image();
gemImage.src = "images/file copy.png";

firemanImage.onload = () => {
    console.log("Fireman image loaded");
    if (gemImage.complete) {
        gameLoop();
    } else {
        gemImage.onload = () => {
            console.log("Gem image loaded");
            gameLoop();
        };
    }
};

// Dynamically resize the canvas
function resizeCanvas() {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    canvas.width = viewportWidth * 0.85;
    canvas.height = viewportHeight * 0.85;
    gem.x = 3 * 32;
    gem.y = 10 * tilesize;
}
resizeCanvas();


// Helper function to compute valid positions for the gem
function computeValidPositions() {
    validPositions.length = 0; // Clear the previous positions
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[0].length; x++) {
            if (maze[y][x] === 0) { // Check if the tile is valid (0 represents no wall)
                const posX = x * 32; // Convert grid x to pixel x
                const posY = y * tilesize; // Convert grid y to pixel y
                validPositions.push({ x: posX, y: posY });
            }
        }
    }
}

// Movement and collision detection
let Xspeed = 0;
let Yspeed = 0;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

// Event listeners for key presses
window.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowUp":
            moveUp = true;
            break;
        case "ArrowDown":
            moveDown = true;
            break;
        case "ArrowLeft":
            moveLeft = true;
            break;
        case "ArrowRight":
            moveRight = true;
            break;
    }
}, false);

window.addEventListener("keyup", function (e) {
    switch (e.key) {
        case "ArrowUp":
            moveUp = false;
            break;
        case "ArrowDown":
            moveDown = false;
            break;
        case "ArrowLeft":
            moveLeft = false;
            break;
        case "ArrowRight":
            moveRight = false;
            break;
    }
}, false);

// Check for collision with walls
function isCollidingWithWall(x, y) {
    const tileX1 = Math.floor(x / 32);
    const tileY1 = Math.floor(y / tilesize);
    const tileX2 = Math.floor((x + fireman.width-1) / 32);
    const tileY2 = Math.floor((y + fireman.height-1) / tilesize);

    for (let tx = tileX1; tx <= tileX2; tx++) {
        for (let ty = tileY1; ty <= tileY2; ty++) {
            if (ty >= 0 && ty < maze.length && tx >= 0 && tx < maze[0].length) {
                if (maze[ty][tx] === 1) {
                    return 1; // Collision with wall
                }
            }
        }
    }
    return 0; // No collision
}

// Update fireman position and check for collisions
function update() {
    window.requestAnimationFrame(update);
    if (moveUp || moveDown) {
        Yspeed = moveUp ? -3 : (moveDown ? 3 : 0);
        Xspeed = 0;
    } else if (moveLeft || moveRight) {
        Xspeed = moveLeft ? -3 : (moveRight ? 3 : 0);
        Yspeed = 0;
    } else {
        Xspeed = 0;
        Yspeed = 0;
    }
    let nextX = fireman.x + Xspeed;
    let nextY = fireman.y + Yspeed;

    if (isCollidingWithWall(nextX, nextY)==0) {
        fireman.x = nextX;
        fireman.y = nextY;
    }

    // Keep fireman inside canvas boundaries
    if (fireman.x < 0) fireman.x = 0;
    if (fireman.y < 0) fireman.y = 0;
    if (fireman.x + fireman.width > canvas.width) fireman.x = canvas.width - fireman.width;
    if (fireman.y + fireman.height > canvas.height) fireman.y = canvas.height - fireman.height;

    // Check for collision with the gem
    if (
        fireman.x < gem.x + gem.width &&
        fireman.x + fireman.width > gem.x &&
        fireman.y < gem.y + gem.height &&
        fireman.y + fireman.height > gem.y
    ) {
        score++;
        console.log("Score: " + score);

        if (score === 3) {
            localStorage.setItem('gameScore', score);
            window.location.href = 'exitpage.html';
            return; // Stop further processing
        }

        computeValidPositions();
        let randomIndex = Math.floor(Math.random() * validPositions.length);
        let newPosition = validPositions[randomIndex];
        gem.x = newPosition.x;
        gem.y = newPosition.y;
    }

    render();
}

// Render function
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze(ctx);
    ctx.drawImage(firemanImage, fireman.x, fireman.y, fireman.width, fireman.height);
    ctx.drawImage(gemImage, gem.x, gem.y, gem.width, gem.height);
    if (scoreElement) {
        scoreElement.textContent = "Score: " + score;
    }
}

// Start game loop
function gameLoop() {
    update();
    updateGhosts();  // Update ghosts from ghost.js
}