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

// Creates a new test that verifies that a player's attack value is within range. Since
// randomness is hard to test we don't opt to check for any number; specificity will give
// the test more value and actionable feedback.
test("gets player's attack value", () => {
  const player = new Player("Dave");
  player.strength = 10;

  expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
  expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

// Checks that a Potion was added correctly.
test("adds a potion to the inventory", () => {
  const player = new Player("Dave");
  const oldCount = player.inventory.length;

  player.addPotion(new Potion());

  expect(player.inventory.length).toBeGreaterThan(oldCount);
});

// Checks that when a Player drinks a Potion, the potion is removed from their inventory
// and their stats are adjusted accordingly. Uses the index of Potion to keep track of which
// one has been selected. Keeps track of the old inventory length so that we can make sure
// the length decreases and doesn't go to 0.
test("uses a potion from inventory", () => {
  const player = new Player("Dave");
  player.inventory = [new Potion(), new Potion(), new Potion()];
  const oldCount = player.inventory.length;

  player.usePotion(1);

  expect(player.inventory.length).toBeLessThan(oldCount);
});