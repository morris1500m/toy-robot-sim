// Class to hold all the dom elements we need to modify
export default class UserInterface{
    Output;
    ErrorLabel;
    Memes = [];
    Table;

    constructor(output, errorLabel, memes, table) {
        this.Output = output;
        this.ErrorLabel = errorLabel;
        this.Memes = memes;
        this.Table = table;
    }

    // Reomove all the old images so we can add a new one
    ClearMemes(){
        this.Memes.forEach(meme => {
            meme.querySelectorAll('*').forEach(n => n.remove());
        });
    }
}