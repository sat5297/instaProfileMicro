const profileService = require('../services/profileService');

const getProfile = async (req,res) => {
    // console.log(req.body, req.params);
    const getUserProfile = await profileService.getProfile(req.params);
    res.send(getUserProfile);
    // if(getUserProfile.status === "Success"){
    //     res.sendStatus(200, getUserProfile.data);
    // }
    // res.sendStatus(201, getUserProfile.data);
};

const createProfile = async (req,res) => {
    const createUserProfile = await profileService.createProfile(req.body);
    res.send(createUserProfile);
};

const updateProfile = async(req,res) => {
    const updateUserProfile = await profileService.updateProfile(req.body);
    res.send(updateUserProfile);
};

const deleteProfile = async(req,res) => {
    const deleteUserProfile = await profileService.deleteProfile(req.body);
    res.send(deleteUserProfile);
};

const searchProfile = async(req,res) => {
    const searchUserProfile = await profileService.searchProfile(req.body);
    res.send(searchUserProfile);
};

const addFollower = async(req,res) => {
    const addUserFollower = await profileService.addFollower(req.body);
    res.send(addUserFollower);
};

const removeFollower = async(req,res) => {
    const removeUserFollower = await profileService.removeFollower(req.body);
    res.send(removeUserFollower);
};

const addFollowing = async(req,res) => {
    const addUserFollowing = await profileService.addFollowing(req.body);
    res.send(addUserFollowing);
};

const removeFollowing = async(req,res) => {
    const removeUserFollowing = await profileService.removeFollowing(req.body);
    res.send(removeUserFollowing);
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
