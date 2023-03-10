const request = require('supertest');
const app = require('./../../bootstrap/app.js');
const db = require('../../app/models');

describe('test /items', () => {

    beforeAll(async () => {
        await db.sequelize.sync({force: true});
    });

    it('Creates a item', (done) => {
        request(app)
            .post('/items')
            .send({
                name: 'Books'
            })
            .then(response => {
                expect(response.status).toBe(201);
                expect(response.body.name).toBe('Books');
            })
            .finally(() => {
                done();
            });
    });

    it('Gets all items', (done) => {
        request(app)
            .get('/items')
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.body[0].name).toBe('Books');
            })
            .finally(() => {
                done();
            });
    });

    it('Shows an item', (done) => {
        request(app)
            .get('/items/1')
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.body.name).toBe('Books');
            })
            .finally(() => {
                done();
            });
    });

    it('Returns a 404 when item is not found', (done) => {
        request(app)
            .get('/items/doesnotexist')
            .then((response) => {
                expect(response.status).toBe(404);
                expect(response.body).toStrictEqual('');
            })
            .finally(() => {
                done();
            });
    });

    it('Updates an item', (done) => {
        request(app)
            .patch('/items/1')
            .send({
                name: 'Pokemon'
            })
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.body.name).toBe('Pokemon');
            })
            .finally(() => {
                done();
            });
    });

    it('Deletes an item', (done) => {
        request(app)
            .delete('/items/1')
            .send()
            .then(response => {
                expect(response.status).toBe(204);
                expect(response.body).toStrictEqual({});
            })
            .finally(() => {
                done();
            });
    });

});