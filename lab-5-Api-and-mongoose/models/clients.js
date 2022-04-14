const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true
      },
    firstName:  String, 
    lastName:  String, 
    username: {
        type: String,
        unique: true
      },
    phone: String
})

module.exports = mongoose.model('client', clientSchema);