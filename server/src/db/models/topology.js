import mongoose from "mongoose";

const topologyDataSchema = new mongoose.Schema({
  trailId: { type: String, index: true },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    altitude: { type: Number, required: true } // metros
  },
  environment: {
    temperature: Number,      // celsius
    pressure: Number,         // hPa
    humidity: Number          // percentual
  },
  motion: {
    heading: Number,          // orientação 0-360 graus
    speed: Number,            // m/s
    verticalSpeed: Number     // m/s (subida/descida)
  },
  terrain: {
    slope: Number,            // inclinação em graus
    surfaceType: String       // rock, dirt, grass, snow, etc
  },
  deviceId: String,           // identificador do dispositivo
  accuracy: Number,           // precisão GPS em metros
  timestamp: { type: Date, default: Date.now }
});

export const TopologyData = mongoose.model('TopologyData', topologyDataSchema);

