import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const port = process.env.PORT;

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:${port}'
};

const outputFile = './swagger-output.json';
const routes = [
  './route/auth.js', 
  './route/profile.js',
  './route/request.js',
  './route/user.js'
];

swaggerAutogen()(outputFile, routes, doc);

// use this code to run on "node src/swagger.js"
// swaggerAutogen()(outputFile, routes, doc).then(() => {
//     import('./app.js');
// });

/**
 * command: node src/swagger.js
 * will generate swagger-output.json file which will be used in app.js to serve the swagger documentation.
 * 
 * to get swagger ui with all the routes and their details, we need to run the above command first. after that we can run the app.js file to see the documentation at http://localhost:port/doc
 * 
 * here, /doc defined in app.js.
 * 
 * after adding new route or updating existing route, we need to run the above command again to update the swagger-output.json file.
 * 
 */