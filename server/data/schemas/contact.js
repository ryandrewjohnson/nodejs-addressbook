var mongoose        = require('mongoose'),
    Schema          = mongoose.Schema,
    contact;

contact = {
    _user: {
        type: Schema.ObjectId, 
        ref: 'User',
        index: true,
        required: 'required' 
    },
    name: {
        givenName: {
            type: String, 
            required: 'required' 
        },
        familyName: {
            type: String, 
            required: 'required'
        }
    },
    email: {
        type: String,
        lowercase: true,
        required: 'required',
        match: [ /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "The email provided ({VALUE}) is invalid!"]
    },
    address: {
        city: {
            type: String,
            required: 'required'
        },
        street: {
            type: String,
            required: 'required'
        },
        region: {
            type: String,
            required: 'required'
        },
        postcode: {
            type: String,
            required: 'required'
        },
        country: {
            type: String,
            required: 'required'
        }
    }
};

module.exports = contact;