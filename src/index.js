import './styles/main.css';

import UserInterface from './classes/userInterface';
import Simulator from './classes/simulator';

// nice global variable, holding "simulation" of robot
var sim;

init();

// init function gathers dom elements creates new simulation with them
function init(){
    var output = document.getElementById("output");
    var error = document.getElementById("error");
    var memes= [document.getElementById("memeTop"), document.getElementById("memeRight"), document.getElementById("memeBottom"), document.getElementById("memeLeft")];
    var table =document.getElementById("table");

    sim = new Simulator(new UserInterface(output, error, memes, table));
}

// user input recieved update the simulation
export function newCommand(){
    sim.RunCommand(document.getElementById("robotCommand").value);
}