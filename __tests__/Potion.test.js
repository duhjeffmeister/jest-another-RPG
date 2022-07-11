// Brings in the Potion.js for testing. When requiring modules, file extensions are
// not needed.
const Potion = require('../lib/Potion.js');

// Creates a test for Potion.
test('Creates a health potion object', () => {
    // Use the new keyboard to create a new Potion object instead of just a variable
    // because each potion will store more than one property. We use new eery test so
    // that we can test each object in isolation. If we didn't use new for each test
    // then it would keep reusing the same object.
    const potion = new Potion('health');

    // Test that ensures the new Potion object has a name and value based under the
    // assumption that it takes in a string and assigns it to the potion's name.
    expect(potion.name).toBe('health');

    // Here we expect that the value property is created with a Number() constructor, and
    // in this instance we allow the value to be any number, rather than a number in a range
    // so that the test has more flexibility. That way we don't have to test the random
    // number generator hundreds of times.
    expect(potion.value).toEqual(expect.any(Number));
});

// Second test for Potion() 
test("creates a random potion object", () => {
    const potion = new Potion();

    expect(potion.name).toEqual(expect.any(String));
    expect(potion.name.length).toBeGreaterThan(0);
    expect(potion.value).toEqual(expect.any(Number));
});

// To run a test run npm run test. To run individual tests for individual constructors,
// type npm run test Player or whatever constructor name.