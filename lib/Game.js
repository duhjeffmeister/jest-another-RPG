// The Game object won't interface directly with the Potion object; that is
// something only the Player and Enemy objects need to know about. However, 
// the Game object will certainly need access to Player and Enemy for the game
// logic to work. We will need Inquirer since we are accepting user input as well.
const inquirer = require("inquirer");
const Enemy = require("./Enemy");
const Player = require("./Player");

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

Game.prototype.initializeGame = function () {
    // Populate the Enemies array
    this.enemies.push(new Enemy("goblin", "sword"));
    this.enemies.push(new Enemy("orc", "baseball bat"));
    this.enemies.push(new Enemy("skeleton", "axe"));

    // Keeps track of which Enemy object is currently fighting the Player. When
    // the game starts this should be the first object in the array.
    this.currentEnemy = this.enemies[0];

    // Prompts the user for their name, which will become Player name.
    inquirer
        .prompt({
        type: "text",
        name: "name",
        message: "What is your name?",
        })
        // destructure name from the prompt object
        .then(({ name }) => {
        this.player = new Player(name);

        // test the object creation
        console.log(this.currentEnemy, this.player);
        });
};

module.exports = Game;
