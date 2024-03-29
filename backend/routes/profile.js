
const router = require('express').Router();
const controller = require('../controllers/profileController');
const checkAuthorized = require("../middlewares/checkAuth.js");


router.route('/').get(checkAuthorized, controller.viewProfileRender);
router.get('/searchuser', controller.searchProfileRender);
router.get('/search', controller.searchProfileController);
router.route('/activity').get(checkAuthorized, controller.viewActivityRender);
router.route("/update").get(controller.editProfileRender).post(controller.editProfileController);
router.get('/follow/:followingId',checkAuthorized, controller.followController)
router.route('/:profileId').get(checkAuthorized, controller.singleProfileRender);
router.route('/activity/:profileId').get(checkAuthorized, controller.singleProfileActivityRender);

module.exports = router;
