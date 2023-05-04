// Import the sss library
const sss = require("shamirsecretsharing");

// Create a buffer for the data that will be shared (must be 64 bytes long)
const data = Buffer.alloc(64, 0x42);
const amount = 5;
const theshold = 4;

// Creating 5 shares (need 3 to restore)
let sharesPromise = sss.createShares(data, amount, theshold);

// Write the shares to the screen
sharesPromise.then((x) => {
    console.log(x);
    return x;
});

// For demonstrational purpose, lose one of the shares
let newSharesPromise = sharesPromise.then((x) => {
    return [x[3], x[2], x[4], x[0]];
});

// Restore the original secret
let restoredPromise = newSharesPromise.then((x) => {
    return sss.combineShares(x);
});

// Dump the original secret back to the screen
let main = restoredPromise.then((x) => {
    console.log(x);
}).catch((x) => {
    console.log("Error: " + x);
});
