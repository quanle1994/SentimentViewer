require('dotenv').load();
import mongoose from 'mongoose';

const CoordinateSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    }
});

const Coordinate = mongoose.model("Coordinate", CoordinateSchema);

module.exports = {
    Coordinate,
};