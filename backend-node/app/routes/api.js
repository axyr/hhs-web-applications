const collections = require('../controllers/CollectionController');
const categories = require('../controllers/CategoryController');
const items = require('../controllers/ItemController');

const router = {
    init(app) {
        app.get('/', (req, res) => res.json({title: 'Collection Manager'}));

        app.get('/collections', collections.index);
        app.post('/collections', collections.create);
        app.get('/collections/:id', collections.show);
        app.patch('/collections/:id', collections.update);
        app.delete('/collections/:id', collections.destroy);

        app.get('/collections/:collectionId/categories', categories.index);
        app.get('/collections/:collectionId/items', items.index);

        app.post('/collections/:collectionId/categories', categories.create);
        app.get('/categories/:id', categories.show);
        app.patch('/categories/:id', categories.update);
        app.delete('/categories/:id', categories.destroy);

        app.post('/items', items.create);
        app.get('/items/:id', items.show);
        app.patch('/items/:id', items.update);
        app.delete('/items/:id', items.destroy);
    }
};

module.exports = router;