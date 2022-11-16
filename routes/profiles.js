const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

router.route('/')
      .get(profileController.searchProfile)
      .post(profileController.createProfile)
      .delete(profileController.deleteProfile)
      .patch(profileController.updateProfile)

router.route('/:id')
      .get(profileController.getProfile)
      .post(profileController.addFollower)
      .delete(profileController.removeFollower)
      .post(profileController.addFollowing)
      .delete(profileController.removeFollowing)

module.exports = router;