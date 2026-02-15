# Standard Engineering - Full-Stack Steel Management System
## Project Overview

This is a comprehensive full-stack web application for managing steel products, custom fabrication requirements, quotations, orders, and inventory.

## 📁 Project Structure

```
standard-engineering/
│
├── backend/                          # Node.js + Express API
│   ├── config/                       # Database configuration
│   ├── models/                       # MongoDB Schemas
│   │   ├── User.js                  # User model
│   │   ├── Product.js               # Product model
│   │   ├── CustomRequirement.js     # Requirement model
│   │   ├── Quotation.js             # Quotation model
│   │   ├── Order.js                 # Order model
│   │   ├── Inventory.js             # Inventory model
│   │   └── Enquiry.js               # Contact form model
│   ├── routes/                       # API Routes
│   │   ├── auth.js                  # Authentication
│   │   ├── products.js              # Products CRUD
│   │   ├── customRequirements.js    # Requirements
│   │   ├── quotations.js            # Quotations
│   │   ├── orders.js                # Orders
│   │   ├── inventory.js             # Inventory
│   │   ├── enquiries.js             # Enquiries
│   │   └── admin.js                 # Admin functions
│   ├── middleware/                   # Authentication middleware
│   ├── server.js                     # Main server entry point
│   ├── package.json                  # Dependencies
│   ├── .env                          # Environment variables
│   ├── .gitignore                    # Git ignore file
│   └── README.md                     # Backend documentation
│
├── frontend/                         # React Application
│   ├── public/                       # Static files
│   │   └── index.html                # HTML template
│   ├── src/
│   │   ├── components/               # Reusable components
│   │   │   ├── Header.js             # Navigation header
│   │   │   ├── Footer.js             # Page footer
│   │   │   ├── Loading.js            # Loading spinner
│   │   │   └── ProtectedRoute.js     # Protected route component
│   │   ├── context/                  # React context
│   │   │   └── AuthContext.js        # Authentication context
│   │   ├── pages/                    # Page components
│   │   │   ├── Home.js               # Home page
│   │   │   ├── Login.js              # Login page
│   │   │   ├── Register.js           # Registration page
│   │   │   ├── Products.js           # Products listing
│   │   │   ├── SubmitRequirement.js  # Submit requirement
│   │   │   ├── MyOrders.js           # User's orders
│   │   │   ├── MyQuotations.js       # User's quotations
│   │   │   ├── Contact.js            # Contact form
│   │   │   ├── admin/                # Admin pages
│   │   │   │   ├── AdminDashboard.js # Admin dashboard
│   │   │   │   ├── AdminProducts.js  # Manage products
│   │   │   │   ├── AdminOrders.js    # Manage orders
│   │   │   │   └── AdminUsers.js     # Manage users
│   │   │   └── *.css                 # Page styles
│   │   ├── services/                 # API services
│   │   │   └── api.js                # API endpoints
│   │   ├── styles/                   # Global styles
│   │   │   └── global.css            # Global CSS
│   │   ├── App.js                    # Main app component
│   │   └── index.js                  # React entry point
│   ├── package.json                  # Dependencies
│   ├── .env                          # Environment variables
│   ├── .gitignore                    # Git ignore file
│   └── README.md                     # Frontend documentation
│
├── README.md                         # Main project documentation
├── INSTALLATION.md                   # Installation guide
└── QUICKSTART.md                     # Quick start guide (this file)
```

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js (v14+)
- MongoDB running locally or MongoDB Atlas account
- Terminal/Command Prompt

### Step 1: Clone/Download Project
```bash
# Project is at: d:\Consultancy\standard-engineering
cd d:\Consultancy\standard-engineering
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# .env file already created with defaults:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/standard-engineering
# JWT_SECRET=your_secret_key_change_this_in_production
# JWT_EXPIRE=7d
# NODE_ENV=development
# FRONTEND_URL=http://localhost:3000

# Start backend
npm run dev
```

✅ Backend running on: http://localhost:5000/api

### Step 3: Setup Frontend (in new terminal)

```bash
cd frontend

# Install dependencies
npm install

# .env file already created with:
# REACT_APP_API_URL=http://localhost:5000/api

# Start frontend
npm start
```

✅ Frontend running on: http://localhost:3000

## 🧪 Test the Application

### User Registration
1. Navigate to http://localhost:3000/register
2. Fill in the form with:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: password123
   - Phone: 555-1234
   - Company: ABC Corp
3. Click Register - You're now logged in!

### Browse Products
1. Click "Products" in header
2. View available steel products
3. Filter by category or search

### Submit Requirements
1. Login first (if not already)
2. Click "My Requirements" or link from header
3. Fill custom fabrication details
4. Submit requirement

### Admin Access (for testing)

To make yourself an admin for testing:

