const schema = require('async-validator').default;
const ttsApi = require('./../threes/xunfei/tts.js');

const xunfeiController = {
  tts: async function(req, res, next) {
    const content = req.body.content;
    const validator = new schema({
      content:  { type: 'string', required: true },
    })
    try {
      await validator.validate({ content })
      const data = await ttsApi.tts(content);
      res.json({error_code: 0, data: data })
    } catch (e) {
        console.log(e)
      res.json({error_code: 1, message: e })
    }
  },
}

module.exports = xunfeiController;
