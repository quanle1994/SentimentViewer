/*
* This module is setup mongodb connection
* Mongoose is used as object modeling tool to setup the environment
* Docs for mongoose: https://www.npmjs.com/package/mongoose
* */

require('dotenv').load();
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const dbUri = process.env.NODE_ENV === 'development' ? process.env.MONGODB_DEV_URI : process.env.MONGODB_TEST_URI;

mongoose.connect(dbUri, {useNewUrlParser: true});
console.log(`Database URI: ${dbUri}`);
