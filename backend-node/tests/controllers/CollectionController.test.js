const request = require('supertest');
const app = require('./../../bootstrap/app.js');
const db = require('../../app/models');

describe('test /api/v1/collections', () => {

    beforeAll(async () => {
        try {
            await db.sequelize.sync({force: true});
        } catch (e) {
            console.error(e);
        }
    });

    it('Creates a collection', (done) => {
        request(app)
            .post('/api/v1/collections')
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
            .get('/api/v1/collections')
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
            .get('/api/v1/collections/1')
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
            .get('/api/v1/collections/doesnotexist')
            .then((response) => {
                expect(response.status).toBe(404);
                expect(response.body).toStrictEqual({});
            })
            .finally(() => {
                done();
            });
    });

    it('Updates a collection', (done) => {
        request(app)
            .patch('/api/v1/collections/1')
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
            .delete('/api/v1/collections/1')
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