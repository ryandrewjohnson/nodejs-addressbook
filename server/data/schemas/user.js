var user = {
    openId: {
        type: String,
        index: true
    },
    username: {
        type: String,
        index: true,
        lowercase: true,
        required: 'required',
        match: [ /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "The email provided ({VALUE}) is invalid."]
    },
    password: {
        type: String,
        match: [ /^.{8,25}$/, "Your password must be 8 to 25 characters."]
    }
};

module.exports = user;