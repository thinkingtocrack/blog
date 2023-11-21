const express = require('express')
const router = express.Router()
const mongoose=require('mongoose')
const users=require('../model/users')
const bcrypt=require('bcrypt')


mongoose.connect('mongodb://127.0.0.1:27017/xpro')


const seq=(req,res,next)=>{
    if(req.session.authadmin){
        res.setHeader('Cache-Control', 'no-store');
        next()
    }else{
        res.render('index',{title:'xpro',pass:'err'})
    }
}

router.get('/',seq,async(req,res)=>{
    let data=''
    if(req.query.user){
        data = await users.find({$or:[{username:req.query.user},{name:req.query.user}]})
    }else{
        data = await users.find({})
    }
    const user = req.session.data
    res.render('admin',{data,user})
})

router.post('/edit',seq,async(req,res)=>{
    const data = req.session.data
    const user=await users.find({username:req.body.user})
    res.render('adminEdit',{user,data})
})

router.post('/delete',seq,async(req,res)=>{
    const user=req.body.username
    await users.findOneAndDelete({username:user})
    res.redirect('/admin')
})

router.get('/newuser',seq,async(req,res)=>{
    res.render('newuser',{pass:false,data:req.session.data})
})


router.post('/newuser',seq,async(req,res)=>{
    let data=req.body
    data.admin_access = data.admin_access.toLowerCase() === "false" ? false : true;
    data.password=await bcrypt.hash(data.password,10)
    const check=await users.find({username:data.username})
    if(check[0]){
        res.render('newuser',{pass:true})
    }else{
        await users.create(data)
        res.redirect('/admin')
    }
})

router.post('/edit/submit',seq,async(req,res)=>{
    const data=req.body 
    const original=data.original
    const p={name:original}
    const user=await users.find({username:original},{password:1,_id:0,username:1,name:1,admin_access:1})
    data.admin_access = data.admin_access.toLowerCase() === "false" ? false : true;
    let password
    bcrypt.compare(data.password,user[0].password,async function(err,result){
    if(result){
        res.render('adminEdit',{user,data:p,passworderr:true})
    }else if(data.password===''){
        await users.findOneAndUpdate({username:original},
        {$set:{
            username:data.username===''?user[0].username:data.username,
            name:data.name===''?user[0].name:data.name,
            admin_access:data.admin_access
        }},{ new: true })
        res.redirect('/admin')
    }
    else{
        password= await bcrypt.hash(data.password,10)
        await users.findOneAndUpdate({username:original},
        {$set:{
            username:data.username===''?user[0].username:data.username,
            password:password,
            name:data.name===''?user[0].name:data.name,
            admin_access:data.admin_access
        }},{ new: true })
        res.redirect('/admin')
    }})
})


module.exports=router