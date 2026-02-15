# Standard Engineering Backend API

Node.js + Express + MongoDB API for steel products and works management system.

## Quick Start

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment variables** (.env):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/standard-engineering
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

3. **Start the server**:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Project Structure

```
backend/
├── config/          # Database configuration
├── models/          # MongoDB models
├── routes/          # API routes
├── middleware/      # Auth & other middleware
├── server.js        # Main server entry point
└── package.json
```

## Dependencies

- express: Web framework
- mongoose: MongoDB ODM
- bcryptjs: Password hashing
- jsonwebtoken: JWT authentication
- cors: Cross-origin resource sharing
- dotenv: Environment variables
- express-validator: Request validation
- multer: File uploads
- nodemailer: Email sending

## Models

1. **User** - Customer and admin accounts
2. **Product** - Steel products catalog
3. **CustomRequirement** - Customer fabrication requests
4. **Quotation** - Price quotes
5. **Order** - Customer orders
6. **Inventory** - Stock management
7. **Enquiry** - Contact form submissions

## Authentication

JWT tokens are used for authentication. Include token in Authorization header:
```
Authorization: Bearer <token>
```

## Development

- Use `npm run dev` for development with nodemon
- Use `npm start` for production

## Notes

- Change JWT_SECRET in production
- Use MongoDB Atlas for production database
- Enable HTTPS in production
- Set NODE_ENV=production for production