**Option A: MongoDB Compass or Command Line**
```javascript
// MongoDB shell command
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

**After becoming admin:**
1. Logout and login again
2. Dashboard link appears in header
3. Manage products, orders, users

## 📚 Key Features

### User (Customer)
- ✅ User registration & login
- ✅ Browse steel products
- ✅ Filter products by category
- ✅ Submit custom fabrication requirements
- ✅ View quotation status
- ✅ Place orders after approval
- ✅ Track order status
- ✅ Contact form
- ✅ View order history

### Admin
- ✅ Dashboard with statistics
- ✅ Manage products (add/edit/delete)
- ✅ Manage users (activate/deactivate)
- ✅ View customer requirements
- ✅ Generate quotations
- ✅ Manage orders & status
- ✅ Manage inventory
- ✅ Generate reports

## 🔑 Default Test Accounts

After registration, here are some test accounts you can create:

**User Account:**
- Email: user@example.com
- Password: password123

**Admin Account:**
- Email: admin@example.com
- Password: password123
- (Must set role to 'admin' in MongoDB)

## 📂 Database Models

### User
- firstName, lastName, email, password
- phone, company, address
- role: 'user' or 'admin'
- isActive: boolean

### Product
- name, category, description
- specifications (material, grade, etc)
- unitPrice, unit, stock

### CustomRequirement
- userId, title, description
- materialType, dimensions, quantity
- deliveryDate, status, notes

### Quotation
- quotationNumber, userId
- items (products), totalAmount
- status: pending/approved/rejected

### Order
- orderNumber, userId, quotationId
- items, totalAmount
- status: order_received/in_production/completed/delivered
- deliveryAddress, estimatedDelivery

### Inventory
- productId, currentStock, reservedStock
- transactions (audit trail)

### Enquiry
- name, email, phone
- subject, message
- status, response

## 🛠️ API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user
- `PUT /api/auth/updateprofile` - Update profile

### Products
- `GET /api/products` - List products
- `POST /api/products` - Create (Admin)
- `PUT /api/products/:id` - Update (Admin)
- `DELETE /api/products/:id` - Delete (Admin)

### Requirements
- `POST /api/requirements` - Submit
- `GET /api/requirements` - List
- `PUT /api/requirements/:id` - Update (Admin)

### Quotations
- `POST /api/quotations` - Create (Admin)
- `GET /api/quotations` - List
- `PUT /api/quotations/:id` - Update (Admin)

### Orders
- `POST /api/orders` - Create
- `GET /api/orders` - List
- `PUT /api/orders/:id` - Update (Admin)

### Admin
- `GET /api/admin/dashboard` - Dashboard
- `GET /api/admin/users` - List users
- `PUT /api/admin/users/:id` - Update user

## 🎨 Styling

Global styles use CSS custom properties:
- `--primary-color`: #1e3c72 (Dark Blue)
- `--secondary-color`: #2a5298 (Blue)
- `--success-color`: #27ae60 (Green)
- `--danger-color`: #e74c3c (Red)
- `--warning-color`: #f39c12 (Orange)

Responsive design for mobile, tablet, and desktop.

## ⚙️ Available Scripts

**Backend:**
```bash
npm run dev     # Development mode with nodemon
npm start       # Production mode
```

**Frontend:**
```bash
npm start       # Development server
npm run build   # Production build
npm test        # Run tests
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in backend/.env
- For local: `mongodb://localhost:27017/standard-engineering`

### CORS Error
- Backend is configured for `http://localhost:3000`
- Update FRONTEND_URL in backend/.env if needed

### Port Already in Use
```bash
# Windows: Kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux: 
lsof -i :5000
kill -9 <PID>
```

### Can't Login After Creating User
- Restart backend server after user creation
- Check MongoDB connection
- Verify .env file has correct JWT_SECRET

## 📖 Full Documentation

- **Installation Guide**: See INSTALLATION.md
- **Backend Details**: See backend/README.md
- **Frontend Details**: See frontend/README.md
- **Project Overview**: See README.md

## 🚀 Next Steps

1. ✅ Run backend: `npm run dev` (in backend folder)
2. ✅ Run frontend: `npm start` (in frontend folder)
3. Register a test user account
4. Create some products (as admin)
5. Test the complete user flow
6. Customize styling and features as needed

## 📞 Support

For issues or questions, check:
1. INSTALLATION.md - Setup issues
2. Console logs (browser dev tools)
3. Backend console output
4. MongoDB connection status

## 💡 Tips

- Use MongoDB Compass for visual database management
- Use VS Code REST Client extension for API testing
- Check browser Console (F12) for errors
- Check Terminal for backend errors
- All timestamps are in UTC

---

**Happy coding!** 🎉

The application is fully functional and ready for customization. All major features are implemented and working.
