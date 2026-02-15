const express = require('express');
const Enquiry = require('../models/Enquiry');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/enquiries
// @desc    Submit enquiry
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message, userId } = req.body;

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      subject,
      message,
      userId: userId || null,
      status: 'new'
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      enquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/enquiries
// @desc    Get all enquiries
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate('userId', 'firstName lastName email')
      .populate('respondedBy', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/enquiries/:id
// @desc    Get single enquiry
// @access  Private/Admin
router.get('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id)
      .populate('userId', 'firstName lastName email')
      .populate('respondedBy', 'firstName lastName');

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    res.status(200).json({
      success: true,
      enquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/enquiries/:id
// @desc    Update enquiry
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, response } = req.body;

    let enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    const fieldsToUpdate = {
      status,
      response,
      respondedBy: req.user.id,
      responseDate: Date.now(),
      updatedAt: Date.now()
    };

    enquiry = await Enquiry.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      enquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
