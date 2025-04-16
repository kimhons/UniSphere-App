const mongoose = require('mongoose');

const MonetizationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['digital', 'physical', 'service'],
      required: true
    },
    imageUrl: String,
    downloadUrl: String,
    isActive: {
      type: Boolean,
      default: true
    },
    sales: {
      type: Number,
      default: 0
    },
    revenue: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  affiliateLinks: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    platform: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    trackingCode: String,
    commission: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    },
    conversions: {
      type: Number,
      default: 0
    },
    revenue: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  sponsorships: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    brand: {
      type: String,
      required: true
    },
    description: String,
    startDate: Date,
    endDate: Date,
    value: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'negotiating', 'cancelled'],
      default: 'negotiating'
    },
    deliverables: [String],
    notes: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  transactions: [{
    source: {
      type: String,
      enum: ['product', 'affiliate', 'sponsorship', 'tip', 'other'],
      required: true
    },
    sourceId: String,
    amount: {
      type: Number,
      required: true
    },
    platform: String,
    date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    paymentMethod: String,
    customerEmail: String,
    notes: String
  }],
  revenueSummary: {
    total: {
      type: Number,
      default: 0
    },
    bySource: {
      products: {
        type: Number,
        default: 0
      },
      affiliate: {
        type: Number,
        default: 0
      },
      sponsorships: {
        type: Number,
        default: 0
      },
      tips: {
        type: Number,
        default: 0
      },
      other: {
        type: Number,
        default: 0
      }
    },
    byPlatform: {
      instagram: {
        type: Number,
        default: 0
      },
      tiktok: {
        type: Number,
        default: 0
      },
      youtube: {
        type: Number,
        default: 0
      },
      twitter: {
        type: Number,
        default: 0
      },
      linkedin: {
        type: Number,
        default: 0
      },
      facebook: {
        type: Number,
        default: 0
      },
      pinterest: {
        type: Number,
        default: 0
      },
      website: {
        type: Number,
        default: 0
      },
      other: {
        type: Number,
        default: 0
      }
    },
    byMonth: [{
      month: Number,
      year: Number,
      amount: Number
    }]
  },
  paymentMethods: [{
    type: {
      type: String,
      enum: ['bank_account', 'paypal', 'stripe', 'venmo', 'other'],
      required: true
    },
    name: String,
    isDefault: {
      type: Boolean,
      default: false
    },
    details: {
      accountNumber: String,
      routingNumber: String,
      email: String,
      other: String
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

// Update lastUpdated on save
MonetizationSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

// Method to calculate total revenue
MonetizationSchema.methods.calculateTotalRevenue = function() {
  let total = 0;
  
  // Add product revenue
  this.products.forEach(product => {
    total += product.revenue;
  });
  
  // Add affiliate revenue
  this.affiliateLinks.forEach(link => {
    total += link.revenue;
  });
  
  // Add sponsorship revenue
  this.sponsorships.forEach(sponsorship => {
    if (sponsorship.status === 'completed') {
      total += sponsorship.value;
    }
  });
  
  // Add transaction revenue
  this.transactions.forEach(transaction => {
    if (transaction.status === 'completed') {
      total += transaction.amount;
    }
  });
  
  return total;
};

// Method to update revenue summary
MonetizationSchema.methods.updateRevenueSummary = function() {
  // Reset summary
  this.revenueSummary = {
    total: 0,
    bySource: {
      products: 0,
      affiliate: 0,
      sponsorships: 0,
      tips: 0,
      other: 0
    },
    byPlatform: {
      instagram: 0,
      tiktok: 0,
      youtube: 0,
      twitter: 0,
      linkedin: 0,
      facebook: 0,
      pinterest: 0,
      website: 0,
      other: 0
    },
    byMonth: []
  };
  
  // Process completed transactions
  const completedTransactions = this.transactions.filter(t => t.status === 'completed');
  
  // Group by source
  completedTransactions.forEach(transaction => {
    // Update total
    this.revenueSummary.total += transaction.amount;
    
    // Update by source
    if (transaction.source === 'product') {
      this.revenueSummary.bySource.products += transaction.amount;
    } else if (transaction.source === 'affiliate') {
      this.revenueSummary.bySource.affiliate += transaction.amount;
    } else if (transaction.source === 'sponsorship') {
      this.revenueSummary.bySource.sponsorships += transaction.amount;
    } else if (transaction.source === 'tip') {
      this.revenueSummary.bySource.tips += transaction.amount;
    } else {
      this.revenueSummary.bySource.other += transaction.amount;
    }
    
    // Update by platform
    if (transaction.platform) {
      if (this.revenueSummary.byPlatform[transaction.platform] !== undefined) {
        this.revenueSummary.byPlatform[transaction.platform] += transaction.amount;
      } else {
        this.revenueSummary.byPlatform.other += transaction.amount;
      }
    } else {
      this.revenueSummary.byPlatform.other += transaction.amount;
    }
    
    // Update by month
    const date = new Date(transaction.date);
    const month = date.getMonth();
    const year = date.getFullYear();
    
    let monthEntry = this.revenueSummary.byMonth.find(m => m.month === month && m.year === year);
    
    if (monthEntry) {
      monthEntry.amount += transaction.amount;
    } else {
      this.revenueSummary.byMonth.push({
        month,
        year,
        amount: transaction.amount
      });
    }
  });
  
  // Sort by month
  this.revenueSummary.byMonth.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    return a.month - b.month;
  });
};

module.exports = mongoose.model('Monetization', MonetizationSchema);
