import './../framework/env.js';
import express from 'express';
import {router} from './../app/routes/api.js';

const app = express();

app.use(express.json());

// Don't leak information about our system to the big bad world.
app.disable('x-powered-by');

// Load all routes
router.init(app);

app.start = (port) => {
    port = port || 3000;

    app.listen(port, () => console.log(`App listening on port ${port}`));
}

export {
    app
}