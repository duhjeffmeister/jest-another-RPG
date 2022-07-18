// Imports the Potion() constructor
const Potion = require('../lib/Potion');
const Character = require("./Character");

// Refactored all old prototypes below into this class.
class Player extends Character {
    constructor(name = "") {
        // Call parent constructor here; initializes through super().
        super(name);

        this.inventory = [new Potion("health"), new Potion()];
    }

    getStats() {
        return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility,
        };
    }

    getInventory() {
        if (this.inventory.length) {
        return this.inventory;
        }
        return false;
    }

    addPotion(potion) {
        this.inventory.push(potion);
    }

    usePotion(index) {
        const potion = this.inventory.splice(index, 1)[0];

        switch (potion.name) {
        case "agility":
            this.agility += potion.value;
            break;
        case "health":
            this.health += potion.value;
            break;
        case "strength":
            this.strength += potion.value;
            break;
        }
    }
}

// Inherit prototype methods from Character here:
//Player.prototype = Object.create(Character.prototype);


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
// Player.prototype.getStats = function () {
//     return {
//         potions: this.inventory.length,
//         health: this.health,
//         strength: this.strength,
//         agility: this.agility,
//     };
// };

// Returns the inventory array or false if empty
// Player.prototype.getInventory = function () {
//     if (this.inventory.length) {
//         return this.inventory;
//     }
//     return false;
// };

// // Gets Health
// Player.prototype.getHealth = function () {
//     return `${this.name}'s health is now ${this.health}!`;
// };

// // Updating the value of Player health halfway through the test so that we can check for both
// // conditions true and false,
// Player.prototype.isAlive = function () {
//     if (this.health === 0) {
//         return false;
//     }
//     return true;
// };

// // Reduces health; makes sure that the health never goes negative.
// Player.prototype.reduceHealth = function (health) {
//     this.health -= health;

//     if (this.health < 0) {
//         this.health = 0;
//     }
// };

// // Created the min and max variables in case you decide to increase the range of attacks later
// // on. Allows our Player to attack an enemy.
// Player.prototype.getAttackValue = function () {
//     const min = this.strength - 5;
//     const max = this.strength + 5;

//   return Math.floor(Math.random() * (max - min) + min);
// };

// // Adds a potion to inventory and increases the length of the player.inventory array.
// Player.prototype.addPotion = function (potion) {
//     this.inventory.push(potion);
// };

// // The .splice() method removes items from an array and returns the removed items as a new array.
// // Two things are happening here: the original inventory array has a single Potion removed at the
// // specified index value and put into a new "removed items" array, then the Potion at index [0] of
// // this "removed items" array is saved in a potion variable. Both .push() and .splice() are methods
// // on the Array prototype, meaning that even built in JavaScript data types are constructors themselves.
// Player.prototype.usePotion = function (index) {
//     const potion = this.getInventory().splice(index, 1)[0];

//     switch (potion.name) {
//     case "agility":
//         this.agility += potion.value;
//         break;
//     case "health":
//         this.health += potion.value;
//         break;
//     case "strength":
//         this.strength += potion.value;
//         break;
//     }
// };


module.exports = Player;