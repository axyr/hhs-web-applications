require('./../framework/env.js');

const express = require('express');
const cors = require('cors');
const routes = require('./../app/routes/api.js');
const router = express.Router();
const app = express();

const routePrefix = '/api/v1';

// Allow everyone to query the app
app.use(cors());

// Return json responses
app.use(express.json());

// Don't leak information about our system to the big bad world.
app.disable('x-powered-by');

// Load all routes
routes.init(router);

// Set api versioning
app.use(routePrefix, router);

// Start the app with a defined port
app.start = (port) => {
    port = port || 3000;

    app.listen(port, () => console.log(`App listening on port ${port}`));
};

module.exports = app;