const request = require('supertest');
const app = require('./../../bootstrap/app.js');
const db = require('../../app/models');
const {Collection} = require('../../app/models');

let collection = null;

describe('test /api/v1/categories', () => {

    beforeAll(async () => {
        try {
            await db.sequelize.sync({force: true});
            collection = await Collection.create({
                id: 1,
                name: 'Name'
            });
        } catch (e) {
            console.error(e);
        }
    });

    it('Creates a category', (done) => {

        request(app)
            .post('/api/v1/categories')
            .send({
                collectionId: collection.id,
                name: 'Books',
            })
            .then(response => {
                expect(response.status).toBe(201);
                expect(response.body.name).toBe('Books');
            })
            .finally(() => {
                done();
            });
    });

    it('Validation fails when creating a category', (done) => {
        request(app)
            .post('/api/v1/categories')
            .send({})
            .then(response => {
                expect(response.status).toBe(422);
                expect(response.body.errors.name).toBe('is required');
                expect(response.body.errors.collectionId).toBe('must be an integer');
            })
            .finally(() => {
                done();
            });
    });

    it('Gets all categories', (done) => {
        request(app)
            .get(`/api/v1/collections/${collection.id}/categories`)
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.body[0].name).toBe('Books');
            })
            .finally(() => {
                done();
            });
    });

    it('Shows a category', (done) => {
        request(app)
            .get('/api/v1/categories/1')
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.body.name).toBe('Books');
            })
            .finally(() => {
                done();
            });
    });

    it('Returns a 404 when category is not found', (done) => {
        request(app)
            .get('/api/v1/categories/doesnotexist')
            .then((response) => {
                expect(response.status).toBe(404);
                expect(response.body).toStrictEqual({});
            })
            .finally(() => {
                done();
            });
    });

    it('Updates a category', (done) => {
        request(app)
            .patch('/api/v1/categories/1')
            .send({
                name: 'Pokemon',
                collectionId: 1,
            })
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.body.name).toBe('Pokemon');
            })
            .finally(() => {
                done();
            });
    });

    it('Validation fails when updating a category', (done) => {
        request(app)
            .patch('/api/v1/categories/1')
            .send({})
            .then(response => {
                expect(response.status).toBe(422);
                expect(response.body.errors.name).toBe('is required');
                expect(response.body.errors.collectionId).toBe('must be an integer');
            })
            .finally(() => {
                done();
            });
    });

    it('Deletes a category', (done) => {
        request(app)
            .delete('/api/v1/categories/1')
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