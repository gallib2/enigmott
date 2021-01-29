const express = require('express');
const router = express.Router();
const _ = require('lodash');
const httpStatus = require('../httpStatuses');
const {auth} = require('../middleware/auth');
const riddleService = require('./riddleService');
const userService = require('../user/userService');

router.get('/', auth, async function(req, res, next) {

    try {
        // get the riddles
        // get the userRiddle info
        // create suitable array for the client
        //  riddles:
        //      [{riddleId, question, answer, img, markedAsResolved, paint}, {...},]
        // user.riddles = [{riddleId, paint, mark-as-solved}]
        const userId = req.session.userId;
        const riddles = await riddleService.getRiddles();
        console.log('the riddles: ', riddles);
        const userRiddles = await userService.getUserRiddles(userId);
        const resRiddles = riddleService.mergeUserRiddlesWithGeneral({userRiddles, riddles});
        
        res.status(httpStatus.ok).json(resRiddles);

    }
    catch(err) {
        // TODO
        console.log('error in / riddle rout: ', err);
        res.sendStatus(httpStatus.notFound);
    }
})

router.post('/save', auth, async function(req, res, next) {
    const {paint, riddleId} = req.body;
    const userId = req.session.userId;

    try {

        const isSaved = await userService.savePaint({userId, paint, riddleId});
        console.log('---------- is saved? ', isSaved);
        // TODO - handle if not saved

        if(!isSaved) {
            return res.sendStatus(httpStatus.badRequest);
        }

        return res.sendStatus(httpStatus.ok);

    } catch (err) {
        // TODO
        console.log('error in / save rout: ', err);
        res.sendStatus(httpStatus.badRequest);
    }
})

router.post('/solve', auth, async function(req, res, next) {
    const {riddleId, solveState} = req.body;
    const userId = req.session.userId;

    try {

        const isUpdated = await userService.changeSolveState({userId, riddleId, solveState});
        if(!isUpdated) {
            return res.sendStatus(httpStatus.badRequest);
        }
        
        return res.sendStatus(httpStatus.ok);
    } catch (err) {
        // TODO
        console.log('error in / save rout: ', err);
        res.sendStatus(httpStatus.badRequest);
    }
})


module.exports = router;