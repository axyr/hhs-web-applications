import supertest from 'supertest';
import {app} from './../../bootstrap/app.js';
import {Collection} from '../../app/models/Collection.js';

const request = supertest(app);

describe('test /collections', () => {

    it('Gets no collections', async () => {
        // This is stupid.
        // If we remove this test, the other test
        // keep spinning and failing
        const response = await request.get('/collections').send();

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual([]);
    });

    it('Creates a collection', async () => {
        const response = await request.post('/collections').send({
            name: 'Books'
        });

        const collection = await Collection.findOne();

        expect(response.status).toBe(201);
        expect(collection.name).toBe('Books');
        expect(response.body.name).toBe('Books');
    });

    it('Gets all collections', async () => {
        const response = await request.get('/collections').send();

        expect(response.status).toBe(200);
        expect(response.body[0].name).toBe('Books');
    });

    it('Shows a collection', async () => {
        const response = await request.get('/collections/1');

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Books');
    });

    it('Returns a 404 when collection is not found', async () => {
        const response = await request.get('/collections/doesnotexist');

        expect(response.status).toBe(404);
        expect(response.body).toStrictEqual('');
    });

    it('Updates a collection', async () => {
        const response = await request.patch('/collections/1').send({
            name: 'Pokemon'
        });

        const collection = await Collection.findOne();

        expect(response.status).toBe(200);
        expect(collection.name).toBe('Pokemon');
        expect(response.body.name).toBe('Pokemon');
    });

    it('Deletes a collection', async () => {
        const response = await request.delete('/collections/1').send();

        const collection = await Collection.findOne();

        expect(response.status).toBe(204);
        expect(collection).toBe(null);
        expect(response.body).toStrictEqual({});
    });

});