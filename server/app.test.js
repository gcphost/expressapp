const request = require('supertest');
const app = require('./app');
const db = require('../models');

const auth = {
    authorization: 'Bearer: ABCDEFG',
};

describe('Test the index', () => {
    test('It should return a 401 when not authorized', () => {
        return request(app)
            .get('/')
            .expect(401);
    });

    test('It should return a 401 when authorized headers have no bearer', () => {
        return request(app)
            .get('/')
            .set({
                authorization: 'BearerABCDEFG',
            })
            .expect(401);
    });

    test('It should return a 401 when authorized headers pass a bad key', () => {
        return request(app)
            .get('/')
            .set({
                authorization: 'Bearer: ABCDEF',
            })
            .expect(401);
    });

    test('It should return a 400 when there are no companies', () => {
        return request(app)
            .get('/')
            .set(auth)
            .expect(400);
    });

    test('It should return a 200 when there are companies', () => {
        return request(app)
            .get('/?companies[]=nike&companies[]=adidas')
            .set(auth)
            .expect(200)
            .expect({ data: [{ name: 'nike', domain: null }, { name: 'adidas', domain: null }], length: 2 });
    });

    afterAll((done) => {
        db.sequelize.close();
        done()
    });
})