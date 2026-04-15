# DevHub Backend

A RESTful API built with Node.js and Express, demonstrating authentication, structured architecture, and API design best practices.

This project is part of my backend learning journey, where I focused on building scalable APIs and understanding core backend concepts.

## Features
- User authentication
- CRUD operations
- Middleware-based architecture
- Error handling
- Real time chat

## Tools & Technologies
- JavaScript
- Node.js
- Express.js
- MongoDB (via Mongoose)

# Libraries
- "bcrypt": "^6.0.0",
- "cookie-parser": "^1.4.7",
- "cors": "^2.8.6",
- "dotenv": "^17.3.1",
- "dotenv-expand": "^12.0.3",
- "express": "^5.2.1",
- "jsonwebtoken": "^9.0.3",
- "mongoose": "^9.3.0",
- "node-cron": "^4.2.1",
- "socket.io": "^4.8.3",
- "swagger-ui-express": "^5.0.1",
- "validator": "^13.15.26"

## Project structure
```
│   app.js
│   app_learning_1.js
│   app_learning_2.js
│   swagger.js
│
├───config
│       database.js
│
├───middleware
│       auth.js
│
├───model
│       chat.js
│       connection_request.js
│       user.js
│
├───route
│       auth.js
│       chat.js
│       profile.js
│       request.js
│       user.js
│
├───utils
│       cron_job.js
│       socket.js
|
└───validator
        validator_fields.js
```

## Installation

To setup node.js:<br>
Follow the [Official guide](https://nodejs.org/en/download). to run the project, there must be installed node.js (v24.14.0) in your system.

To run this project locally, follow these steps:
1. clone the repository:
```
git clone https://github.com/Neloy-SWE/Node.js-Learning.git
```
2. inside *Node.js-Learning/project/dev_hub_backend* folder:
- create **.env** file
- copy all text from **example.env** and paste in **.env**
- replace all example values with real values and credentials.

## Note

This project is part of a larger learning repository.  
If you use it separately, consider adding your own `.gitignore` file to protect sensitive data like `.env`.

3. navigate to the project directory:
```
cd Node.js-Learning/project/dev_hub_backend
```
4. install dependencies:
```
npm install
```
5. if you want to see APIs in swagger, run below command one time (re-run again if you change something in code, especially in request body, params, queries, schemas, etc.):
```
npm run swagger
```
6. run the project:
```
npm run start
```

- To add auto run on save changes, you may install nodemon (in the project or globally) and run:
```
npm run dev
```

## API Endpoints

### Auth

- POST /signup
- POST /login
- POST /logout

### Profile

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/update-password

### Request

- POST /request/send/:status/:toUserId
- POST /request/review/:status/:requestId

### User

- GET /user/pending-requests
- GET /user/connections
- GET /feed

### Chat

- GET /chat/:targetUserId

## Authentication

These APIs uses cookie-based authentication.

- On login, a token is stored in cookies
- The token is automatically sent with subsequent requests
- On logout, the cookie is cleared

when you enter **localhost:<your_port>/doc** in your browser after run the project, you can check all the APIs in swagger with request body, params or queries. it will only work if you run ```npm run swagger``` before run the project.

## Support

If you find this project useful, consider giving it a star.

For feedbacks or suggestions:
Email: taufiqneloy.swe@gmail.com