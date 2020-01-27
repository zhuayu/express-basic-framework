const express = require('express');
const router = express.Router();
const wechatController = require('./../controllers/wechat.js')
const carouselController = require('./../controllers/carousel.js')

router.get('/carousel', carouselController.index);
router.get('/wechat/oauth-url', wechatController.oAuthWebUrl)
router.get('/wechat/oauth', wechatController.oAuthWeb)
module.exports = router;
