// Imports the Potion() constructor
const Potion = require('../lib/Potion');

function Player(name = "") {
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    this.inventory = [new Potion("health"), new Potion()];
}

// Returns an object with various player properties, A prototype is better to use than
// this.methodName because this.methodName would generate a ton of getStats() methods. While
// using prototype, you are creating the method once on the constructor itself. New player
// objects simply inherit the method from the constructor rather than having their own instances
// of that method. Such inheritance can traverse multiple levels, meaning if the method being
// called doesn't exists on Player(), JavaScript will look for it on the next constructor up the
// chain. In this case, the next constructor would be the built-in Object data type. Because of the
// chain you can call player.toString() even though toString() wasn't defined anywhere. It was
// inherited from Object two levels up. This is known as the prototype chain. 

// DO NOT use arrow functions in prototype methods. They change what this means, binding this to the 
// parent lexical scope instead of the scope of the method. Under normal conditions, this would 
// self-reference the Player object. Using arrow functions, this now refers to whatever it means in 
// the outer scope. In the case of node.js, the global this is just an empty object {} therefore 
// all these properties become undefined.
Player.prototype.getStats = function () {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility,
    };
};

// Returns the inventory array or false if empty
Player.prototype.getInventory = function () {
    if (this.inventory.length) {
        return this.inventory;
    }
    return false;
};

// Gets Health
Player.prototype.getHealth = function () {
    return `${this.name}'s health is now ${this.health}!`;
};

// Updating the value of Player health halfway through the test so that we can check for both
// conditions true and false,
Player.prototype.isAlive = function () {
    if (this.health === 0) {
        return false;
    }
    return true;
};

// Reduces health; makes sure that the health never goes negative.
Player.prototype.reduceHealth = function (health) {
    this.health -= health;

    if (this.health < 0) {
        this.health = 0;
    }
};

module.exports = Player;