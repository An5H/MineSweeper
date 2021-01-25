var grid;
var rows;
var cols;
var w = 20;
var totalBees = 10;

function make2DArray(rows, cols){
    var arr = new Array(cols);
    for(var i = 0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

function setup() {
    createCanvas(200, 200);
    cols = floor(width/w);
    rows = floor(height/w);
    grid = make2DArray(cols, rows);

    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j] = new Cell(i, j, w);
        }
    }  
    
    //pick totalBees spots

    var options = [];
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            options.push([i, j]);
        }
    }

    for(var i = 0; i < totalBees; i++){
        var index = floor(random(options.length));
        var choice = options[index];
        var x = choice[0];
        var y = choice[1];
        grid[x][y].bee = true;
        //Deletes the spots so that it's no longer an option
        options.splice(index, 1);
    }

    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j].countBees();
        }
    }
}

function gameOver(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            grid[i][j].reveal();
        }
    }
    console.log('Game Over!');
}

function mousePressed() {
    background(255);
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            if(grid[i][j].contains(mouseX, mouseY)){
                grid[i][j].reveal();
                if(grid[i][j].bee){
                    gameOver();
                }
            }
        }
    }
}

function draw() {
    background(255);
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j].show();
        }
    }
}