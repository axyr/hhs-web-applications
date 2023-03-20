const {check} = require('express-validator');
const Validator = require('../../../framework/Validator.js');

class CollectionValidator extends Validator {
    async rules() {
        await check('name').notEmpty().withMessage('is required').run(this.req);
        await check('owner').notEmpty().withMessage('is required').run(this.req);
        await check('logo').notEmpty().withMessage('is required').run(this.req);
        await check('brandColor').notEmpty().withMessage('is required').run(this.req);
    }
}

module.exports = CollectionValidator;