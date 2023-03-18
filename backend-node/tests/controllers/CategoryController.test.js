const request = require('supertest');
const app = require('./../../bootstrap/app.js');
const db = require('../../app/models');
const {Collection} = require('../../app/models');

let collection = null;

describe('test /categories', () => {

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
            .post('/categories')
            .send({
                collectionId: collection.id,
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

    it('Gets all categories', (done) => {
        request(app)
            .get(`/collections/${collection.id}/categories`)
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
            .get('/categories/1')
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
            .get('/categories/doesnotexist')
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
            .patch('/categories/1')
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

    it('Deletes a category', (done) => {
        request(app)
            .delete('/categories/1')
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