const mongoose = require('mongoose');

const customRequirementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  materialType: String,
  dimensions: String,
  quantity: {
    type: Number,
    required: true
  },
  unit: String,
  designNotes: String,
  deliveryDate: Date,
  attachments: [String],
  status: {
    type: String,
    enum: ['submitted', 'reviewed', 'quotation_sent', 'rejected'],
    default: 'submitted'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CustomRequirement', customRequirementSchema);
