const canvas = document.getElementById('canvas');
if (!canvas) {
    console.error('Canvas element not found');
    
}

let ctx = canvas.getContext('2d');
if (!ctx) {
    console.error('Canvas 2D context not found');
    
}


    export const maze =[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,0,1,1,1,1,0,1,1,0,1,1,1,1,1,0,0,1,1,1,1,0,0,0,1],
    [1,0,1,1,1,1,0,0,1,1,1,1,0,1,1,0,1,1,1,1,1,0,0,1,1,1,1,0,0,0,1],
    [1,0,1,1,1,1,0,0,1,1,1,1,0,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,0,1],
    [1,0,1,1,1,1,0,0,1,1,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,1,1,1,1,1,0,0,0,1,1,0,1],
    [1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1,0,0,1,1,1,1,1,0,0,0,1,1,0,1],
    [1,1,1,1,1,1,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,1,0,1],
    [1,1,1,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1],
    [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1],
    [1,0,0,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1],
    [1,0,0,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,0,0,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,1],
    [1,0,0,1,1,1,0,0,1,1,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1,1,1],
    [1,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
    [1,0,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
    [1,0,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

    const wall=new Image();
    wall.src='./images/wall.png';
    if (!wall) {
        console.error('Canvas 2D context not found');
        
    }
    let imagesLoaded=0;

    const empty=new Image();
    empty.src='./images/empty.png';
    if (!empty) {
        console.error('Canvas 2D context not found');
        
    }

    wall.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === 2) {
            draw(ctx);
        }
    };
    empty.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === 2) {
            draw(ctx);
        }
    };

    function resizeCanvas() {
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        canvas.width = viewportWidth *0.85;
        canvas.height = viewportHeight * 0.85;
    }
    resizeCanvas();

    function generateWalls() {
        walls = [];
        tilesize = Math.min(canvas.width / maze[0].length, canvas.height / maze.length);
        for (let row = 0; row < maze.length; row++) {
            for (let column = 0; column < maze[row].length; column++) {
                if (maze[row][column] === 1) {
                    walls.push({
                        x: column * 32,
                        y: row * tilesize,
                        width: 32,
                        height: tilesize
                    });
                }
            }
        }
    }



    export function draw(ctx){
        let tilesize= Math.min(canvas.width / maze[0].length, canvas.height / maze.length);
                for (let row=0;row<maze.length;row++) {
                    for (let column=0;column<maze[row].length; column++) {
                        const img= maze[row][column] ===1 ? wall : empty;
                        ctx.drawImage(img ,column*32, row*tilesize,32,tilesize);
                    }
                }
    }
    window.addEventListener('resize', () => {
        resizeCanvas();
        if (imagesLoaded === 2) {
            draw(ctx); // Only draw after both images are loaded
        }
    });

    export function getWalls(){
        return walls;
    }
    
    
