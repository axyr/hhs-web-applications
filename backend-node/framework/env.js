const path = require('path');
const dotenv = require('dotenv');

const file = process.env.NODE_ENV === 'test' ? '.env.testing' : '.env';

dotenv.config({path: path.resolve(file)});