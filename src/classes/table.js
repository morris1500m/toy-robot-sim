import Position from './position';
import Tile from './tile';
import { SIZE } from './constants';
import { direction } from './enum';

// Table holds the array of tiles
export default class Table {
    #tiles= []; // tile array

    constructor() {
        this.SetupTiles();
    }

    // Add tiles to the tile array
    SetupTiles(){
        for(var i = 0; i < SIZE; i++){
            var row = [];
            for(var j = 0; j < SIZE; j++){
                row[j] = new Tile(i, j);
            }
            this.#tiles.push(row);
        }
    }

    // Create table dom element and fill with ascii characters to represent table
    GetOutput(){
        var table = document.createElement("TABLE");
        var tableSize = SIZE+2;    // extra rows & columns to represent table boundaries
        for(var i = 0; i < tableSize; i++){
            var row = table.insertRow(i);
            for(var j = 0; j < tableSize; j++){
                var char;
                // # = boundaries, table tile = .
                (i === 0 || i === tableSize-1 || j === 0 || j === tableSize-1) ? char = "#": char = ".";
                var cell = row.insertCell(j);
                cell.innerHTML = char;
            }
        }
        return table;
    }

    // Check a index is on the table
    CheckRange(value){return value< SIZE && value >= 0? true:false;}

    // Get tile from table based on position
    GetTile(pos){
        if(pos == null) return null;
        return this.CheckRange(pos.x) && this.CheckRange(pos.y)?this.#tiles[pos.x][pos.y] : null;
    }

    // Given a robot return the tile that the robot can move to, if no valid tile return null
    GetTileInDirection(robot){
        if(robot.Tile.Position == null) return;
        switch(robot.Direction) {
            case direction.NORTH:
                return this.GetTile(new Position(robot.Tile.Position.x, robot.Tile.Position.y+1));
            case direction.EAST:
                return this.GetTile(new Position(robot.Tile.Position.x+1, robot.Tile.Position.y));
            case direction.SOUTH:
                return this.GetTile(new Position(robot.Tile.Position.x, robot.Tile.Position.y-1));
            case direction.WEST:
                return this.GetTile(new Position(robot.Tile.Position.x-1, robot.Tile.Position.y));
        }
    }
}