const httpStatus = require("../httpStatuses");


class BadRequest extends Error {
    constructor(message = 'Bad Request') {
        super(message);

        this.status = httpStatus.badRequest;
    }
}

class Unauthorized extends Error {
    constructor(message = 'Bad Request') {
        super(message);

        this.status = httpStatus.unauthorized;
    }
}


module.exports = {BadRequest, Unauthorized}
