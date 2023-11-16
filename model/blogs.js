const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const blogSchema=new Schema({
    'blog.title':{type:String},
    'blog.content':{type:String}
})

module.exports=mongoose.model('blog',blogSchema)