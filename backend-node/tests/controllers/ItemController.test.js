const request = require('supertest');
const app = require('./../../bootstrap/app.js');
const db = require('../../app/models');
const {Category, Collection} = require('../../app/models');

let collection = null;
let category = null;

describe('test /items', () => {

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
            .post('/items')
            .send({
                collectionId: collection.id,
                categoryId: category.id,
                name: 'Books'
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

    it('Gets all items', (done) => {
        request(app)
            .get(`/collections/${collection.id}/items`)
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
                expect(response.body).toStrictEqual({});
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