import Place from './place';

import { MapStringToEnum, commands, direction } from './enum';
import { isNumeric } from './helper';
import { SIZE } from './constants';

// Class responsible for parsing user input string
export default class RobotCommand {
    #input; // user input string
    #command;   // command parsed from input
    #place; // data for placing robot is command is PLACE
    #error=[];  // array of errors to show user

    get Command() {return this.#command;}
    get Place() {return this.#place;}
    get Error() {return this.#error;}

    constructor(input) {
        this.#input = input;
        this.ParseCommand();
    }

    // Check that input is an int & in the range of the tiles
    CheckInput(input, dimension){
        if(!isNumeric(input)){
            this.#error.push(dimension +" needs to be a positive whole number");
        }else if(parseInt(input) >= SIZE){ // yes, this shouldn't be hard coded
            this.#error.push(dimension +" needs to be in range [0-4]");
        }
    }

    ParseCommand(){
        // split command on space
        var res = this.#input.split(" ");   
        // map first word to command
        this.#command = MapStringToEnum(res[0], commands); 
        // if command won't parse add to error array  
        this.#command === null ? this.#error.push("Invalid Command"):undefined; 

        // if command is place get place data
        if(this.#command == commands.PLACE){
            // Split on comma
            var param =res[1].split(",");

            // extract out data 
            var x = param[0];
            var y = param[1];
            var dir = MapStringToEnum(param[2], direction);

            // Check if input is valid
            dir === null ? this.#error.push("Invalid direction") : undefined;
            this.CheckInput(x, "X");
            this.CheckInput(y, "Y");

            // Set Place property if no errors
            this.#error.length === 0 ? this.#place = new Place(x, y, dir): this.#place= null;
        }

    }
}