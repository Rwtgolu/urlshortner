# URL Shortener Application

A full-stack URL shortening application with user authentication using JWT tokens, built with React, Node.js/Express, and MongoDB.

## Project Overview

This application allows users to:
- Create an account and log in securely
- Generate short URLs from long ones
- Track click statistics for their short URLs
- Manage all their shortened URLs from a dashboard

## Architecture

```
urlshortner/
├── backend/          (Node.js/Express API)
│   └── Runs on port 3000
└── frontend/         (React SPA)
    └── Runs on port 3000 (via npm start)
```

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (running locally or remote connection)
- **npm** or **yarn**

## Quick Start

### 1. Set Up MongoDB

Make sure MongoDB is running:
```bash
mongod
```

The default connection is `mongodb://127.0.0.1:27017/shorturl`

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Start Backend Server

```bash
npm start
```

Backend will run on `http://localhost:3000`

### 4. Install Frontend Dependencies

Open a new terminal and navigate to frontend:
```bash
cd frontend
npm install
```

### 5. Start Frontend Development Server

```bash
npm start
```

Frontend will automatically open in your browser (usually on `http://localhost:3000`)

## Using the Application

### Sign Up
1. Click "Sign Up" on the homepage
2. Enter your name, email, and password
3. Click "Sign Up"
4. Login with your credentials

### Create Short URLs
1. After logging in, you'll see the Dashboard
2. Enter a long URL in the input field
3. Click "Create" button
4. Your short URL ID will appear with a "Copy" button
5. Click "Copy" to copy the full short URL to clipboard

### View Your URLs
- All your created short URLs appear in the "Your Short URLs" section
- See the number of clicks for each URL
- Copy short URLs with one click

## API Endpoints

### User Management
- `POST /user/signup` - Register new user
- `POST /user/login` - Login and get JWT token

### URL Management
- `POST /url` - Create short URL (requires auth)
- `GET /url/user/urls` - Get user's URLs (requires auth)
- `GET /url/:id` - Redirect to original URL
- `GET /url/all` - View all URLs (admin)

## JWT Authentication Flow

1. **Sign Up/Login**
   ```
   User credentials → Backend → Generate JWT Token → Store in localStorage
   ```

2. **Protected Requests**
   ```
   Frontend Request + JWT Token → Backend validates → Process request
   ```

3. **Token Expiry**
   - Tokens expire after 7 days
   - User must login again for a new token

## Project Structure

### Backend
```
backend/
├── middleware/auth.js          (JWT validation)
├── controller/
│   ├── user.js                (Auth logic)
│   └── url.js                 (URL logic)
├── models/
│   ├── user.js                (User schema)
│   └── url.js                 (URL schema)
├── routes/
│   ├── user.js                (Auth routes)
│   └── url.js                 (URL routes)
├── connectdb/connect.js        (MongoDB connection)
└── index.js                    (Server entry point)
```

### Frontend
```
frontend/
├── public/
│   └── index.html             (HTML entry point)
├── src/
│   ├── pages/
│   │   ├── Login.js           (Login page)
│   │   ├── Signup.js          (Sign up page)
│   │   └── Dashboard.js       (Main app page)
│   ├── components/
│   │   └── Navbar.js          (Navigation)
│   ├── App.js                 (Main routing)
│   ├── api.js                 (API calls)
│   ├── index.js               (React entry point)
│   └── index.css              (Styling)
└── package.json
```

## Key Features

### Security
-  Password hashing with bcryptjs
-  JWT token-based authentication
-  Protected API routes
-  CORS enabled

### User Experience
-  Responsive design (desktop & mobile)
-  Real-time URL creation
-  Click tracking
-  One-click copy to clipboard
-  Clean, modern UI

### Functionality
-  User registration and login
-  Create unlimited short URLs
-  View all your URLs
-  Track click statistics
-  Redirect from short to original URL

## Environment Variables (Optional)

### Backend (.env)
```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/shorturl
JWT_SECRET=your_secure_secret_key
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:3000
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure MongoDB is running with `mongod` |
| Port 3000 already in use | Change PORT in backend or kill the process |
| Frontend can't connect to backend | Check CORS is enabled in backend |
| Login fails after signup | Wait a moment and try again, or check MongoDB connection |
| JWT token expired | Login again to get a new token |

## Development

### Making Changes

**Backend Changes**
- Edit files in `backend/` folder
- Backend auto-reloads with nodemon
- No need to restart

**Frontend Changes**
- Edit files in `frontend/src/` folder
- Changes hot-reload automatically
- Browser will refresh automatically

### Building for Production

**Frontend Build**
```bash
cd frontend
npm run build
```

Creates optimized build in `frontend/build/` folder

**Backend Production**
```bash
cd backend
# Set NODE_ENV=production
# Use a production database
npm start
```

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### URLs Collection
```javascript
{
  _id: ObjectId,
  shortid: String (unique),
  redirecturl: String,
  userId: ObjectId (reference),
  totalclicks: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Next Steps

1.  Deploy backend to hosting platform (Heroku, Railway, Render, etc.)
2. Deploy frontend to static hosting (Vercel, Netlify, etc.)
3.  Set up production MongoDB database (MongoDB Atlas)
4. Add custom domain support
5. Add analytics dashboard
6. Add password reset functionality


