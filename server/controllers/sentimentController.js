import Sentiment from "../models/sentiment";

const sentiments = require('../../sentimentdata.json').map(j => new Sentiment(j));
const donutData = {
    negative: 0,
    positive: 0,
    neutral: 0,
};
const lineData = {};
const sentimentsByCoord = {};

const getSentiments = async (req, res) => {
    const seen = {};
    const points = sentiments.map(s => {
        donutData[s.properties.labelledSentiment] = donutData[s.properties.labelledSentiment] + 1;
        const date = new Date(s.properties.year, s.properties.month, s.properties.day, s.properties.hour);
        let obj = lineData[date.toLocaleString()];
        if (obj === undefined)
            obj = {
                negative: 0,
                positive: 0,
                neutral: 0,
            };
        obj[s.properties.labelledSentiment] = obj[s.properties.labelledSentiment] + 1;
        lineData[date.toLocaleString] = obj;
        return s.coordinate.coordinates;
    }).filter(item => seen
        .hasOwnProperty(item.toLocaleString()) ? false : (seen[item.toLocaleString()] = true));
    Object.keys(seen).forEach(a => {
        let sentimentsByCoordElement = sentimentsByCoord[a];
        if (sentimentsByCoordElement !== undefined) return;
        sentimentsByCoordElement = [];
        sentimentsByCoord[a] = sentimentsByCoordElement.concat(sentiments.filter(s => s.coordinate.coordinates.toLocaleString() === a));
    });
    res.send({size: points.length, points});
};

const getSentiment = async (req, res) => {
    const {id} = req.query;
    const messages = sentimentsByCoord[id].map(s => ({
        userName: s.properties.userName,
        text: s.properties.text,
        date: new Date(s.properties.year, s.properties.month, s.properties.day, s.properties.hour, s.properties.minute, s.properties.second),
        sentiStrings: s.properties.sentiStrings,
        source: s.properties.source,
        cat: s.properties.labelledSentiment === 'negative' ? 0 : s.properties.labelledSentiment === 'neutral' ? 1 : 2,
    }));
    res.send({messages});
};

const getDonutData = async (req, res) => {
    console.log(donutData);
    res.send(donutData);
};

const getLineData = async (req, res) => {
    res.send(lineData);
};

module.exports = {
    getSentiments,
    getSentiment,
    getDonutData,
    getLineData,
};