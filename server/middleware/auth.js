const { isLoggedIn } = require('../auth');
const {BadRequest, Unauthorized} = require('../errors/errors');


function guest(req, res, next) {
    console.log('from guest... req: ', req.session)
    if (isLoggedIn(req)) {
        return next(new BadRequest('You already logged in'))
    }

    next();
}

function auth(req, res, next) {
    console.log('from auth... req: ', req.session)
    if (!isLoggedIn(req)) {
        return next(new Unauthorized('You must be logged in'))
    }

    next();
}

module.exports = { guest, auth };