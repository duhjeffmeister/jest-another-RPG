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

Game.prototype.battle = function () {
    if (this.isPlayerTurn) {
        // Uses inquirer's list type to display a list of choices where
        // the user must either select attack or use a potion.
        inquirer
            .prompt({
            type: "list",
            message: "What would you like to do?",
            name: "action",
            choices: ["Attack", "Use potion"],
            })
            .then(({ action }) => {
            // If the user selects to use potion, it will require a follow
            // up prompt.
            if (action === "Use potion") {
                if (!this.player.getInventory()) {
                    console.log("You don't have any potions!");
                    return;
                }

                inquirer
                    .prompt({
                        type: "list",
                        message: "Which potion would you like to use?",
                        name: "action",
                        // THe .map() callback has a second optional parameter to capture the index
                        // of the item. We're using that index to create a human readable number for
                        // the user. It adds 1 since most users don't know arrays start at 0.
                        choices: this.player
                        .getInventory()
                        .map((item, index) => `${index + 1}: ${item.name}`),
                    })
                    .then(({ action }) => {
                        const potionDetails = action.split(": ");

                        this.player.usePotion(potionDetails[0] - 1);
                        console.log(`You used a ${potionDetails[1]} potion.`);
                    });
            } else {
                // If the user selects attack, we'll reduce the enemy health
                // using the same methods as before.
                const damage = this.player.getAttackValue();
                this.currentEnemy.reduceHealth(damage);

                console.log(`You attacked the ${this.currentEnemy.name}`);
                console.log(this.currentEnemy.getHealth());
            }
        });
    }
};

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
        // Destructure name from the prompt object
        .then(({ name }) => {
            this.player = new Player(name);

            // Starts the first battle and then called again anytime a new
            // round starts.
            this.startNewBattle();
        });
};

Game.prototype.startNewBattle = function () {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }

    // Displays stats
    console.log("Your stats are as follows:");
    console.table(this.player.getStats());

    console.log(this.currentEnemy.getDescription());

    this.battle();
};

module.exports = Game;
