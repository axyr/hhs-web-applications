const {check} = require('express-validator');
const Validator = require('../../../framework/Validator.js');

class ItemValidator extends Validator {
    async rules() {
        await check('name').notEmpty().withMessage('is required').run(this.req);

        await check('img').notEmpty().withMessage('is required').run(this.req);

        await check('collectionId')
            .notEmpty().withMessage('is required')
            .isInt().withMessage('must be an integer')
            .run(this.req);

        await check('categoryId')
            .notEmpty().withMessage('is required')
            .isInt().withMessage('must be an integer')
            .run(this.req);
    }
}

module.exports = ItemValidator;