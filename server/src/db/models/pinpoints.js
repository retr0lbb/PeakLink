import mongoose from "mongoose";

const pinpointSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, maxlength: 1000 },
  category: {
    type: String,
    enum: ['viewpoint', 'water', 'shelter', 'danger', 'camping', 'wildlife', 'landmark', 'other'],
    default: 'other'
  },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    altitude: Number
  },
  photo: {
    data: String,
    mimeType: String
  },
  trailId: String,
  createdBy: String,
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

pinpointSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });

export const Pinpoint = mongoose.model('Pinpoint', pinpointSchema);
