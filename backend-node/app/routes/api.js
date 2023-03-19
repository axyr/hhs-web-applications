const collections = require('../controllers/CollectionController');
const categories = require('../controllers/CategoryController');
const items = require('../controllers/ItemController');

const routes = {
    init(router) {
        router.get('/', (req, res) => res.json({title: 'Collection Manager'}));

        router.get('/collections', collections.index);
        router.post('/collections', collections.create);
        router.get('/collections/:id', collections.show);
        router.patch('/collections/:id', collections.update);
        router.delete('/collections/:id', collections.destroy);

        router.get('/collections/:collectionId/categories', categories.index);
        router.get('/collections/:collectionId/items', items.index);

        router.post('/categories', categories.create);
        router.get('/categories/:id', categories.show);
        router.patch('/categories/:id', categories.update);
        router.delete('/categories/:id', categories.destroy);

        router.post('/items', items.create);
        router.get('/items/:id', items.show);
        router.patch('/items/:id', items.update);
        router.delete('/items/:id', items.destroy);
    }
};

module.exports = routes;