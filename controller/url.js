const {nanoid} =require("nanoid")
const url=require('..models/url')



async function shoturl(req,res){
const shortiD=nanoid(8);
if(!ReportBody.url) return res.status(400).json("url is not avilabil");
await url.create({
shortid:shortiD,
rediretid:body.url,
})
return res.json({id:shortiD})
}


module.exports={
    shoturl,
}