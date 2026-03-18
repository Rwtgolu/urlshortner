const express = require("express")
const { shorturl, geturl, getuserurls } = require('../controller/url')
const url = require("../models/url")
const authMiddleware = require("../middleware/auth")
const router = express.Router()

router.post('/', authMiddleware, shorturl)

router.get('/user/urls', authMiddleware, getuserurls)

router.get('/all', async (req, res) => {
    const data = await url.find();

    res.send(`
        <html>
        <body>
            <ol>
                ${data.map(u => `<li>${u.shortid} - ${u.redirecturl} - ${u.totalclicks}</li>`).join("")}
            </ol>
        </body>
        </html>
    `);
});

router.get('/:id', geturl)
    
module.exports = router;