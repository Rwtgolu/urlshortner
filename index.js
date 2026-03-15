const express = require('express');
const app= express();
const port = 3000;
const urlroute=require("./routes/url")

const mongo=require("./connect")
mongo("mongodb://127.0.0.1:27017/shorturl")
.then(()=>console.log("mongo is connected "))
.catch((err)=>console.log("mongo connection error: ", err))

app.use(express.json());
app.use('/url',urlroute);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
