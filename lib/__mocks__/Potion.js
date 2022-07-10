// Mocks allow us to fake assumed data, allowing the test to focus only on
// the logic it cares about. When mocking, jest will always look for a
// matching mock file in the same location as the module being mocked. In
// this case, lib/__mocks__/Potion.js matches with lib/Potion.js.

// A simplified version of the Potion() constructor that was written earlier.
// The mock doesn't incorporate any random logic; it just needs to return values
// that the Player object can later use.

module.exports = function () {
    this.name = "health";
    this.value = 20;
};