// The Game object won't interface directly with the Potion object; that is
// something only the Player and Enemy objects need to know about. However, 
// the Game object will certainly need access to Player and Enemy for the game
// logic to work. We will need Inquirer since we are accepting user input as well.
const inquirer = require("inquirer");
const Enemy = require("./Enemy");
const Player = require("./Player");

class Game {
    constructor() {
        this.roundNumber = 0;
        this.isPlayerTurn = false;
        this.enemies = [];
        this.currentEnemy;
        this.player;
    }

    initializeGame() {
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

            this.startNewBattle();
        });
    }

    startNewBattle() {
        if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
        } else {
        this.isPlayerTurn = false;
        }
        console.log("Your stats are as follows:");
        console.table(this.player.getStats());

        console.log(this.currentEnemy.getDescription());

        this.battle();
    }

    battle() {
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
                return this.checkEndOfBattle();
                }

                inquirer
                .prompt({
                    type: "list",
                    message: "Which potion would you like to use?",
                    name: "action",
                    // The .map() callback has a second optional parameter to capture the index
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
                    this.checkEndOfBattle();
                });
            } else {
                // If the user selects attack, we'll reduce the enemy health
                // using the same methods as before.
                const damage = this.player.getAttackValue();
                this.currentEnemy.reduceHealth(damage);

                console.log(`You attacked the ${this.currentEnemy.name}`);
                console.log(this.currentEnemy.getHealth());

                this.checkEndOfBattle();
            }
            });
        } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());

        this.checkEndOfBattle();
        }
    }

    checkEndOfBattle() {
        // Checks to see if both characters are alive and can continue fighting
        if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
        }
        // Checks to see if the player is alive but enemy has been defeated
        else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You've defeated the ${this.currentEnemy.name}`);

        this.player.addPotion(this.currentEnemy.potion);
        console.log(
            `${this.player.name} found a ${this.currentEnemy.potion.name} potion`
        );

        this.roundNumber++;

        if (this.roundNumber < this.enemies.length) {
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        } else {
            console.log("You win!");
        }
        }
        // If the player is dead
        else {
        console.log("You've been defeated!");
        }
    }
}

module.exports = Game;


// Four main concepts of object oriented programming:
// Inheritance: Allows you to reuse properties and methods of an 
// existing class when you create a new class.
// Encapsulation: Objects can privatize some of their data and only
// expose them through public methods like getName().
// Abstraction: Object methods are easy to use without needing to
// understand their complex inner workings. For example, playGame()
// does what you'd expect it to without knowing about the 100 other
// methods it might call internally.
// Polymorphism: Objects (and their methods) can change depending
// on the context. For example, the Car and Plane objects might inherit
// from Vehicle, but their move() methods are very different.