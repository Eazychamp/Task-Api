const express = require('express');
const { getProjects, createProjects } = require('../controllers/projectsController');

const router = express.Router();

router.route('/create').post(createProjects)
router.route('/all').get(getProjects)

module.exports = router