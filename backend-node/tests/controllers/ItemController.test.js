const request = require('supertest');
const app = require('./../../bootstrap/app.js');
const db = require('../../app/models');
const {Category, Collection} = require('../../app/models');

let collection = null;
let category = null;

describe('test /api/v1/items', () => {

    beforeAll(async () => {
        try {
            await db.sequelize.sync({force: true});
            collection = await Collection.create({
                id: 1,
                name: 'Name'
            });
            category = await Category.create({
                id: 1,
                name: 'Name'
            });
        } catch (e) {
            console.error(e);
        }
    });

    it('Creates an item', (done) => {

        request(app)
            .post('/api/v1/items')
            .send({
                collectionId: collection.id,
                categoryId: category.id,
                name: 'Books',
                img: 'path/to/jpg',
            })
            .then(response => {
                expect(response.status).toBe(201);
                expect(response.body.name).toBe('Books');
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                done();
            });
    });

    it('Validation fails when creating an item', (done) => {
        request(app)
            .post('/api/v1/items')
            .send({})
            .then(response => {
                expect(response.status).toBe(422);
                expect(response.body.errors.name).toBe('is required');
                expect(response.body.errors.img).toBe('is required');
                expect(response.body.errors.collectionId).toBe('must be an integer');
                expect(response.body.errors.categoryId).toBe('must be an integer');
            })
            .finally(() => {
                done();
            });
    });

    it('Gets all items', (done) => {
        request(app)
            .get(`/api/v1/collections/${collection.id}/items`)
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
            .get('/api/v1/items/1')
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
            .get('/api/v1/items/doesnotexist')
            .then((response) => {
                expect(response.status).toBe(404);
                expect(response.body).toStrictEqual({});
            })
            .finally(() => {
                done();
            });
    });

    it('Updates an item', (done) => {
        request(app)
            .patch('/api/v1/items/1')
            .send({
                collectionId: collection.id,
                categoryId: category.id,
                name: 'Pokemon',
                img: 'path/to/jpg',
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
            .delete('/api/v1/items/1')
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