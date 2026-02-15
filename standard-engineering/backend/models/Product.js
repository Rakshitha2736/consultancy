const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['beams', 'rods', 'sheets', 'pipes', 'angles', 'channels', 'other'],
    required: true
  },
  description: String,
  specifications: {
    material: String,
    grade: String,
    dimensions: String,
    weight: String,
    finish: String
  },
  unitPrice: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    enum: ['kg', 'meter', 'piece', 'ton'],
    default: 'kg'
  },
  stock: {
    type: Number,
    default: 0
  },
  minStock: {
    type: Number,
    default: 10
  },
  image: String,
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
