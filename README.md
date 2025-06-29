
# ZCoder - Collaborative Coding & Problem-Solving Platform

ZCoder is a full-stack web application that allows users to practice coding problems, post and view solutions, bookmark problems, track their progress, and collaborate in real-time rooms using Socket.IO. It supports authentication, user profiles, solution sharing, and live messaging features.


## Project Previews

### Home Page

![Home Page 1](./Screenshots/Home1.png)


![Home Page 2](./Screenshots/Home2.png)


![Home Page 3](./Screenshots/Home3.png)



## Singup and Login

![Signup](./Screenshots/Auth1.png)


![OTP verify](./Screenshots/Auth2.png)


![OTP email](./Screenshots/OTP1.png)


![Login](./Screenshots/Auth3.png)


![Welcome email](./Screenshots/OTP2.png)


### Profile Dashboard

![Dashboard1](./Screenshots/Profile1.png)





### Contest Page

![Contest Page](./Screenshots/Contests.png)


### Rooms Page

![Rooms Page1](./Screenshots/Rooms1.png)


![Rooms Page2](./Screenshots/Rooms2.png)


### Problems Page

![Problems Page 1](./Screenshots/Problems1.png)


![Problems Page 2](./Screenshots/Problems2.png)


![Problems Page 3](./Screenshots/Problems3.png)


### Solutions

![Solutions 1](./Screenshots/Solutions1.png)


![Solutions 2](./Screenshots/Solutions2.png)


![Solutions 3](./Screenshots/Solutions3.png)


## Tech Stack

### Frontend
- React.js (Vite)
- React Router
- Socket.IO Client
- CSS
- React-Toastify

### Backend
- Node.js + Express.js
- MongoDB (Atlas) + Mongoose
- Socket.IO Server
- Nodemailer to send emails
- JWT Authentication
- Cloudinary API to store profile pics of users
- Clist API to get data of upcomming contests

## Features

### User System
- Signup/Login with JWT auth
- Email verification using OTP
- Profile page with avatar, bio, and stats
- View other users’ profiles

### Problems
- View problem list with filters (difficulty, topic, solved/unsolved)
- Track solved problems via local storage
- Bookmark problems

### Solutions
- Post solution with code editor (supports C++, Java, Python, JS)
- Display solutions by language and approach
- Edit/Delete own solutions

### Rooms (Real-time Chat)
- Create/join rooms based on room IDs
- Real-time messaging via Socket.IO
- Store recent 24 hour messages in MongoDB



## Getting Started Locally

### Prerequisites
- Node.js
- MongoDB Atlas account
- Cloudinary API credentials
- Clist API credentials
- Gmail App pass key

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file with:

```
 If you wish to create your own api keys or you can use the keys available
CLIST_USERNAME= your_clist_username
CLIST_API_KEY= your_clist_apikey
PORT = sample_port_of_your_backend 
MONGO_USER = your_mongodb_username
MONGO_PASSWORD = your_mogodb_password
MONGO_URL = your_mongodb_connection_url_you_can_get_it_from_mongodb_atlas
JWT_SECRET= your_server_side_secret_key_for_jwt
GMAIL_USER= your_gmail_to_send_otps
GMAIL_PASS= your_gmail_app_passkey
CLOUDINARY_CLOUD_NAME= your_coludinary_cloud_name_to_store_dp_of_users
CLOUDINARY_API_KEY= your_cloudinary_api_key
CLOUDINARY_API_SECRET= your_cloudinary_api_secret
FRONTEND_URL = your_frontend_base_url 

```

Run backend:

```bash
node server.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## To-Do / Future Improvements
- Authentication via Google OAuth
- Forgot password or password change feature using verification email
- Compile and run code in real-time
- Leaderboards & user analytics



