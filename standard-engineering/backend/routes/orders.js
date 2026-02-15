const express = require('express');
const Order = require('../models/Order');
const Quotation = require('../models/Quotation');
const Inventory = require('../models/Inventory');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create order from quotation
// @access  Private/User
router.post('/', protect, async (req, res) => {
  try {
    const { quotationId, deliveryAddress } = req.body;

    const quotation = await Quotation.findById(quotationId);

    if (!quotation) {
      return res.status(404).json({ success: false, message: 'Quotation not found' });
    }

    if (quotation.status !== 'approved') {
      return res.status(400).json({ success: false, message: 'Quotation must be approved to create order' });
    }

    if (quotation.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to create order from this quotation' });
    }

    const order = await Order.create({
      userId: quotation.userId,
      quotationId,
      items: quotation.items,
      totalAmount: quotation.totalAmount,
      deliveryAddress: deliveryAddress || req.user.address,
      status: 'order_received'
    });

    // Reserve inventory
    for (const item of order.items) {
      if (item.productId) {
        let inventory = await Inventory.findOne({ productId: item.productId });
        if (!inventory) {
          inventory = await Inventory.create({ productId: item.productId });
        }
        inventory.reservedStock += item.quantity;
        await inventory.save();
      }
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/orders
// @desc    Get orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === 'user') {
      filter.userId = req.user.id;
    }

    const orders = await Order.find(filter)
      .populate('userId', 'firstName lastName email')
      .populate('quotationId')
      .populate('items.productId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'firstName lastName email')
      .populate('quotationId')
      .populate('items.productId');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (req.user.role !== 'admin' && order.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this order' });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/orders/:id
// @desc    Update order status
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, estimatedDelivery, actualDelivery, invoiceNumber, invoiceDate, notes } = req.body;

    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const fieldsToUpdate = {
      status,
      estimatedDelivery: estimatedDelivery || order.estimatedDelivery,
      actualDelivery: actualDelivery || order.actualDelivery,
      invoiceNumber: invoiceNumber || order.invoiceNumber,
      invoiceDate: invoiceDate || order.invoiceDate,
      notes: notes || order.notes,
      updatedAt: Date.now()
    };

    // If order is delivered, release reserved inventory
    if (status === 'delivered' && order.status !== 'delivered') {
      for (const item of order.items) {
        if (item.productId) {
          const inventory = await Inventory.findOne({ productId: item.productId });
          if (inventory) {
            inventory.reservedStock = Math.max(0, inventory.reservedStock - item.quantity);
            inventory.currentStock = Math.max(0, inventory.currentStock - item.quantity);
            await inventory.save();
          }
        }
      }
    }

    order = await Order.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
