const express = require('express');
const router = express.Router();
const mongoose=require('mongoose')
const blogs=require('../model/blogs')

mongoose.connect('mongodb://127.0.0.1:27017/xpro')



/* GET users listing. */
const seq =(req,res,next)=>{
  if(req.session.auth){
   res.setHeader('Cache-Control', 'no-store');
    return next()
  }else{
    res.render('index',{title:'xpro',pass:'err'})
  }
}

router.get('/', seq,async(req, res)=> {
  const blog=await blogs.find({},{blog:1,_id:0})
  res.render('users',{blog,user:req.session.data});
});

router.get('/search',seq,async(req,res)=>{
  const regex = new RegExp(req.query.blog, 'i');
  const blog=await blogs.find({'blog.title':regex})
  res.render('users',{blog,user:req.session.data})
})

module.exports = router;
