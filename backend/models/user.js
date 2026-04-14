const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate:{
            functoion(value){
                const emailregex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if(!emailregex.test(value)){
                    throw new Error("invalid email format")
                }
            }
        }

    },
    password:{
        type:String,
        required:true,
        min:8,
        max:14,
        validate:{
            function (value){
                const passregex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
                if(!passregex.test(value)){
                    throw new Error("password must be at least 8 characters long and contain at least one letter and one number")
                }       
            }
        }
        
    }
},{timestamps:true})
const user=mongoose.model('User',userSchema);


module.exports=user;