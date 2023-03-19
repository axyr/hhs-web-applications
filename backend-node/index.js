const app = require('./bootstrap/app.js');

const port = process.env.PORT || 8080;

app.start(port);