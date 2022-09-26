const express =require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 8000;

var flash = require('connect-flash');

//connecting database
const connectToMongo = require('./config/db');
connectToMongo();
//used for session cookie -
// const session = require('express-session');y
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded()); 
//using cookie -- 
app.use(cookieParser());
app.use(express.static('assets'));

app.use(flash());

//setup the view engine --
app.set('view engine','ejs');
app.set('views','./views');


//using express session  // mongo store is used to store the session cookie in db
app.use(session ({

    name:"Ineuron",
    secret:"blahsomething", //encode decode key 
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge:(1000*60*10)},  //time how long our cookie remain valid // session time  in milisecond
    store:new MongoStore({
        
            mongoUrl:'mongodb://localhost:27017',
            autoRemove:'disabled' 
        
    },function(err){
        console.log(err );
    })
}))
app.use(passport.initialize());
app.use(passport.session());


//use express router --
app.use('/',require('./routes'))



//listening our server -- 
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:  ${err}`);
    }
    console.log("Your server is running on port",port);
})