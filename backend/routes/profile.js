
const router = require('express').Router();
const controller = require('../controllers/profileController');
const checkAuthorized = require("../middlewares/checkAuth.js");


router.route('/').get(checkAuthorized, controller.viewProfileRender);

module.exports = router;
