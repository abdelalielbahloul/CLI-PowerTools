const mongoose = require('mongoose');

let ContactSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId, 
    name: { 
        type: String, 
        required: [
            true, "Name is required"
        ] 
    },
    number: { 
        type: Number, 
        required: [
            true, "Number is required"
        ] 
    },
    gender: { 
        type: String,
        enum: [
            "male", 
            "female"
        ],   
        required: [
            true,
            (err) => {
                return err;                
            }
        ]
    }
});

let Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;