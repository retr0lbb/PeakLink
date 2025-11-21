import mongoose from "mongoose";

const TrailSchema = new mongoose.Schema({
    userId: String,
    status: {
        type: String,
        enum: ['open', 'closed', 'auto-closed'],
        default: 'open'
    },
    startedAt: { type: Date, default: Date.now },
    endedAt: { type: Date },
    stats: {
        distance: Number,
        duration: Number,
        altGain: Number,
        altLoss: Number,
        avgSpeed: Number,
        estimateCaloriesBurned: Number
    }
});

export const Trail = mongoose.model('TrailData', TrailSchema);

