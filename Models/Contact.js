const mongoose = require('mongoose');

let ContactSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    contactName: {
        type: String,
        required: [
            true, "contactName is required"
        ],
        unique: [
            true, "Duplicated contact name"
        ]
    },
    fullName: { 
        type: String, 
        required: [
            true, "Name is required"
        ] 
    },
    number: { 
        type: String, 
        required: [
            true, "Phone Number is required"
        ],
        unique: [
            true, "Duplicated Phone Number"
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
},{ timestamps: { createdAt: true, updatedAt: true } });

let Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;