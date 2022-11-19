let mongoose = require('mongoose');

let followerSchmema = mongoose.Schema({
    userMail : {
        type : String,
    },
    userName : {
        type : String,
    },
    userFollower : {
        type : Array,
    }
});

let Follower = module.exports = mongoose.model('Follower', followerSchmema);