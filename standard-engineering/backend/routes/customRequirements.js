const express = require('express');
const CustomRequirement = require('../models/CustomRequirement');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/requirements
// @desc    Submit custom requirement
// @access  Private/User
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, materialType, dimensions, quantity, unit, designNotes, deliveryDate } = req.body;

    const requirement = await CustomRequirement.create({
      userId: req.user.id,
      title,
      description,
      materialType,
      dimensions,
      quantity,
      unit,
      designNotes,
      deliveryDate
    });

    res.status(201).json({
      success: true,
      message: 'Custom requirement submitted successfully',
      requirement
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/requirements
// @desc    Get all requirements (user) or specific user requirements (admin)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === 'user') {
      filter.userId = req.user.id;
    }

    const requirements = await CustomRequirement.find(filter)
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requirements.length,
      requirements
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/requirements/:id
// @desc    Get single requirement
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const requirement = await CustomRequirement.findById(req.params.id).populate('userId', 'firstName lastName email');

    if (!requirement) {
      return res.status(404).json({ success: false, message: 'Requirement not found' });
    }

    // Check if user is owner or admin
    if (req.user.role !== 'admin' && requirement.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this requirement' });
    }

    res.status(200).json({
      success: true,
      requirement
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/requirements/:id
// @desc    Update requirement status (admin only)
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, notes } = req.body;

    let requirement = await CustomRequirement.findById(req.params.id);

    if (!requirement) {
      return res.status(404).json({ success: false, message: 'Requirement not found' });
    }

    const fieldsToUpdate = {
      status,
      notes,
      updatedAt: Date.now()
    };

    requirement = await CustomRequirement.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: 'Requirement updated successfully',
      requirement
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
