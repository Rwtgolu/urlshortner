const shortid =require("shortid")
const url=require("../models/url")


async function shoturl(req,res){
try {
const shortiD=shortid()
if(!req.body.url) return res.status(400).json("url is not available");
await url.create({
shortid:shortiD,
redirecturl:req.body.url,
})
return res.json({id:shortiD})
} catch(err) {
return res.status(500).json({error: err.message})
}
}


module.exports={
    shoturl,
}