const mongoose = require('mongoose');
const {Schema} = mongoose;

const Noteschema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: 'general'
    },
    date:{
        type: String,
        default: ()=> new Date().toLocaleDateString() + " , " +  new Date().toLocaleTimeString()
    }
})

module.exports = mongoose.model('notes', Noteschema)