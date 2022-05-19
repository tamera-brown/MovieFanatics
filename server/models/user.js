const mogoose=require("mongoose")

const UserSchema=mogoose.Schema({
    firstName:{type:String,maxlength:50},
    lastName:{type:String,maxlength:50},
    email:{type:String,unique:1,trim:true},
    password:{type:String,minlength:6}
})
const User=mogoose.model('users',UserSchema)

module.exports={User}

