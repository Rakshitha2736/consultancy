# Standard Engineering Frontend

React application for steel products and works management system.

## Quick Start

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment variables** (.env):
```
REACT_APP_API_URL=http://localhost:5000/api
```

3. **Start the development server**:
```bash
npm start
```

Application will open at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/           # Static files
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page components
│   ├── pages/admin/  # Admin pages
│   ├── services/     # API service layer
│   ├── context/      # React context
│   ├── styles/       # Global styles
│   ├── App.js        # Main app component
│   └── index.js      # Entry point
└── package.json
```

## Features

- User authentication (login/register)
- Product browsing and filtering
- Custom requirements submission
- Quotation management
- Order placement and tracking
- Admin dashboard
- Responsive design
- Real-time status updates

## Dependencies

- react: UI library
- react-router-dom: Navigation
- axios: HTTP client
- css: Styling

## Available Routes

### User Routes
- `/` - Home
- `/login` - Login page
- `/register` - Registration page
- `/products` - Browse products
- `/requirements` - Submit requirements
- `/orders` - View orders
- `/quotations` - View quotations
- `/contact` - Contact form

### Admin Routes
- `/admin/dashboard` - Dashboard
- `/admin/products` - Manage products
- `/admin/orders` - Manage orders
- `/admin/quotations` - Manage quotations
- `/admin/users` - Manage users

## Styling

Global styles in `src/styles/global.css` with CSS custom properties for theming.

## Build for Production

```bash
npm run build
```

Creates optimized production build in `build/` folder.

## Notes

- Update REACT_APP_API_URL for different environments
- Ensure backend API is running before starting frontend
- Use React DevTools for debugging
