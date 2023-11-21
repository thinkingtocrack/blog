const express=require('express')
const router=express.Router()
const mongoose = require('mongoose')
const users = require('../model/users')
const bcrypt = require('bcrypt')

router.get('/',(req,res)=>{
    res.render('signup')
})

router.post('/', async (req, res) => {
    let data = {...req.body}
    data.name=`${data.fname} ${data.sname}`
    delete data.fname
    delete data.sname
    data.admin_access=false
    data.password = await bcrypt.hash(data.password, 10)
    const check = await users.find({ username: data.username })
    if (check[0]) {
        res.render('signup', { pass: true })
    } else {
        await users.create(data)
        res.redirect('/')
    }
})

module.exports=router