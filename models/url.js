const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortid:{
        type:String,
        unique:true,
        required:true

    },
    totalclicks:{
        type:Number,
        default:0

    },
    redirecturl:{
        type:String,
        required:true
    
    },
},
 {timestamps:true});


const Url = mongoose.model('Url',urlSchema);

module.exports = Url;
