const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { 
        type: String, 
        required: true
    }, 
    email: { 
        type: String, 
        required: true
    }, 
    password: {
        type: String, 
        required:true, 
        minLength: 8
    },
    date: {
        type: Date, 
        default: Date.now()
    }
})

//user the schema to build the model as such: 
const User = mongoose.model('User', userSchema)

//export the model for use in other files (in this case using this in index.js in models folder)
module.exports = User;