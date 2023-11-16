const express=require('express')
const router=express.Router()

router.get('/',(req,res)=>{
    if(req.query.name==='admin'){
       req.session.authadmin=false
       res.redirect('/ad')
    }else{
        console.log(req.query.name)
        req.session.auth=false
        res.redirect('/')
    }
})

module.exports=router
