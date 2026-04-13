require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const port = 3009;


const urlroute = require("./routes/url")

const handleuser = require("./routes/user")

const mongo = require("./connectdb/connect")

mongo("mongodb://127.0.0.1:27017/shorturl")
    .then(() => console.log("mongo is connected "))
    .catch((err) => console.log("mongo connection error: ", err))

app.use(cors());
app.use(express.json());

app.use('/url', urlroute);
app.use('/user', handleuser)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
