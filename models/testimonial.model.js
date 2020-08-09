const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  author: { type: String, required: true},
  text: { type: String, required: ture}
});

module.exports = mongoose.model('Testimonial', testimonialSchema);