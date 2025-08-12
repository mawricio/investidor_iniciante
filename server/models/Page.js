const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, default: '' },
  order: { type: Number, default: 0 }
});

const PageSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  sections: [SectionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Page', PageSchema);
