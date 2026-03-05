import { createServer } from 'http';

// creating server
const server = createServer((request, response) => {
    if (request.url === "/whoIsBoss") {
        response.end("Neloy is the boss");
    } else {
        response.end("Neloy's Server");
    }

});

// setting port
server.listen(7777);