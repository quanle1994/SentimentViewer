import request from "supertest";
import {app} from "../../server/app";

const postSignup = async (testServer, testUser) => {
    return testServer.post('/signup')
        .send(testUser);
};

const postSignin = async (testServer, testUser) => {
    return testServer.post('/signin')
        .send(testUser);
};

const deleteSignout = async (testServer, token) => {
    return testServer.delete('/signout')
        .set('x-auth', token);
}

module.exports = {
    postSignup,
    postSignin,
    deleteSignout
};