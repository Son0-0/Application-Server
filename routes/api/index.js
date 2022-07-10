const router = require('express').Router();

router.use('/judge', require('./judge'));
router.use('/login', require('./login'));
router.use('/user',  require('./user'));
router.use('/gamelog', require('./gamelog'));
router.use('/problem', require('./problem'));

module.exports = router;
