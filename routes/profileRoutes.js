const express = require('express')
const { profileInfo, createProfileInfo } = require('../controllers/profileController')

const router = express.Router()

router.route('/profile').post(profileInfo)
router.route('/profile-create-data').post(createProfileInfo)

module.exports = router