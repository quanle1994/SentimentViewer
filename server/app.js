import {sentimentRouter} from "./routes/sentimentRoutes";

require('dotenv').load();

import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use('/', sentimentRouter);
app.use(express.static(__dirname + "../../static"))

app.listen(process.env.NODE_PORT, () => {
    console.log(`Started on port ${process.env.NODE_PORT}`);
});

// export app for testing
module.exports = {
    app
};