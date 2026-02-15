# Standard Engineering - Online Steel & Steel Works Management System

A comprehensive full-stack web application for managing steel products, custom fabrication requirements, quotations, and orders.

## Project Structure

```
standard-engineering/
├── backend/                 # Node.js Express API
│   ├── config/             # Database configuration
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication middleware
│   ├── server.js           # Main server file
│   ├── package.json        # Dependencies
│   └── .env                # Environment variables
│
└── frontend/               # React application
    ├── public/             # Static files
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   ├── context/        # React context (Auth)
    │   ├── styles/         # Global styles
    │   ├── App.js          # Main app component
    │   └── index.js        # Entry point
    ├── package.json        # Dependencies
    └── .env                # Environment variables
```

## Technology Stack

- **Frontend**: React 18, React Router, Axios, CSS3
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB

## Features

### User (Customer) Features
- User registration and secure login
- Browse steel products (beams, rods, sheets, pipes, etc.)
- Submit custom fabrication requirements
- Request quotation
- View quotation status
- Place order after quotation approval
- Track order status in real-time
- View order history and invoices
- Contact Standard Engineering through enquiry form

### Admin Features
- Secure admin login dashboard
- Manage products (add, update, delete)
- View and manage customer details
- Review custom requirements
- Generate and update quotations
- Manage inventory (stock in/out)
- Update production and order status
- View all orders and requests
- Generate reports

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (.env):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/standard-engineering
JWT_SECRET=your_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

4. Start the server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000/api`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (.env):
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updateprofile` - Update user profile

### Products Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Custom Requirements Endpoints
- `POST /api/requirements` - Submit requirement
- `GET /api/requirements` - Get requirements
- `GET /api/requirements/:id` - Get single requirement
- `PUT /api/requirements/:id` - Update requirement (Admin)

### Quotations Endpoints
- `POST /api/quotations` - Create quotation (Admin)
- `GET /api/quotations` - Get quotations
- `GET /api/quotations/:id` - Get single quotation
- `PUT /api/quotations/:id` - Update quotation (Admin)

### Orders Endpoints
- `POST /api/orders` - Create order
- `GET /api/orders` - Get orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id` - Update order (Admin)

### Inventory Endpoints
- `GET /api/inventory` - Get all inventory (Admin)
- `GET /api/inventory/:productId` - Get product inventory (Admin)
- `POST /api/inventory/stock-in` - Add stock (Admin)
- `POST /api/inventory/stock-out` - Remove stock (Admin)

### Enquiries Endpoints
- `POST /api/enquiries` - Submit enquiry
- `GET /api/enquiries` - Get enquiries (Admin)
- `GET /api/enquiries/:id` - Get single enquiry (Admin)
- `PUT /api/enquiries/:id` - Update enquiry (Admin)

### Admin Endpoints
- `GET /api/admin/dashboard` - Dashboard data (Admin)
- `GET /api/admin/users` - Get all users (Admin)
- `GET /api/admin/users/:id` - Get single user (Admin)
- `PUT /api/admin/users/:id` - Update user (Admin)
- `GET /api/admin/reports` - Get reports (Admin)

## Database Models

### User Model
- firstName, lastName, email, password
- phone, company, address, city, state, zipCode, country
- role (user/admin), isActive

### Product Model
- name, category, description, specifications
- unitPrice, unit, stock, minStock
- image, isActive

### CustomRequirement Model
- userId, title, description, materialType
- dimensions, quantity, unit, designNotes
- deliveryDate, status, notes

### Quotation Model
- quotationNumber, userId, customRequirementId
- items, subtotal, tax, totalAmount
- status (pending/approved/rejected), validUntil

### Order Model
- orderNumber, userId, quotationId
- items, totalAmount, status
- deliveryAddress, estimatedDelivery, actualDelivery
- invoiceNumber, invoiceDate

### Inventory Model
- productId, currentStock, reservedStock
- availableStock, transactions

### Enquiry Model
- name, email, phone, subject, message
- userId, status, response, respondedBy

## Usage

1. **Register as a User**:
   - Visit the registration page and create an account
   - Verify email (optional)

2. **Browse Products**:
   - View all available steel products
   - Filter by category or search

3. **Submit Custom Requirements**:
   - Provide project details, material, dimensions
   - Admin will review and send quotation

4. **Request Quotation**:
   - Submit requirements or select products
   - Admin generates quotation
   - Review quotation details

5. **Place Order**:
   - Approve quotation
   - Create order with delivery address
   - Track order status in real-time

6. **Admin Functions**:
   - Login with admin account
   - Manage products, inventory, orders
   - Review customer requirements
   - Generate and approve quotations
   - Update order and production status

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Protected routes
- CORS enabled
- Secure environment variables

## Future Enhancements

- Payment integration (Stripe, PayPal)
- Email notifications
- Advanced reporting and analytics
- Mobile app
- Multi-language support
- PDF invoice generation
- File upload for designs
- Chat/messaging system
- Rating and review system

## License

This project is licensed under the ISC License.

## Support

For support, contact: info@standardengineering.com

## Authors

Standard Engineering Development Team
