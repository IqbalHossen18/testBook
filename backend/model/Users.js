const mongoose = require('mongoose')
const {Schema} = mongoose;

const Userschema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: String,
        // default: ()=> new Date().toDateString()
        default: ()=> new Date().toLocaleDateString() + " , " +  new Date().toLocaleTimeString()
    }
})

module.exports = mongoose.model('user', Userschema);