const express = require('express');
const router = express.Router();
const dbService = require('./db-service');

router.get('/', async function (req, res) {
  try {
    const collectionName = 'riddles'
    const docs = await dbService.getAllDocumentOfCollection({collectionName});
    console.log('docs from the get... ', docs);

    const query = {'answer':'because'}
    const docs2 = await dbService.getDocumentOfCollectionByQuery({collectionName, query});
    console.log('docs from the get2... ', docs2);
  } catch(err) {
    console.log('error in /paint conneting to mongo, error: ', err);
  }


  res.send('Hello Paint');
});

module.exports = router;

