const express = require("express")
const { shoturl,geturl } = require('../controller/url')
const url = require("../models/url")
const router = express.Router()

router.post('/', shoturl)
router.get('/:id', geturl)
    
module.exports = router;