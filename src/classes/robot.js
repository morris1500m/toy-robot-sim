import { direction, GetKeyFromValue  } from './enum';

export default class Robot {
    #tile;  // tile robot is currently on
    #direction; // direction robot is facing
    #name ="Moss";   // every robot needs a name 

    // Return the robots position & heading in user friendly format
    get Report() {return this.#tile.Position.x+","+this.#tile.Position.y+","+GetKeyFromValue(this.#direction, direction);}

    // Check if the robot is correctly placed
    get IsPlaced() {return this.#tile != null && this.#direction != null;}

    get Tile() {return this.#tile;}
    set Tile(tile) {this.#tile= tile;}

    get Direction() {return this.#direction;}
    set Direction(dir) {this.#direction= dir;}

    get Name() {return this.#name;}

    // mutate the table to add the robot
    DrawRobot(table){
        if(!this.IsPlaced) return table;
        // include the edge of the table
        var row = table.rows[table.rows.length-this.#tile.Position.y -2].getElementsByTagName("td");
        var cell = row[this.#tile.Position.x+1];
        cell.innerHTML = this.GetRobotChar();
    }

    // update robot position & orientation
    Place(tile, dir){
        this.#tile= tile;
        this.#direction= dir;
    }

    // get correct character for robot based on direction
    GetRobotChar(){
        switch(this.#direction){
            case direction.NORTH:
                return "^";
            case direction.EAST:
                return ">";    
            case direction.WEST:
                return "<";
            case direction.SOUTH:
                return "∨";        
        }
    }
}