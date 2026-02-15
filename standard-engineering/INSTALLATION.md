# Standard Engineering - Installation & Setup Guide

## System Requirements

- Node.js v14 or higher
- MongoDB (local installation or MongoDB Atlas cloud)
- npm or yarn package manager
- Code editor (VS Code recommended)

## Step-by-Step Installation

### 1. MongoDB Setup

#### Option A: Local MongoDB Installation
- Download and install MongoDB from https://www.mongodb.com/try/download/community
- Start MongoDB service
- Default URI: `mongodb://localhost:27017/standard-engineering`

#### Option B: MongoDB Atlas (Cloud)
- Create free account at https://www.mongodb.com/cloud/atlas
- Create a cluster and database
- Get connection string and add to .env

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create/update .env file with:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/standard-engineering
JWT_SECRET=change_this_secret_key_in_production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Start backend server
npm run dev
```

Backend will run on: http://localhost:5000

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create/update .env file with:
REACT_APP_API_URL=http://localhost:5000/api

# Start frontend development server
npm start
```

Frontend will run on: http://localhost:3000

## Verify Installation

### Backend Check:
```bash
# Test API endpoint
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### Frontend Check:
- Navigate to http://localhost:3000
- Home page should load
- Try navigating to products page
- Try login/register (will fail without backend, but shows pages work)

## Initial Admin Account Creation

1. Register a new account through frontend
2. Stop backend server
3. Connect to MongoDB directly:

```javascript
// In MongoDB shell or MongoDB Compass
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

4. Restart backend server

## Testing the Application

### User Flow:
1. Register new account
2. Browse products
3. Submit custom requirements
4. Wait for admin to create quotation
5. Review quotation
6. Place order

### Admin Flow:
1. Login with admin account
2. Go to Dashboard
3. Manage Products
4. View Orders and Quotations
5. Generate Reports

## Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify MongoDB service status

### "API not responding"
- Ensure backend is running (npm run dev)
- Check if port 5000 is available
- Verify FRONTEND_URL in backend .env

### "CORS error"
- Backend CORS is configured for http://localhost:3000
- Update FRONTEND_URL if using different URL

### "Port already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

## Production Deployment

### Backend (Node.js)
- Set NODE_ENV=production
- Change JWT_SECRET to strong random key
- Use MongoDB Atlas or managed database
- Deploy to Heroku, AWS, DigitalOcean, etc.
- Enable HTTPS

### Frontend (React)
- Run `npm run build`
- Deploy static files to:
  - Netlify, Vercel, GitHub Pages
  - AWS S3 + CloudFront
  - Your own web server (Nginx, Apache)

## Environment Variables Reference

### Backend (.env)
```
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/standard-engineering

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Useful Commands

### Backend
```bash
npm install          # Install dependencies
npm run dev          # Run with nodemon (development)
npm start            # Run server
```

### Frontend
```bash
npm install          # Install dependencies
npm start            # Start dev server
npm run build        # Build for production
npm test             # Run tests
```

## Support & Documentation

- API Documentation: See backend/README.md
- Frontend Documentation: See frontend/README.md
- Main README: See README.md

## Next Steps

1. ✅ Complete installation
2. Test user registration and login
3. Create sample products in admin panel
4. Test customer workflow (browse, require, quotation, order)
5. Review code structure and customize as needed

Enjoy using Standard Engineering System!
