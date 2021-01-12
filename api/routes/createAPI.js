var express = require('express');
var lib = require('zotzen-lib');
var router = express.Router();

router.get('/', async function(req, res, next) {

    let result = await lib.create();
    res.send(result);
});


module.exports = router;