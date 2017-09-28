const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const markerSchema = new Schema({
  markerName: String,
  lat: Number,
  lng: Number,
  draggable: Boolean
  

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Marker = mongoose.model('Marker', markerSchema);
module.exports = Marker;