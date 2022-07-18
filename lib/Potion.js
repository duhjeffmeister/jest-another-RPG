// This is a constructor, used to initialize objects similarly to a blueprint. Since
// there is not a return statement, they return undefined by default. They are meant
// to be used in conjunction with the "new" keyword.

class Potion {
    // Constructor() is necessary here because we want to be able to supply an argument
    // to the class (e.g. new Potion('Health')). If the class wasn't intended to receive
    // arguments, the constructor() could be omitted.
    constructor(name) {
        this.types = ["strength", "agility", "health"];
        this.name =
        name || this.types[Math.floor(Math.random() * this.types.length)];

        if (this.name === "health") {
        this.value = Math.floor(Math.random() * 10 + 30);
        } else {
        this.value = Math.floor(Math.random() * 5 + 7);
        }
    }
}

// Exports the Potion() constructor for use in our tests or as a module.
module.exports = Potion;