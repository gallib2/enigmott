
const {SESSION_NAME} = require('./config/session');

function isLoggedIn(req) {
    console.log('from auth.js, isLoggedin: ', !!req.session.userId);
    return !!req.session.userId;
}

function logIn(req, userId) {
    req.session.userId = userId;
}

function logout(req, res) {
    return new Promise((resolve, reject) => {
        req.session.destroy(err => {
            if(err) reject(err);

            res.clearCookie(SESSION_NAME);
            resolve();
        })
    })
}


module.exports = {
    logIn,
    isLoggedIn,
    logout
};