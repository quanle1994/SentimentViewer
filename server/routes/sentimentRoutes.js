import express from 'express';
import {getSentiments, getSentiment, getDonutData, getLineData} from "../controllers/sentimentController";

const sentimentRouter = express.Router();
const path = require('path');

sentimentRouter.route('/getSentiments')
    .get(getSentiments);

sentimentRouter.route('/getSentiment')
    .get(getSentiment);

sentimentRouter.route('/').get((req, res) => res.redirect('/index.html'));

sentimentRouter.route('/index.html/*').get((req, res) => res.redirect('/index.html'));

sentimentRouter.route('/getDonutData')
    .get(getDonutData);

sentimentRouter.route('/getLineData')
    .get(getLineData);

module.exports = {
    sentimentRouter
};