require('./../framework/env.js');

const express = require('express');
const cors = require('cors');
const router = require('./../app/routes/api.js');

const app = express();

app.use(cors());

app.use(express.json());

// Don't leak information about our system to the big bad world.
app.disable('x-powered-by');

// Load all routes
router.init(app);

app.start = (port) => {
    port = port || 3000;

    app.listen(port, () => console.log(`App listening on port ${port}`));
};

module.exports = app;