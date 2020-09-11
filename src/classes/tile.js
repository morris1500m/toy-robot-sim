import Position from './position';

// The Tile class is kind of redundant but will be necessary if adding other elements to the program
// but technically yagni
export default class Tile {
    #position
    get Position() {return this.#position;}

    constructor(posX, posY) {
        this.#position = new Position(posX, posY);
    }
}