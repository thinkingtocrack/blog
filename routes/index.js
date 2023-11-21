const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const valid =req.query.login
  if(req.session.auth){
    res.redirect('/users')
  }else{
    res.render('index', { title: 'Xpro',pass:'',valid})
  }
});

router.get('/ad', function(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const valid =req.query.login
  if(req.session.authadmin){
    res.redirect('/admin')
  }else{
    res.render('index', { title: 'Xpro',pass:'',valid,admin:true})
  }
});



module.exports = router;
