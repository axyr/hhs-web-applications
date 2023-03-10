const collections = require('../controllers/CollectionController');

const router = {
    init(app) {
        app.get('/', (req, res) => res.json({title: 'Hello World!'}));

        app.get('/collections', collections.index);
        app.post('/collections', collections.create);
        app.get('/collections/:id', collections.show);
        app.patch('/collections/:id', collections.update);
        app.delete('/collections/:id', collections.destroy);
    }
};

module.exports = router;