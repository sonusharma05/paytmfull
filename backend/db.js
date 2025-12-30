const mongoose= require("mongoose");
const zod = require("zod")


mongoose.connect("mongodb+srv://admin:admin@cluster0.ld2jq.mongodb.net/paytmapp")

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