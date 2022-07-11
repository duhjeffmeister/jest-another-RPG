// Requires the Player object
const Player = require('../lib/Player');

// Requires the Potion object. If not imported, new Potion() would throw
// an error.
const Potion = require('../lib/Potion');

// This mocks/replaces the constructor's implementation with our faked data.
// Now if new Potion() is ever called within the test file itself or any of
// the the subsequent modules attached to the test, the mocked data will be
// returned.
jest.mock('../lib/Potion');

console.log(new Potion());

// Tests for the existence of name, health, strength, and agility.
test("creates a player object", () => {
  const player = new Player("Dave");

  expect(player.name).toBe("Dave");
  expect(player.health).toEqual(expect.any(Number));
  expect(player.strength).toEqual(expect.any(Number));
  expect(player.agility).toEqual(expect.any(Number));

  // Player's inventory should be an array containing an object.
  expect(player.inventory).toEqual(
    expect.arrayContaining([expect.any(Object)])
  );
});

// Checks that player.getStats() returns an object with four specific properties.
test("gets player's stats as an object", () => {
  const player = new Player("Dave");

  expect(player.getStats()).toHaveProperty("potions");
  expect(player.getStats()).toHaveProperty("health");
  expect(player.getStats()).toHaveProperty("strength");
  expect(player.getStats()).toHaveProperty("agility");
});

// Upon player creation the inventory should already have something in it,
// so a call to player.getInventory() should return an array. Empty inventory
// returns false.
test("gets inventory from player or returns false", () => {
  const player = new Player("Dave");

  expect(player.getInventory()).toEqual(expect.any(Array));

  player.inventory = [];

  expect(player.getInventory()).toEqual(false);
});

// Gets information about the player's health. The expect.stringContaining() method is an
// expect method that we can use to make sure our string includes our player's health. This
// is preferred in this case because we might need flexibility to change how the player's
// health will be displayed. If that change happens, we won't need to update our test as well.
test("gets player's health value", () => {
  const player = new Player("Dave");

  expect(player.getHealth()).toEqual(
    expect.stringContaining(player.health.toString())
  );
});

// Checks if the player is alive
test("checks if player is alive or not", () => {
  const player = new Player("Dave");

  expect(player.isAlive()).toBeTruthy();

  player.health = 0;

  expect(player.isAlive()).toBeFalsy();
});

// Checks to see if the correct amount of health is being subtracted from the Player health
// property. We call the reduceHealth() method twice; the second time has an absurdly high 
// value to make sure that it never goes negative.
test("subtracts from player's health", () => {
  const player = new Player("Dave");
  const oldHealth = player.health;

  player.reduceHealth(5);

  expect(player.health).toBe(oldHealth - 5);

  player.reduceHealth(99999);

  expect(player.health).toBe(0);
});