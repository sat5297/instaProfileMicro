const profileService = require('../repository/profileRepo');

const getProfile = (body) => {
    const getUserProfile = profileService.getProfile(body);
    return getUserProfile;
};

const createProfile = (body) => {
    const createUserProfile = profileService.createProfile(body);
    return createUserProfile;
};

const updateProfile = (body) => {
    const updateUserProfile = profileService.updateProfile(body);
    return updateUserProfile;
};

const deleteProfile = (body) => {
    const deleteUserProfile = profileService.deleteProfile(body);
    return deleteUserProfile;
};

const searchProfile = (body) => {
    const searchUserProfile = profileService.searchProfile(body);
    return searchUserProfile;
};

const addFollower = (body) => {
    const addUserFollower = profileService.addFollower(body);
    return addUserFollower;
};

const removeFollower = (body) => {
    const removeUserFollower = profileService.removeFollower(body);
    return removeUserFollower;
};

const addFollowing = (body) => {
    const addUserFollowing = profileService.addFollowing(body);
    return addUserFollowing;
};

const removeFollowing = (body) => {
    const removeUserFollowing = profileService.removeFollowing(body);
    return removeUserFollowing; 
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