const request = require('supertest');
const app = require('./../../bootstrap/app.js');
const db = require('../../app/models');

describe('test /collections', () => {

    beforeAll(async () => {
        await db.sequelize.sync({force: true});
    });

    it('Creates a collection', (done) => {
        request(app)
            .post('/collections')
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

    it('Gets all collections', (done) => {
        request(app)
            .get('/collections')
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.body[0].name).toBe('Books');
            })
            .finally(() => {
                done();
            });
    });

    it('Shows a collection', (done) => {
        request(app)
            .get('/collections/1')
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.body.name).toBe('Books');
            })
            .finally(() => {
                done();
            });
    });

    it('Returns a 404 when collection is not found', (done) => {
        request(app)
            .get('/collections/doesnotexist')
            .then((response) => {
                expect(response.status).toBe(404);
                expect(response.body).toStrictEqual('');
            })
            .finally(() => {
                done();
            });
    });

    it('Updates a collection', (done) => {
        request(app)
            .patch('/collections/1')
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

    it('Deletes a collection', (done) => {
        request(app)
            .delete('/collections/1')
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