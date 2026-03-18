# URL Shortener Backend

A Node.js/Express backend for the URL Shortener application with JWT authentication and MongoDB.

## Features

- **JWT Authentication**: Secure user authentication with JWT tokens
- **Password Hashing**: Passwords are hashed using bcryptjs
- **URL Shortening**: Generate short unique IDs for long URLs
- **Click Tracking**: Track the number of clicks for each short URL
- **User-specific URLs**: Each user's URLs are stored separately
- **CORS Support**: Frontend can communicate with backend

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or connection string)
- npm

## Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## Environment Setup

The backend uses the following configuration (can be customized):
- **Port**: 3000
- **MongoDB**: mongodb://127.0.0.1:27017/shorturl
- **JWT Secret**: "your_secret_key_change_in_production"

For production, create a `.env` file:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
```

## Running the Backend

Start the development server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## Project Structure

```
backend/
├── connectdb/
│   └── connect.js
├── controller/
│   ├── url.js
│   └── user.js
├── middleware/
│   └── auth.js
├── models/
│   ├── url.js
│   └── user.js
├── routes/
│   ├── url.js
│   └── user.js
├── index.js
├── package.json
└── README.md
```

## API Endpoints

### Authentication Routes

- **POST /user/signup**
  - Body: `{ name, email, password }`
  - Returns: `{ message: "User created successfully" }`

- **POST /user/login**
  - Body: `{ email, password }`
  - Returns: `{ message, token, user: { id, name, email } }`

### URL Routes

- **POST /url** (Protected)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ url: "https://example.com/very-long-url" }`
  - Returns: `{ id: "shortId" }`

- **GET /url/user/urls** (Protected)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ urls: [...] }`

- **GET /url/:id**
  - Redirects to original URL
  - Updates click count

- **GET /url/all**
  - Returns HTML page with all shortened URLs

## Authentication

This backend uses JWT (JSON Web Tokens) for authentication:

1. User signs up/logs in
2. Backend generates a JWT token (valid for 7 days)
3. Frontend stores token in localStorage
4. Frontend includes token in Authorization header: `Bearer <token>`
5. Backend validates token for protected routes

## Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  timestamps: true
}
```

### URL
```javascript
{
  shortid: String (unique),
  redirecturl: String,
  userId: ObjectId (reference to User),
  totalclicks: Number,
  timestamps: true
}
```

## Security Features

- Passwords are hashed using bcryptjs with salt rounds: 10
- JWT tokens expire after 7 days
- CORS is enabled for frontend communication
- Protected routes require valid JWT token
- Each user can only see their own URLs

## Troubleshooting

**MongoDB Connection Error**
- Make sure MongoDB is running: `mongod`
- Check connection string in code or .env file

**Port 3000 Already in Use**
- Change PORT in .env file or code
- Or kill the process using port 3000

**JWT Token Issues**
- Clear localStorage on frontend
- Login again to get new token
- Check JWT_SECRET is same on backend

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT token generation
- **bcryptjs**: Password hashing
- **cors**: Cross-Origin Resource Sharing
- **shortid**: Unique short ID generation
- **nodemon**: Development server with auto-reload
