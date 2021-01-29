const express = require('express');
const router = express.Router();
const _ = require('lodash');
const httpStatus = require('../httpStatuses');
const userService = require('./userService');
const {registerScheme, loginScheme} = require('../validation/auth');
const {validate} = require('../validation/joi');
const {logIn, logout, isLoggedIn} = require('../auth');
const {guest, auth} = require('../middleware/auth');

router.post('/signup', guest, async function(req, res){
    const {email, username, password} = req.body;

    try {
        await validate(registerScheme, req.body);
        const user = await userService.getUserFromDB(email);
        const isUserExsists = !_.isEmpty(user);

        if(isUserExsists) {
           return res.status(httpStatus.badRequest).json({msg: 'Invalid email'});
        }

        const newUser = await userService.ceateUser(email, username, password);
        
        logIn(req, newUser.insertedId);

        res.status(httpStatus.ok).json({});
    } catch(err) {
        console.log('error in /signup: ', err);
        res.sendStatus(httpStatus.badRequest);
    }
});

router.get('/login/auth', (req, res) => {
    try {

        if(isLoggedIn(req)) {
            return res.status(httpStatus.ok).json({'auth':true});
        }

        res.status(httpStatus.ok).json({'auth': false});

    } catch (err) {
        console.log('err from /login/auth ', err);
        if(err.status && err.message) {
            return res.status(err.status).json({message: err.message});
        }
        return res.sendStatus(httpStatus.badRequest)
    }
})

router.post('/login', guest, async function(req, res){
    const {email, password} = req.body;

    try {
        await validate(loginScheme, {email, password});
        const user = await userService.getUser(email, password);

        if(_.isEmpty(user) || !(await userService.getMatchesPassword(password, user.password))) {
            req.sendStatus(httpStatus.unauthorized);
        }

        logIn(req, user._id);

        res.status(httpStatus.ok).json({});
    } catch(err) {
        console.log('error in /login: ', err);
        res.sendStatus(httpStatus.badRequest);
    }
});

router.post('/logout', auth, async function(req, res){
    try {

        await logout(req, res);
        console.log('after logout... ')


        res.status(httpStatus.ok).json({});
    } catch(err) {
        console.log('error in /logout: ', err);
        res.sendStatus(httpStatus.badRequest);
    }
});

module.exports = router;