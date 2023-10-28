const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/testbook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1";

const connectToMongo = () =>{
    try {
         mongoose.connect(mongoURI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
         });
         console.log("connect to Mongodb..")
        
    } catch (error) {
        console.error('Error connecting to mongodb', error)
    }
}

module.exports = connectToMongo;