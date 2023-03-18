const app = require('./bootstrap/app.js');

const port = process.env.PORT || 3000;

app.start(port);