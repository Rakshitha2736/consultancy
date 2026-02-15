const express = require('express');
const Quotation = require('../models/Quotation');
const CustomRequirement = require('../models/CustomRequirement');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/quotations
// @desc    Create quotation
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { userId, customRequirementId, items, subtotal, tax, totalAmount, validUntil, notes } = req.body;

    const quotation = await Quotation.create({
      userId,
      customRequirementId,
      items,
      subtotal,
      tax,
      totalAmount,
      validUntil,
      notes,
      generatedBy: req.user.id,
      status: 'pending'
    });

    // Update custom requirement status
    if (customRequirementId) {
      await CustomRequirement.findByIdAndUpdate(customRequirementId, {
        status: 'quotation_sent',
        updatedAt: Date.now()
      });
    }

    res.status(201).json({
      success: true,
      message: 'Quotation created successfully',
      quotation
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/quotations
// @desc    Get quotations
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === 'user') {
      filter.userId = req.user.id;
    }

    const quotations = await Quotation.find(filter)
      .populate('userId', 'firstName lastName email')
      .populate('customRequirementId')
      .populate('items.productId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: quotations.length,
      quotations
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/quotations/:id
// @desc    Get single quotation
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id)
      .populate('userId', 'firstName lastName email')
      .populate('customRequirementId')
      .populate('items.productId');

    if (!quotation) {
      return res.status(404).json({ success: false, message: 'Quotation not found' });
    }

    if (req.user.role !== 'admin' && quotation.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this quotation' });
    }

    res.status(200).json({
      success: true,
      quotation
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/quotations/:id
// @desc    Update quotation status
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, notes } = req.body;

    let quotation = await Quotation.findById(req.params.id);

    if (!quotation) {
      return res.status(404).json({ success: false, message: 'Quotation not found' });
    }

    const fieldsToUpdate = {
      status,
      notes,
      updatedAt: Date.now()
    };

    if (status === 'approved') {
      fieldsToUpdate.approvedBy = req.user.id;
      fieldsToUpdate.approvalDate = Date.now();
    }

    quotation = await Quotation.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: 'Quotation updated successfully',
      quotation
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
