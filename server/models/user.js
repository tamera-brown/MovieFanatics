const mogoose=require("mongoose")

const UserSchema=mogoose.Schema({
    username:{type:String,maxlength:15,required:true,unique:true},
    email:{type:String,unique:true,require:true},
    password:{type:String,minlength:6},
    profilePic: { type: String, defaut: "" },
    
})
module.exports=mogoose.model('users',UserSchema)


