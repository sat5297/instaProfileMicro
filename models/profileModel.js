let mongoose = require('mongoose');

let profileSchema = mongoose.Schema({
    userMail : {
        type : String,
    },
    userName : {
        type : String,
    },
    profileName : {
        type : String,
    },
    userBio : {
        type : String,
    }
});

let Profile = module.exports = mongoose.model('Profile', profileSchema);
