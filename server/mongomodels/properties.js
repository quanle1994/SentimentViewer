require('dotenv').load();
import mongoose from 'mongoose';

const PropertiesSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    minute: {
        type: String,
        required: true
    },
    second: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    sentiment: {
        type: String,
        required: true
    },
    sentiStrings: {
        type: String,
        required: true
    },
    labelledSentiment: {
        type: String,
        required: true
    },
    crowder: {
        type: String,
        required: true
    },
});

const Properties = mongoose.model('User', PropertiesSchema);

module.exports = {
    Properties
};