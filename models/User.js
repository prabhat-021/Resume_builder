const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },

    email:{
        type:String,
        unique:true,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    resumedata:{
        type:Array
    }
    
    

},
{
    timestamps:true
});
const User = mongoose.model('User',userSchema); // here first parameter is a collection name 
module.exports = User;

