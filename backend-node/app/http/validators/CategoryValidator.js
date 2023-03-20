const {check} = require('express-validator');
const Validator = require('../../../framework/Validator.js');

class CategoryValidator extends Validator {
    async rules() {
        await check('name').notEmpty().withMessage('is required').run(this.req);

        await check('collectionId')
            .notEmpty().withMessage('is required')
            .isInt().withMessage('must be an integer')
            .run(this.req);
    }
}

module.exports = CategoryValidator;