function Cell(i, j, w){
    this.i = i;
    this.j = j;
    this.x = i*w;
    this.y = j*w;
    this.w = w;
    this.revealed = false;
    this.neighborCount = 0;  
}

Cell.prototype.show = function(){
    stroke(0); 
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if(this.revealed){
        if(this.bee){
            fill(132);
            ellipseMode(CORNER);
            ellipse(this.x + this.w*0.25, this.y+this.w*0.25, this.w*0.5);
        }
        else{
            fill(200);
            rect(this.x, this.y, this.w, this.w);
            if(this.neighborCount > 0){
                textAlign(CENTER);
                fill(0);
                text(this.neighborCount, this.x+this.w*0.5, this.y+this.w*0.75);
            }
        }
    }
}

function isSafe(x, y){
    return (x > -1 && x < cols && y > -1 && y < rows);
}

Cell.prototype.countBees = function(){
    if(this.bee){
        this.neighborCount = -1;
        return;
    }
    var total = 0;

    for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
            if(i !== j){
                var x = this.i + i;
                var y = this.j + j;
                if(isSafe(x, y)){
                    var neighbor = grid[x][y];
                    if(neighbor.bee) total++;
                }
            }
        }
    }
    this.neighborCount = total;
}

Cell.prototype.contains = function(x, y){
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function(){
    this.revealed = true;
    if(this.neighborCount == 0){
        //flood fill
        this.floodFill();
    }
}

Cell.prototype.floodFill = function(){
    for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
            if(i !== j){
                var x = this.i + i;
                var y = this.j + j;
                if(isSafe(x, y)){
                    var neighbor = grid[x][y];
                    if(!neighbor.bee && !neighbor.revealed){
                        neighbor.reveal();
                    }
                }
            }
        }
    }
}