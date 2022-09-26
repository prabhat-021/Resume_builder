const mongoose = require('mongoose');
const mongoURI =  "mongodb://localhost:27017";
const connectToMongo = () =>{
    mongoose.connect(mongoURI,()=>{
        console.log("MongoDb is connected succesfully ");
    })
}
module.exports = connectToMongo;