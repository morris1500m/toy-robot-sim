import Meme from './meme';
import Table from './table';
import Robot from './robot';
import RobotCommand from './robotCommand';

import { AppendOrReplace } from './helper';
import { commands, TurnLeft, TurnRight, direction } from './enum';


export default class Simulator {
    #table; // holds data that represents our table
    #robot; // our robot
    #userInterface; // dom elements we need to modify
    #meme  
    #deaths=0;

    // create objects and initialise variables, draw table
    constructor(userInterface) {
        this.#table = new Table();
        this.#robot = new Robot();
        this.#userInterface = userInterface;

        this.DrawTable();
        this.#meme= new Meme();
    }

    // Draw table then mutate table to add robot, then add to dom 
    DrawTable(){
        var result = this.#table.GetOutput();
        this.#robot.DrawRobot(result);
        AppendOrReplace(this.#userInterface.Table, result);
    }

    // Clear current memes, get new one & then add to correct dom element based on direction of robot
    DrawMeme(){
        this.#userInterface.ClearMemes();
        var meme = this.#meme.GetImage();
        switch(this.#robot.Direction){
            case direction.NORTH:
                this.#userInterface.Memes[0].appendChild(meme);
            break;
            case direction.EAST:
                this.#userInterface.Memes[1].appendChild(meme);
            break;
            case direction.SOUTH:
                this.#userInterface.Memes[2].appendChild(meme);
            break;
            case direction.WEST:
                this.#userInterface.Memes[3].appendChild(meme);
            break;        
        }
    }

    GetDeathText(){
        if(this.#deaths===0){
            return this.#robot.Name+" fell to his death";
        } else if(this.#deaths===1){
            return "Oh no, "+this.#robot.Name+" died again";
        } else if(this.#deaths< 5){
            return this.#robot.Name+" has died "+ this.#deaths+ " times, please be more careful";
        } else{
            return this.#robot.Name+" has died "+ this.#deaths+ " times, you have been automatically reported to the RSPCR";
        }
    }


    RunCommand(userInput){
        // Parse user input
        var command = new RobotCommand(userInput);

        // set initial user output strings
        var error="";
        var output="";

        if(command.Error.length !== 0) error =command.Error.join(); // if the command has errors show them to the user
        else if(command.Command !== commands.PLACE && !this.#robot.IsPlaced) {  
            // if the robot has not been placed & the user isn't trying to place it warn the user
            error = "Please place "+this.#robot.Name+" on the table, thanks";
        }
        else{
            // otherwise process the command 
            switch(command.Command) {
                case commands.PLACE:
                    // Get the tile the user is trying to move the robot to and update the robot tile
                    var tile = this.#table.GetTile(command.Place?.position);
                    this.#robot.Place(tile, command.Place.direction);
                    output = this.#robot.Name+" placed @: ["+tile.Position.x+", "+tile.Position.y+"]";
                break;
                case commands.REPORT:
                    // Output the robot position to the user
                    output=  this.#robot.Report;
                break;
                case commands.MOVE:
                    // Get the tile the user is attempting to move to
                    var tile = this.#table.GetTileInDirection(this.#robot);
                    if (tile !== null) {    // if the tile exists move the robot
                        this.#robot.Tile = tile; 
                        output = this.#robot.Name+" moved to: ["+tile.Position.x+", "+tile.Position.y+"]";
                    }else{  // otherwise output error & draw meme
                        this.DrawMeme();
                        error=this.GetDeathText();
                        this.#deaths++;
                    }
                break;
                case commands.LEFT:
                    // turn the the robot left
                    this.#robot.Direction = TurnLeft(this.#robot.Direction);
                    output = this.#robot.Name+" turned left";
                break;
                case commands.RIGHT:
                    // turn the the robot right
                    this.#robot.Direction = TurnRight(this.#robot.Direction);
                    output =  this.#robot.Name+" turned right";
                break;
            }
        }
        // update the table and the ui
        this.DrawTable();
        this.#userInterface.ErrorLabel.innerHTML= error;
        this.#userInterface.Output.innerHTML= output;
    }
}