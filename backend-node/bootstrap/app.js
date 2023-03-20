require('./../framework/env.js');

const express = require('express');
const cors = require('cors');
const routes = require('./../app/routes/api.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../docs/swagger.json');
const consts = require('../framework/consts');
const router = express.Router();

const routePrefix = '/api/v1';

const app = express();

// Allow everyone to query the app
app.use(cors());

// Return json responses
app.use(express.json());

// Don't leak information about our system to the big bad world.
app.disable('x-powered-by');

// Load all routes
routes.init(router);

// Redirect root to api root with docs
app.get('/', function (req, res) {
    res.redirect(routePrefix);
});

// Set api versioning
app.use(routePrefix, router);

app.get('*', function (req, res) {
    res.status(consts.HTTP_NOT_FOUND).send('404 Not found');
});

// Start the app with a defined port
app.start = (port) => {
    port = port || 8080;

    app.listen(port, () => console.log(`App listening on port ${port}`));
};

module.exports = app;