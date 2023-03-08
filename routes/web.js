const express = require('express');
const router = express.Router();
// const carouselController = require('./../controllers/carousel.js');
const openAiController = require('./../controllers/openai.js');
const xunfeiController = require('./../controllers/xunfei.js');


// const wechatController = require('./../controllers/wechat.js');
// const feishuController = require('./../controllers/feishu.js');

// router.get('/carousel', carouselController.index);

router.post('/v1/chat', openAiController.completions);

// router.get('/wechat/oauth-url', wechatController.oAuthWebUrl);
// router.get('/wechat/oauth', wechatController.oAuthWeb);

// router.get('/feishu/token', feishuController.token);
// router.get('/feishu/app/:appToken', feishuController.appInfo);
// router.get('/feishu/app/:appToken/tables', feishuController.tables);
// router.get('/feishu/app/:appToken/tables/:tableId/fields', feishuController.fields);
// router.get('/feishu/app/:appToken/tables/:tableId/records', feishuController.records);

router.post('/xunfei/tts', xunfeiController.tts);

module.exports = router;
