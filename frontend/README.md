# URL Shortener Frontend

A React-based frontend for the URL Shortener application with JWT authentication.

## Features

- **User Authentication**: Sign up and login with JWT tokens
- **Create Short URLs**: Easily create short URLs from long ones
- **View URL Statistics**: See click counts for each short URL
- **Copy to Clipboard**: Quick copy functionality for short URLs
- **Responsive Design**: Works on desktop and mobile devices

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure the backend is running on `http://localhost:3000`

## Running the Frontend

Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000` (frontend) while the backend runs on port 3000 as well. If there's a port conflict, you can change it in the API configuration.

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Navbar.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   └── Dashboard.js
│   ├── App.js
│   ├── api.js
│   ├── index.css
│   └── index.js
├── package.json
└── .gitignore
```

## Key Files

- **api.js**: Handles all API calls to the backend with JWT token management
- **App.js**: Main routing configuration
- **Navbar.js**: Navigation component with auth state
- **Dashboard.js**: Main page for creating and viewing short URLs
- **Login.js & Signup.js**: Authentication pages

## Environment Variables

If needed, you can create a `.env` file:
```
REACT_APP_API_URL=http://localhost:3000
```

## API Integration

The frontend connects to the backend API with the following endpoints:

- `POST /user/signup` - Create a new account
- `POST /user/login` - Login to existing account
- `POST /url` - Create a short URL (requires JWT token)
- `GET /url/user/urls` - Get user's URLs (requires JWT token)
- `GET /url/:id` - Redirect to original URL

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `build/` directory.

## Notes

- JWT tokens are stored in localStorage
- Tokens are automatically included in API requests
- Login tokens expire after 7 days
- The app includes a protected route for the dashboard
