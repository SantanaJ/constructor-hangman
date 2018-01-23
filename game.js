var inquirer = require("inquirer");
var CorrectWord = require("./Word");
var wordbank = require("./words");

function Gameplay() {
    var player = this;

    this.generator = function() {
        this.wordGen();
        this.guessBank = 5;
    };

    this.wordGen = function() {
       var selectWord= wordBank [Math.floor(Math.random()* wordBank.length)];
       this.playWord = new CorrectWord (selectWord);
       this.playerGuess ();
       console.log('n' + this.playWord + 'n');
    };
  

    this.playerGuess = function (){
        this.letterRequest()
        
        .then(function(){
           if  (player.guessBank <1){
               console.log ("You ran out of guesses");
               player.gameRedo();
           }
           else if (player.playWord.correctAnswer()){
               player.guessBank = 5;
               player.wordGen ();
           }
        });
    };

this.letterRequest = function(){
    return inquirer
    .prompt([
        {
            type:"input",
            name:"choice",
            message: "pick a letter",
            validate: function (val){
                return/[a-z1-9]/gi.test(val);
            }
         }
    ])

    .then(function(val){
        var correctGuess = player.playWord.guessLetter(val.choice);
        if(correctGuess){
            console.log("Correct!");
        }
    });
};

    this.gameRedo = function (){
        inquirer
        .prompt([
            {
                type: "confirm",
                name: "choice",
                message: "Let's Start over..."
            }
        ])

        .then (function(val){
            if (val.choice){
                player.start();
            }
        });
    };
}

module.exports = Game;