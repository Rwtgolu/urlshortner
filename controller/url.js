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

async function geturl(req,res){
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
    }


module.exports={
    shoturl,
    geturl,
    
}