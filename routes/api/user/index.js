const router = require('express').Router();
const controller = require("./controller");

router.get('/', controller.githubCallBack);

module.exports = router;