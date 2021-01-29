
const {BadRequest} = require('../errors/errors');

async function validate(scheme, payload) {
    try {
        await scheme.validateAsync(payload, {abortEarly: false})
    } catch (err) {
        throw new BadRequest(err);
    }

}

module.exports = {
    validate
}