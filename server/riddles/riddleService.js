const _ = require('lodash');
const dbService = require('../db-service');
const riddles = require('./riddlesJson');

const collectionName = 'riddles';

async function getRiddles() {
    try {
        const docs = riddles;//await dbService.getAllDocumentOfCollection({collectionName});
        return docs;
    } catch (err) {
        console.log('err form get riddles: ', err);
        throw err;
    }
}

//riddles:
        //      [{riddleId, question, answer, img, is_solved, paint, solved_date, start_date}, {...},]
        // user.riddles = [{riddleId, paint, mark-as-solved}]

const riddleClientObject = {
    _id: '',
    question: '',
    answer: '',
    img: '',
    is_solved: false,
    paint: [],
    solved_date: '',
    start_date: ''
}

function mergeUserRiddlesWithGeneral({userRiddles, riddles}) {
    
    if(_.isEmpty(riddles)) return [];

    // console.log('-------------------------- in the merge ---------------')
    const riddlesClient = [];

    for(const riddle of riddles) {
        // console.log('riddle: ', riddle);
        // console.log('userRiddles: ', userRiddles);
        const userRiddle = userRiddles.find(item => item.riddleId == riddle._id) || {};
        // console.log('userRiddle: ', userRiddle)
        const res = Object.assign({}, riddleClientObject, riddle, userRiddle);

        riddlesClient.push(res);
        
        // console.log('res ', res);
        
    }
    
    // console.log('riddlesClient: ', riddlesClient);

    // console.log('-------------------------- end the merge ---------------')

    return riddlesClient;
    
}



module.exports = {
    getRiddles,
    mergeUserRiddlesWithGeneral,
}