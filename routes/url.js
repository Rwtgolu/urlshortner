const express = require("express")
const { shoturl } = require('../controller/url')
const url = require("../models/url")
const router = express.Router()

router.post('/', shoturl)
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ error: "id is not available" });
        
        const urldata = await url.findOne({ shortid: id });
        if (!urldata) return res.status(404).json({ error: "url not found" });
        
        await url.findOneAndUpdate({ shortid: id }, { totalclicks: urldata.totalclicks + 1 });
        return res.redirect(urldata.redirecturl);
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
})
module.exports = router;