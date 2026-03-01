import crypto from 'crypto';
// crypto, which is used for cryptographic operations like generating secure keys, hashing passwords, and more.

console.log("Hello JS");

let a = 10;
let b = 20;

// pbkdf -> Password-Based Key Derivation

// sync funciton, block main thread. key generation is a CPU intensive task so try to avoid using sync version of it.
// crypto.pbkdf2Sync("password", "salt", 9000000, 64, "sha512");
crypto.pbkdf2Sync("password", "salt", 500000, 64, "sha512");
console.log("After calling pbkdf2Sync function");

// async function handled by libuv and do not block main thread.
crypto.pbkdf2("password", "salt", 500000, 64, "sha512", (err, derivedKey) => {
    /**
     * here salt is a random string that is used to make the derived key unique. it is used to prevent rainbow table attacks.
     * though i have used a static string here, in real world applications, we should use a random string as salt for each password. we can use crypto.randomBytes() to generate a random salt.
     * 
     * const salt = crypto.randomBytes(16).toString('hex');
     */
    if (err) {
        console.log("Error: ", err);
    } else {
        console.log("Derived key: ", derivedKey.toString("hex"));
    }
});

function sum(a, b) {
    return a + b;
}

let result = sum(a, b);
console.log("The sum of a and b is: " + result);