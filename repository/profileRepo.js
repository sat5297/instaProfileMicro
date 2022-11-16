if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv').config({path : `${__dirname}/../.env`});
}

const { MongoClient } = require('mongodb');
const URI = process.env.DB_URL;
const client = new MongoClient(URI);

let Profile = require('../models/profileModel');
let Follower = require('../models/followerModel');

const getProfile = async (body) => {
    console.log(body, "repo");
    await client.connect();
    const profileCollection = client.db("instaProfileDB").collection("profiles");
    try{
        const getUser = await profileCollection.find({userName : body.userName}).toArray();
        console.log(getUser);
        return getUser;
    }
    catch(err){
        return err;
    }
};

const createProfile = async(body) => {
    await client.connect();
    console.log(body);
    const userProfileObj = new Profile(body);
    // const userProfileObj = {
    //     userName : body.userName,
    //     profileName : body.profileName,
    //     userBio : body.userBIO
    // }
    const profileCollection = client.db("instaProfileDB").collection("profiles");
    try{
        const createUserProfile = await profileCollection.insertOne(userProfileObj);
        console.log(createUserProfile);
        return createUserProfile.acknowledged;
    }
    catch(err){
        return {"status" : "Failure", "data" : err};
    }
};

const updateProfile = async(body) => {
    await client.connect();
    console.log(body);
    const updateProfileObj = new Profile(body);
    const profileCollection = client.db("instaProfileDB").collection("profiles");
    try{
        const updateUserProfile = await profileCollection.updateOne({userName : body.userName}, {$set:{
            "userName" : body.userName,
            "profileName" : body.profileName,
            "userBio" : body.userBIO
        }});
        console.log(updateUserProfile);
        return updateUserProfile;
    }
    catch(err){
        return {"status" : "Failure", "data" : err};
    }
};

const deleteProfile = async(body) => {
    await client.connect();
    console.log(body);
    const profileCollection = client.db("instaProfileDB").collection("profiles");
    try{
        const deleteUserProfile = await profileCollection.deleteOne({userName : body.userName});
        console.log(deleteUserProfile);
        return deleteUserProfile.acknowledged;
    }
    catch(err){
        return {"status" : "Failure", "data" : err};
    }
};

const searchProfile = async(body) => {
    await client.connect();
    const searchOptions = {};
    if(body.userName != null && body.userName !== ""){
        searchOptions.userName = new RegExp(body.userName);
    }
    const profileCollection = client.db("instaProfileDB").collection("profiles");
    try{
        const findUsers = await profileCollection.find(searchOptions).toArray();
        return findUsers;
    }
    catch(err){
        return {"status" : "Failure", "data" : err};   
    }
};

const addFollower = async(body) => {
    await client.connect();
    const findUser = {userMail : body.userMail}; 
    console.log(body, findUser)
    const followerCollection = client.db("instaProfileDB").collection("followers");
    const followingCollection = client.db("instaProfileDB").collection("following");
    try{
        const addUserFollower = await followerCollection.insertOne(body);
        const addUserFollowing = await followingCollection.insertOne(body);
        console.log(addUserFollower);
        return [addUserFollower,addUserFollowing];
    }
    catch(err){
        return {"status" : "Failure", "data" : err};   
    }
};

const removeFollower = async(body) => {
    console.log(body, "h1");
    await client.connect();
    const profileCollection = client.db("instaProfileDB").collection("followers");
    try{
        const deleteUserFollower = await profileCollection.updateOne({"userName" : body.userName}, {
            $pull : {'userFollower' : body.userFollower}
        });
        console.log(deleteUserFollower);
        return deleteUserFollower;
    }
    catch(err){
        return {"status" : "Failure", "data" : err};   
    }
};

const addFollowing = async(body) => {
    console.log(body);
    await client.connect();
    const profileCollection = client.db("instaProfileDB").collection("following");
    try{

    }
    catch(err){
        return {"status" : "Failure", "data" : err};   
    }
};

const removeFollowing = async(body) => {
    console.log(body, "h1");
    await client.connect();
    const profileCollection = client.db("instaProfileDB").collection("following");
    try{

    }
    catch(err){
        return {"status" : "Failure", "data" : err};   
    }
};

module.exports = {
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    searchProfile,
    addFollower,
    removeFollower,
    addFollowing,
    removeFollowing
};
