import Position from './position';

// Holds data parsed from user input to place robot
export default class Place{
    position;
    direction;

    constructor(x, y, direction){
        this.position = new Position(x,y);
        this.direction = direction;
    }
}