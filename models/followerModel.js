let mongoose = require('mongoose');

let followerSchmema = mongoose.Schema({
    userMail : {
        typeof : String,
        required : true
    },
    userName : {
        typeof : String,
        required : true
    },
    userFollower : {
        typeof : String,
        required : true
    }
});

let Follower = module.exports = mongoose.model('Follower', followerSchmema);