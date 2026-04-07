const express = require("express")
const { shorturl, geturl, getuserurls,allurls } = require('../controller/url')
const url = require("../models/url")
const authMiddleware = require("../middleware/auth")
const router = express.Router()


router.post('/', authMiddleware, shorturl)

router.get('/user/urls', authMiddleware, getuserurls)

router.get('/all', authMiddleware,allurls);

router.get('/:id', geturl)
    
module.exports = router;