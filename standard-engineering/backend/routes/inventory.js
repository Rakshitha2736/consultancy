const express = require('express');
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/inventory
// @desc    Get all inventory
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const inventory = await Inventory.find()
      .populate('productId')
      .populate('transactions.createdBy', 'firstName lastName');

    res.status(200).json({
      success: true,
      count: inventory.length,
      inventory
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/inventory/:productId
// @desc    Get inventory for specific product
// @access  Private/Admin
router.get('/:productId', protect, authorize('admin'), async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ productId: req.params.productId })
      .populate('productId')
      .populate('transactions.createdBy', 'firstName lastName');

    if (!inventory) {
      return res.status(404).json({ success: false, message: 'Inventory not found' });
    }

    res.status(200).json({
      success: true,
      inventory
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/inventory/stock-in
// @desc    Add stock
// @access  Private/Admin
router.post('/stock-in', protect, authorize('admin'), async (req, res) => {
  try {
    const { productId, quantity, reference, notes } = req.body;

    let inventory = await Inventory.findOne({ productId });

    if (!inventory) {
      inventory = await Inventory.create({ productId });
    }

    inventory.currentStock += quantity;
    inventory.transactions.push({
      type: 'stock_in',
      quantity,
      reference,
      notes,
      createdBy: req.user.id
    });

    await inventory.save();

    // Update product stock
    await Product.findByIdAndUpdate(productId, { stock: inventory.currentStock });

    res.status(200).json({
      success: true,
      message: 'Stock added successfully',
      inventory
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/inventory/stock-out
// @desc    Remove stock
// @access  Private/Admin
router.post('/stock-out', protect, authorize('admin'), async (req, res) => {
  try {
    const { productId, quantity, reference, notes } = req.body;

    let inventory = await Inventory.findOne({ productId });

    if (!inventory || inventory.availableStock < quantity) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }

    inventory.currentStock = Math.max(0, inventory.currentStock - quantity);
    inventory.transactions.push({
      type: 'stock_out',
      quantity,
      reference,
      notes,
      createdBy: req.user.id
    });

    await inventory.save();

    // Update product stock
    await Product.findByIdAndUpdate(productId, { stock: inventory.currentStock });

    res.status(200).json({
      success: true,
      message: 'Stock removed successfully',
      inventory
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
