let mongoose = require('mongoose');

let profileSchema = mongoose.Schema({
    userMail : {
        typeof : String,
        required : true
    },
    userName : {
        typeof : String,
        required : true
    },
    profileName : {
        typeof : String,
        required : true
    },
    userBio : {
        typeof : String,
        required : true
    }
});

let Profile = module.exports = mongoose.model('Profile', profileSchema);

const followerObj = {
    "userMail" : "userMail",
    "userName" : "userName",
    "userFollowers" : ["userFollowers"]
};

const followingObj = {
    "userMail" : "userMail",
    "userName" : "userName",
    "userFollowing" : ["userFollowing"]
};

