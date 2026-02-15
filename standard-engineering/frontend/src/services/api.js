import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth Service
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (email, password) => api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/updateprofile', userData)
};

// Product Service
export const productService = {
  getAllProducts: (params) => api.get('/products', { params }),
  getProductById: (id) => api.get(`/products/${id}`),
  createProduct: (productData) => api.post('/products', productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`)
};

// Custom Requirements Service
export const requirementService = {
  submitRequirement: (requirementData) => api.post('/requirements', requirementData),
  getRequirements: () => api.get('/requirements'),
  getRequirementById: (id) => api.get(`/requirements/${id}`),
  updateRequirement: (id, data) => api.put(`/requirements/${id}`, data)
};

// Quotation Service
export const quotationService = {
  createQuotation: (quotationData) => api.post('/quotations', quotationData),
  getQuotations: () => api.get('/quotations'),
  getQuotationById: (id) => api.get(`/quotations/${id}`),
  updateQuotation: (id, data) => api.put(`/quotations/${id}`, data)
};

// Order Service
export const orderService = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getOrders: () => api.get('/orders'),
  getOrderById: (id) => api.get(`/orders/${id}`),
  updateOrder: (id, data) => api.put(`/orders/${id}`, data)
};

// Inventory Service
export const inventoryService = {
  getInventory: () => api.get('/inventory'),
  getInventoryByProduct: (productId) => api.get(`/inventory/${productId}`),
  stockIn: (data) => api.post('/inventory/stock-in', data),
  stockOut: (data) => api.post('/inventory/stock-out', data)
};

// Enquiry Service
export const enquiryService = {
  submitEnquiry: (enquiryData) => api.post('/enquiries', enquiryData),
  getEnquiries: () => api.get('/enquiries'),
  getEnquiryById: (id) => api.get(`/enquiries/${id}`),
  updateEnquiry: (id, data) => api.put(`/enquiries/${id}`, data)
};

// Admin Service
export const adminService = {
  getDashboard: () => api.get('/admin/dashboard'),
  getAllUsers: () => api.get('/admin/users'),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  getReports: (params) => api.get('/admin/reports', { params })
};

export default api;
