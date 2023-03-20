const {validationResult} = require('express-validator');

class Validator {
    constructor(req) {
        this.req = req;
        this.hasBeenValidated = false;
        this.messages = [];
    }

    async rules() {
        throw new Error('Rules should be implemented in subclasses.');
    }

    async fails() {
        if (!this.hasBeenValidated) {
            await this.validate();
        }

        return this.messages.length > 0;
    }

    async validate() {
        await this.rules();

        const validationResults = validationResult(this.req);

        if (!validationResults.isEmpty()) {
            this.messages = validationResults.array();
        }

        this.hasBeenValidated = true;

        return this.messages;
    }

    errors() {
        const errors = {};
        this.messages.forEach(function (error) {
            errors[error.param] = error.msg;
        });

        return {
            errors
        };
    }
}

module.exports = Validator;