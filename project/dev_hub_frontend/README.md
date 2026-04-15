# DevHub Frontend

A modern frontend application built with React, featuring authentication, real-time chat, and user connection management.

This project focuses on building scalable UI architecture and integrating with backend APIs.

## Features
- User authentication
- Profile management
- Send and manage connection requests
- View connection list
- Real-time chat with connected users

## Tools & Technologies
- JavaScript
- React.js
- Redux Toolkit
- Tailwind CSS
- Axios
- Socket.io (client)

## Libraries
- "@reduxjs/toolkit": "^2.11.2",
- "@tailwindcss/vite": "^4.2.2",
- "axios": "^1.14.0",
- "react": "^19.2.4",
- "react-dom": "^19.2.4",
- "react-redux": "^9.2.0",
- "react-router": "^7.14.0",
- "socket.io-client": "^4.8.3",
- "tailwindcss": "^4.2.2"

## Project structure
```
.
├── App.jsx
├── components
│   ├── Body.jsx
│   ├── Chat.jsx
│   ├── Connections.jsx
│   ├── EditProfile.jsx
│   ├── Feed.jsx
│   ├── Footer.jsx
│   ├── Login.jsx
│   ├── NavBar.jsx
│   ├── Profile.jsx
│   ├── Request.jsx
│   └── UserCard.jsx
├── index.css
├── main.jsx
└── utils
    ├── appStore.js
    ├── connectionSlice.js
    ├── constants.js
    ├── feedSlice.js
    ├── requestSlice.js
    ├── socket.js
    └── userSlice.js
```

## Routing
This project uses React Router for navigation between pages such as:
- Login
- Profile
- Feed
- Connections
- Chat

## Installation

1. this frontend depends on the DevHub backend API. setup backend first by following [instruction](../dev_hub_backend/README.md) to run this project. make sure the backend server is running before starting the frontend.
2. navigate to the project directory:
```
cd Node.js-Learning/project/dev_hub_frontend
```
3. install dependencies:
```
npm install
```
4. run the project:
```
npm run dev
```

## Project Overview:

<figure>
<table border="0">
  <tr>
    <td width="45%">
      <img src="../../screenshots/1.1.login.png" width="100%" alt="login"/>
    </td>
    <td width="10%"></td> <!-- This creates the "space between" -->
    <td width="45%">
      <img src="../../screenshots/1.2.signup.png" width="100%" alt="signup"/>
    </td>
  </tr>
</table>
  <figcaption align="center">
    <i>Only registered user can use the app.</i>
  </figcaption>
</figure>

<br><br>
<img src="../../screenshots/2.feed.png" width="45%"  alt="feed"/>
- User can see other users in feed and can show interest for connection or ignore profile.

<br><br>
<img src="../../screenshots/3.profile.png" width="45%"  alt="profile"/>
- User can check own profile.

<br><br>
<figure>
  <table border="0">
    <tr>
      <td width="30%"><img src="../../screenshots/4.1.connections.png" width="100%" alt="connection list"/></td>
      <td width="3%"></td>
      <td width="30%"><img src="../../screenshots/4.2.request.png" width="100%" alt="request list"></td>
      <td width="3%"></td>
      <td width="30%"><img src="../../screenshots/5.chat.png" width="100%" alt="chat"></td>
    </tr>
  </table>
  <figcaption align="center">
    <i>Users can check their connection list, manage requests, and chat with connected users.</i>
  </figcaption>
</figure>


## Support

If you find this project useful, consider giving it a star.

For feedback or suggestions:
Email: taufiqneloy.swe@gmail.com