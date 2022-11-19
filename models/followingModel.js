let mongoose = require('mongoose');

let followingSchmema = mongoose.Schema({
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

let Following = module.exports = mongoose.model('Following', followingSchmema);