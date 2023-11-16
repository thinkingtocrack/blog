const mongoose  = require("mongoose")
const Schema=mongoose.Schema;

const usersSchema=new Schema({
    username:{type:String},
    password:{type:String},
    admin_access:{type:Boolean},
    name:{type:String}
})

module.exports=mongoose.model('user',usersSchema)
