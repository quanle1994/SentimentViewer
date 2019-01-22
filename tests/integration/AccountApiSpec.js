require('dotenv').load();
import request from 'supertest';
import {assert} from 'chai';
import jwt from 'jsonwebtoken';

import {app} from '../../server/app';
import {User} from '../../server/mongomodels/user';
import {dummyUsers} from '../storage/mockUsers';
import {
    postSignup,
    postSignin,
    deleteSignout
} from '../helpers/api'

describe('Account API integration tests', async () => {
    let testServer;
    let testUser;

    before(async () => {
        testServer = request(app);
    });

    beforeEach(async () => {
        // remove all existing documents in User collection
        await User.remove({});

        // insert dummy users into the User collection
        try {
            await User.insertMany(dummyUsers);
        } catch (e) {
            console.log(`Insert dummy users error: ${e}`);
        }
    });

    after(async () => {
        await User.remove({});
    });

    describe('POST /signup', async () => {
        it('should get 200 for creating a new user', async () => {
            testUser = {
                name: 'new test user',
                email: 'newTestUser@gmail.com',
                password: 'password',
                phone: '88888888'
            };

            const response = await postSignup(testServer, testUser);
            assert.equal(response.status, '200', 'failed to create user');

            const {name} = await User.findOne({email: testUser.email});
            assert.equal(name, testUser.name, 'testUser object is not the same as db data');
        });

        it('should get 400 if the user email is not unique in db', async () => {
            testUser = {
                name: 'new test user',
                email: 'user1@gmail.com',
                password: 'password',
                phone: '88888888'
            };

            const response = await postSignup(testServer, testUser);
            assert.equal(response.status, '400');
        });

        it('should get 400 if the user phone is not unique in db', async () => {
            testUser = {
                name: 'new test user',
                email: 'newTestUser2@gmail.com',
                password: 'password',
                phone: '12345678'
            };

            const response = await postSignup(testServer, testUser);
            assert.equal(response.status, '400');
        });
    });

    describe('POST /signin', async () => {
        it('should signin user and returns auth token', async () => {
            testUser = {
                email: dummyUsers[2].email,
                password: dummyUsers[2].password
            };

            const response = await postSignin(testServer, testUser);
            const token = response.body.token;

            // decode jwt token and get user id
            const {uid} = jwt.verify(token, process.env.NODE_SECRET);

            // retrieve user from db
            const userInDb = await User.findByEmail(testUser.email, testUser.password);

            // assert if user id from db and from token are the same
            assert.equal(uid, userInDb._id);
        });

        it('should return 401 if email is missing', async () => {
            testUser = {
                password: dummyUsers[2].password
            };

            await testServer.post('/signin').send(testUser).expect(401);
        });

        it('should return 401 if password is missing', async () => {
            testUser = {
                email: 'invalid email@gmail.com',
            };

            await testServer.post('/signin').send(testUser).expect(401);
        });

        it('should return 401 if email is not valid', async () => {
            testUser = {
                email: 'invalid email@gmail.com',
                password: dummyUsers[2].password
            };

            await testServer.post('/signin').send(testUser).expect(401);
        });

        it('should return 401 if password is incorrect', async () => {
            testUser = {
                email: 'invalid email@gmail.com',
                password: 'wrong password'
            };

            await testServer.post('/signin').send(testUser).expect(401);
        });

        it('should return 401 if user is not found', async () => {
            testUser = {
                email: 'nonExistUser@gmail.com',
                password: dummyUsers[2].password
            };

            await testServer.post('/signin').send(testUser).expect(401);
        });
    });

    describe('DELETE /signout', async () => {
        it('should delete token and sign out user', async () => {
            testUser = {
                email: dummyUsers[2].email,
                password: dummyUsers[2].password
            };

            const response = await postSignin(testServer, testUser);
            const token = response.body.token;
            await deleteSignout(testServer, token);
            const userInDb = await User.findByEmail(testUser.email, testUser.password);

            assert.equal(userInDb.token, undefined);
        });

        it('should return 401 if token is invalid', async () => {
            const invalidToken = 'xxoo';
            await testServer.delete('/signout').set('x-auth', invalidToken).expect(401);
        });
    });
});