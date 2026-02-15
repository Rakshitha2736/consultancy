const express = require('express');
const User = require('../models/User');
const Order = require('../models/Order');
const Quotation = require('../models/Quotation');
const Product = require('../models/Product');
const CustomRequirement = require('../models/CustomRequirement');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private/Admin
router.get('/dashboard', protect, authorize('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalOrders = await Order.countDocuments();
    const totalQuotations = await Quotation.countDocuments();

    const recentOrders = await Order.find()
      .populate('userId', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(5);

    const pendingQuotations = await Quotation.countDocuments({ status: 'pending' });
    const pendingRequirements = await CustomRequirement.countDocuments({ status: 'submitted' });

    const orderStats = {
      pending: await Order.countDocuments({ status: 'order_received' }),
      inProduction: await Order.countDocuments({ status: 'in_production' }),
      completed: await Order.countDocuments({ status: 'completed' }),
      delivered: await Order.countDocuments({ status: 'delivered' })
    };

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalQuotations,
        pendingQuotations,
        pendingRequirements,
        orderStats,
        recentOrders
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', protect, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/admin/users/:id
// @desc    Get single user
// @access  Private/Admin
router.get('/users/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user status
// @access  Private/Admin
router.put('/users/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { isActive } = req.body;

    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user = await User.findByIdAndUpdate(req.params.id, { isActive, updatedAt: Date.now() }, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/admin/reports
// @desc    Get reports
// @access  Private/Admin
router.get('/reports', protect, authorize('admin'), async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;

    let filter = {};
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    let report = {};

    if (type === 'orders' || !type) {
      report.orders = await Order.find(filter)
        .populate('userId', 'firstName lastName email')
        .sort({ createdAt: -1 });
    }

    if (type === 'quotations' || !type) {
      report.quotations = await Quotation.find(filter)
        .populate('userId', 'firstName lastName email')
        .sort({ createdAt: -1 });
    }

    if (type === 'requirements' || !type) {
      report.requirements = await CustomRequirement.find(filter)
        .populate('userId', 'firstName lastName email')
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      report
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
