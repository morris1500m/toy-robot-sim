import meme1 from '../images/meme1.jpg';
import meme2 from '../images/meme2.jpg';
import meme3 from '../images/meme3.jpg';
import meme4 from '../images/meme4.jpg';
import meme5 from '../images/meme5.jpg';
import meme6 from '../images/meme6.jpg';
import meme7 from '../images/meme7.jpg';
import meme8 from '../images/meme8.jpg';
import meme9 from '../images/meme9.jpg';
import meme10 from '../images/meme10.jpg';
import meme11 from '../images/meme11.jpg';
import meme12 from '../images/meme12.jpg';
import meme13 from '../images/meme13.jpg';
import meme14 from '../images/meme14.jpg';
import meme15 from '../images/meme15.jpg';

// Class to randomly get images without repeating unless we run out
export default class Meme{
    #memesLeft=[];

    constructor() {this.InitMemes();}

    InitMemes(){
        // we have image from meme1-15.jpg, we need an array that only contains ones we haven't used yet
        this.#memesLeft = [meme1, meme2, meme3, meme4, meme5, meme6, meme7, meme8, meme9, meme10, meme11, meme12, meme13, meme14, meme15];
    }

    GetImage(){
        // create image element
        var image = document.createElement("IMG");

        // reset array if we have run out of images
        if(this.#memesLeft.length<=0) this.InitMemes();

        // get random image from array, then remove it from the array so it won't repeat
        var imageIndex = Math.floor(Math.random()*this.#memesLeft.length);
        var randomImage = this.#memesLeft[imageIndex];
        this.#memesLeft.splice(imageIndex, 1);

        // add HTML elements to image
        image.src = randomImage;
        image.alt = "Flat earth meme";
        image.style.height = '200px';
        image.classList.add("memeImage");
        return image;
    }
}