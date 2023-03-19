const app = require('./bootstrap/app.js');

const port = process.env.PORT || 80;

app.start(port);