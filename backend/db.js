const mongoose= require("mongoose");
const zod = require("zod")
import { key } from "./key";

mongoose.connect(key)

const userSchema = mongoose.Schema({
    userName:String,
    firstName:String,
    lastName:String,
    password:String,
})
const User = mongoose.model('User',userSchema);

const accountSchema = mongoose.Schema({
    balance: {
    type: Number,
    required:true
    }
,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
    
})
const Account = mongoose.model('Account',accountSchema);
module.exports={
    User,Account
}