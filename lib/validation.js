const Joi = require('joi');

const AUTH_SCHEMA = Joi.object().keys({
    email: Joi.string().email(),
    pass: Joi.string().min(5)
}).without('email', 'pass').without('pass', 'email');

const USER_SCHEMA = Joi.object().keys({
    name: Joi.string().min(2).required()
}).concat(AUTH_SCHEMA);

const VALIDATION_OPTIONS = {
    convert: true
};

const validation = {
    validateUser(user) {
        return Joi.validate(user, USER_SCHEMA, VALIDATION_OPTIONS).error;
    },

    validateDeleteParams(params) {
        return Joi.validate(params, AUTH_SCHEMA, VALIDATION_OPTIONS).error;
    }
};

module.exports = validation;

if (!module.parent) {
    const assert = require('assert');

    const validUsers = [
        { name: 'Maciej' },
        { name: 'Aga', pass: '12345' },
        { name: 'Waaat', email: 'wat@wat.com' }
    ];

    validUsers.forEach(u => {
        assert(!validation.validateUser(u));
    });

    const invalidUsers = [
        { name: 'B' }, // name too short
        { name: 'Aga', pass: '123' }, // pass too short
        { name: 'Waaat', email: 'wat' }, // email invalid
        { name: 'Waaat', email: 'wat@wat.com', pass: 'watwat' } // both email and pass specified
    ];

    invalidUsers.forEach(u => {
        assert(validation.validateUser(u));
    });
}