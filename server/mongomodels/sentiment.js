import {Properties} from "./properties";

require('dotenv').load();
import mongoose from 'mongoose';
import {Coordinate} from "./coordinate";

const SentimentSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    properties: {
        type: Properties,
        required: true,
    },
    coordinate: {
        type: Coordinate,
        required: true,
    },
});

SentimentSchema.statics.findById = async function (id) {
    const Sentiment = this;

    try {
        const sentimentFound = await Sentiment.findOne({_id: id});
        if (!sentimentFound) {
            return Promise.reject('User not found');
        }
        return sentimentFound;
    } catch (e) {
        return Promise.reject(e)
    }
};

SentimentSchema.statics.findById = async function (uid) {
    const Sentiment = this;

    if (!uid) {
        return Promise.reject('Invalid token');
    }

    try {
        const userFound = await Sentiment.findOne({_id: uid});

        if (!userFound) {
            return Promise.reject('Invalid token');
        }

        return userFound;
    } catch (e) {
        return Promise.reject(e);
    }
};

const Sentiment = mongoose.model('User', SentimentSchema);

module.exports = {
    Sentiment
};