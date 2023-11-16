const express = require('express');
const https=require('https')
const cookieParser = require('cookie-parser');
const session=require('express-session')

const app = express();

// view engine setup

app.set('view engine', 'ejs');

app.use(express.json());
app.use(session({
  secret:'wicbevbnfehibnvefbnvevkefbfovhvebvbefhvbehbhjefvhbhbvbehjb',
  resave:false,
  saveUninitialized:true
}))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const signout=require("./routes/signout")


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/auth',authRouter);
app.use('/signout',signout)

app.listen(4000,()=>{
  console.log('server started in localhost:4000')
})
