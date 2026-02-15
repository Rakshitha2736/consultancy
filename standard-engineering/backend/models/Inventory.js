const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    unique: true
  },
  currentStock: {
    type: Number,
    default: 0
  },
  reservedStock: {
    type: Number,
    default: 0
  },
  availableStock: {
    type: Number,
    default: 0
  },
  transactions: [{
    type: {
      type: String,
      enum: ['stock_in', 'stock_out', 'reserved', 'released']
    },
    quantity: Number,
    reference: String,
    notes: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Update available stock before saving
inventorySchema.pre('save', function(next) {
  this.availableStock = this.currentStock - this.reservedStock;
  if (this.availableStock < 0) {
    this.availableStock = 0;
  }
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('Inventory', inventorySchema);
