import { pbkdf2 } from 'crypto';

pbkdf2("password", "salt", 500000, 50, "sha512", (err, derivedKey) => {
    console.log ("1 - pbkdf2 done");
});

pbkdf2("password", "salt", 500000, 50, "sha512", (err, derivedKey) => {
    console.log ("2 - pbkdf2 done");
});

pbkdf2("password", "salt", 500000, 50, "sha512", (err, derivedKey) => {
    console.log ("3 - pbkdf2 done");
});

pbkdf2("password", "salt", 500000, 50, "sha512", (err, derivedKey) => {
    console.log ("4 - pbkdf2 done");
});

pbkdf2("password", "salt", 500000, 50, "sha512", (err, derivedKey) => {
    console.log ("5 - pbkdf2 done");
});

pbkdf2("password", "salt", 500000, 50, "sha512", (err, derivedKey) => {
    console.log ("6 - pbkdf2 done");
});

/**
 * as we know that, thread pool has a default size of 4 threads and crypto operations are executed in the thread pool. so when we run the above code, we can see that the 1st 4 operations are completed at the same time (order may be different) and the 5th and 6th operations are completed after that at the same time.
 * 
 * we can also customize the size of thread pool by following way:
 * run the following command in terminal(powershell) before running the above code: $env:UV_THREADPOOL_SIZE=6
 * after running the above command, we can see that all the 6 operations are completed at the same time.
 * 
 * to reset the thread pool size to default, run the following command in terminal(powershell): Remove-Item Env:UV_THREADPOOL_SIZE
 */