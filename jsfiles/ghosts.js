const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

import { maze } from './maze.js';

import { fireman } from './movement.js'; // Import the fireman object from movement.js
const tilesize = Math.min(canvas.width / maze[0].length, canvas.height / maze.length);
// Ghost configurations
const ghostObject = {
    height: tilesize,
    width: 30,
    speed: 2,
    currentDirection: null,  // Store the current direction
    framesToChangeDirection: 0, 
};

// Initialize ghosts in the middle of the canvas
const pinky = Object.create(ghostObject);
pinky.x = 32*29; // Center x
pinky.y = tilesize; // Center y
const pinkyimg = new Image();
pinkyimg.src = './images/ghost1.png';

const inky = Object.create(ghostObject);
inky.x = 32*10; // Center x
inky.y = tilesize*2; // Center y
const inkyimg = new Image();
inkyimg.src = './images/ghost3.png';

const clyde = Object.create(ghostObject);
clyde.x = canvas.width / 2; // Center x
clyde.y = canvas.height / 2; // Center y
const clydeimg = new Image();
clydeimg.src = './images/ghost4.png';

// Function to get a random direction
function getRandomDirection() {
    const directions = ["up", "down", "left", "right"];
    return directions[Math.floor(Math.random() * directions.length)];
}

// Move ghosts randomly
function moveGhostRandomly(ghost) {
    if (ghost.framesToChangeDirection <= 0) {
        // When the counter reaches zero, choose a new random direction
        ghost.framesToChangeDirection = Math.floor(Math.random() * 60) + 30;
        ghost.currentDirection = getRandomDirection();
    } else {
        ghost.framesToChangeDirection--; // Decrease the counter each frame
    }
    moveGhost(ghost, ghost.currentDirection);
}

// Check if the ghost can move to a given position
function canMoveTo(x, y,ghost) {
    
    const tileX1 = Math.floor(x / 32);
    const tileY1 = Math.floor(y / tilesize);
    const tileX2 = Math.floor((x + ghost.width - 1) / 32);
    const tileY2 = Math.floor((y + ghost.height - 1) / tilesize);

    // Check all tiles that the object covers
    for (let tx = tileX1; tx <= tileX2; tx++) {
        for (let ty = tileY1; ty <= tileY2; ty++) {
            if (ty >= 0 && ty < maze.length && tx >= 0 && tx < maze[0].length) {
                if (maze[ty][tx] === 1) {
                    return 1; // Collision with wall
                }
            }
        }
    }
    return 0; 
}


// Move ghosts in a specified direction
function moveGhost(ghost, direction) {
    let newX = ghost.x;
    let newY = ghost.y;

    // Move the ghost in the specified direction
    switch (direction) {
        case "up": newY -= ghost.speed; break;
        case "down": newY += ghost.speed; break;
        case "left": newX -= ghost.speed; break;
        case "right": newX += ghost.speed; break;
    }

    // Check if the ghost can move to the new position (no walls or other ghosts)
    if (canMoveTo(newX, newY, ghost)===0 ){//&& !isOccupiedByGhost(newX, newY)) {
        ghost.x = newX;
        ghost.y = newY;
    }
}

function checkCollision(ghost) {
    return (
        fireman.x < ghost.x + ghost.width &&
        fireman.x + fireman.width > ghost.x &&
        fireman.y < ghost.y + ghost.height &&
        fireman.y + fireman.height > ghost.y
    );
}

// Function to check collisions with all ghosts
function checkCollisions() {
    const ghosts = [pinky, inky, clyde];
    
    for (let ghost of ghosts) {
        if (checkCollision(ghost)) {
            localStorage.setItem('gameScore', score);
            window.location.href = 'exitpage.html';
            return; // Trigger game over if collision is detected
        }
    }
}
// Calculate direction towards a target
function getDirectionTowards(targetX, targetY, currentX, currentY) {
    if (Math.abs(targetX - currentX) > Math.abs(targetY - currentY)) {
        return targetX > currentX ? "right" : "left";
    } else {
        return targetY > currentY ? "down" : "up";
    }
}


// Draw ghosts on the canvas
function drawGhosts() {
    ctx.drawImage(pinkyimg, pinky.x, pinky.y, pinky.width, pinky.height);
    ctx.drawImage(inkyimg, inky.x, inky.y, inky.width, inky.height);
    ctx.drawImage(clydeimg, clyde.x, clyde.y, clyde.width, clyde.height);
}

// Update ghost positions and draw them
function updateGhosts() {
    moveGhostRandomly(pinky); // Pinky moves randomly
    moveGhostRandomly(inky); // Inky moves randomly
    moveGhostRandomly(clyde); // Clyde moves randomly
    drawGhosts();  // Draw ghosts on canvas
    checkCollisions();
    window.requestAnimationFrame(updateGhosts);
}

// Ensure all images are loaded before starting the game loop
Promise.all([
    new Promise(resolve => pinkyimg.onload = resolve),
    new Promise(resolve => inkyimg.onload = resolve),
    new Promise(resolve => clydeimg.onload = resolve)
]).then(() => {
    console.log("All ghost images are loaded");
    window.requestAnimationFrame(updateGhosts);  // Start the ghost update loop
});

// Export functions and objects for use in other modules
export { updateGhosts };