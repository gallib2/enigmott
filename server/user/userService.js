const { hash, compare } = require('bcryptjs');
const _ = require('lodash');
const dbService = require('../db-service');
const {ObjectId} = require('mongodb');
const { BCRYPT_WORK_FACTOR } = require('../config/auth');

const userCollection = 'users';


async function _getUserFromDB(query) {
    try {
        const user = await dbService.getDocumentOfCollectionByQuery({
            collectionName: userCollection,
            query: query
        });

        return user;

    } catch (err) {
        console.log('error in getUserFromDB: ', err);
        throw err;
    }
}


async function getUserFromDB(email) {
    const query = { email: email };
    return await _getUserFromDB(query);
}

async function _getHashedPassword(password) {
    const hashPassword = await hash(password, BCRYPT_WORK_FACTOR);

    return hashPassword;
}

async function getMatchesPassword(password, dbPassword) {
    const isMatch = await compare(password, dbPassword);
    console.log('is passeord match: ', isMatch)
    return isMatch;
}

async function ceateUser(email, userName, password) {
    try {
        const hashPassword = await _getHashedPassword(password);
        const user = {
            email: email,
            user_name: userName,
            password: hashPassword,
            created_date: (new Date()).toISOString()
        }

        return await dbService.createDocumentofCollection({ collectionName: userCollection, data: user })

    } catch (err) {
        console.log('error in ceateUser: ', err);
        throw err;
    }
}

async function getUser(email) {
    const query = { email: email }
    // TODO G - await??
    const user = await _getUserFromDB(query);

    return user && user[0];
}

async function getUserRiddles(userId) {
    const query = {"_id" : ObjectId(userId)}
    const user = await _getUserFromDB(query);

    const isHaveRiddles = !_.isEmpty(user) && user[0] && !_.isEmpty(user[0].riddles);

    if(isHaveRiddles) return user[0].riddles;

    return [];
}


async function savePaint({userId, paint, riddleId}) {

    const isSaved = await dbService.updateUserPaint({collectionName: userCollection, userId, paint, riddleId});
    return isSaved;

}

async function changeSolveState({userId, riddleId, solveState}) {
    const isSaved = await dbService.updateSolvedState({collectionName: userCollection, userId, solveState, riddleId});
    return isSaved;
}

module.exports = {
    getUserFromDB,
    ceateUser,
    getUser,
    getMatchesPassword,
    getUserRiddles,
    savePaint,
    changeSolveState
}