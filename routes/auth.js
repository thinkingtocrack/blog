const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const users=require('../model/users')
const bcrypt=require('bcrypt')

mongoose.connect('mongodb://127.0.0.1:27017/xpro')


router.post('/',async(req,res)=>{ 
    const user= await users.findOne({username:req.body.email},{password:1,admin_access:1,name:1})
    if(user){
        bcrypt.compare(req.body.password,user.password,function(err,result){
            if(result){
                if(user.admin_access){
                    if(req.query.admin){
                        req.session.authadmin = true;
                        req.session.data = user;
                        res.redirect('/admin')
                    }else{
                        res.redirect('/?login=invalid')
                    }
                }else{
                    req.session.auth=true;
                    req.session.data=user;
                    res.redirect('/users')
                }
            }else{
                if(req.query.admin){
                    res.redirect('/ad?login=invalid')
                }else{
                    res.redirect('/?login=invalid')
                }  
            }
        })
    }else{
        if (req.query.admin) {
            res.redirect('/ad?login=invalid')
        } else {
            res.redirect('/?login=invalid')
        } 
    }
})

module.exports=router;