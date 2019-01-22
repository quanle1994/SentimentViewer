import {User} from '../mongomodels/user';

require('dotenv').load();
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_DEV_URI, {useNewUrlParser: true});

const userSchema = {
    name: 'dummy user 1',
    email: 'dummyuser1@gmail.com',
    password: 'password',
    phone: '12345678'
};

const user = new User(userSchema);
try {
    user.save();
}catch (e) {
    console.log(e);
}

setTimeout(() => {
    mongoose.connection.close();
}, 3000);
