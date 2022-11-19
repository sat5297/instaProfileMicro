if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv').config({path : `${__dirname}/../.env`});
}

const { MongoClient } = require('mongodb');
const URI = process.env.DB_URL;
const client = new MongoClient(URI);

let Profile = require('../models/profileModel');
let Follower = require('../models/followerModel');
const Following = require('../models/followingModel');

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

//This function creates the user Profile for profile, followers and following.
const createProfile = async(body) => {
    await client.connect();
    console.log(body);
    const userProfileObj = new Profile(body);
    const userFollowerObj = new Follower(body);
    const userFollowingObj = new Following(body);
    console.log(userProfileObj, userFollowerObj, userFollowingObj);
    const profileCollection = client.db("instaProfileDB").collection("profiles");
    const followerCollection = client.db("instaProfileDB").collection("followers");
    const followingCollection = client.db("instaProfileDB").collection("following");
    try{
        const createUserProfile = await profileCollection.insertOne(userProfileObj);
        const createUserFollowers = await followerCollection.insertOne(userFollowerObj);
        const createUserFollowing = await followingCollection.insertOne(userFollowingObj);
        console.log(createUserProfile, createUserFollowers, createUserFollowing);
        return [createUserProfile.acknowledged, createUserFollowers.acknowledged, createUserFollowing.acknowledged];
    }
    catch(err){
        return {"status" : "Failure", "data" : err};
    }
};

const updateProfile = async(body) => {
    await client.connect();
    const updateProfileObj = new Profile(body);
    console.log(body, updateProfileObj);
    const profileCollection = client.db("instaProfileDB").collection("profiles");
    const followerCollection = client.db("instaProfileDB").collection("followers");
    const followingCollection = client.db("instaProfileDB").collection("following");
    try{
        const updateUserProfile = await profileCollection.findOneAndUpdate({userMail : updateProfileObj.userMail}, {$set:{
            "userName" : updateProfileObj.userName,
            "profileName" : updateProfileObj.profileName,
            "userBio" : updateProfileObj.userBio
        }});
        const updateUserFollower = await followerCollection.findOneAndUpdate({userMail : updateProfileObj.userMail}, {$set:{
            "userName" : updateProfileObj.userName
        }});
        const updateUserFollowing = await followingCollection.findOneAndUpdate({userMail : updateProfileObj.userMail}, {$set:{
            "userName" : updateProfileObj.userName
        }})
        console.log(updateUserProfile, updateUserFollower, updateUserFollowing);
        return [updateUserProfile.value, updateUserFollower.value, updateUserFollowing.value];
    }
    catch(err){
        return {"status" : "Failure", "data" : err};
    }
};

const deleteProfile = async(body) => {
    await client.connect();
    console.log(body);
    const userProfileObj = new Profile(body);
    const profileCollection = client.db("instaProfileDB").collection("profiles");
    const followerCollection = client.db("instaProfileDB").collection("followers");
    const followingCollection = client.db("instaProfileDB").collection("following");
    try{
        const deleteUserProfile = await profileCollection.deleteOne({userMail : userProfileObj.userMail});
        const deleteUserFollower = await followerCollection.deleteOne({userMail : userProfileObj.userMail});
        const deleteUserFollowing = await followingCollection.deleteOne({userMail : userProfileObj.userMail});
        console.log(deleteUserProfile, deleteUserFollower, deleteUserFollowing);
        return [deleteUserProfile.acknowledged, deleteUserFollower.acknowledged, deleteUserFollowing.acknowledged];
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
    const findFollower = {userMail : body.userFollower[1]};
    const addFollowing = {
        userMail : body.userMail,
        userName : body.userFollower[0],
        userFollower : [body.userName]
    };
    console.log(body, findUser, addFollowing, findFollower);
    const followerCollection = client.db("instaProfileDB").collection("followers");
    const followingCollection = client.db("instaProfileDB").collection("following");
    try{
        const addUserFollower = await followerCollection.findOneAndUpdate(findUser, {
            $push : {'userFollower' : addFollowing.userFollower[0]}
        });
        const addUserFollowing = await followingCollection.findOneAndUpdate(findFollower, {
            $push : {'userFollower' : addFollowing.userName}
        });
        console.log(addUserFollower, addUserFollowing);
        return [addUserFollower,addUserFollowing];
    }
    catch(err){
        return {"status" : "Failure", "data" : err};   
    }
};

const removeFollower = async(body) => {
    const userFollower = new Follower(body);
    console.log(body, "h1", userFollower);
    await client.connect();
    const followerCollection = client.db("instaProfileDB").collection("followers");
    const followingCollection = client.db("instaProfileDB").collection("following");
    try{
        const deleteUserFollower = await followerCollection.updateOne({"userName" : userFollower.userName}, {
            $pull : {'userFollower' : userFollower.userFollower}
        });
        const deleteUserFollowing = await followingCollection.updateOne({"userName" : userFollower.userFollower}, {
            $pull : {'userFollower' : userFollower.userName}
        });
        console.log(deleteUserFollower, deleteUserFollowing);
        return [deleteUserFollower, deleteUserFollowing];
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
