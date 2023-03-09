const schema = require('async-validator').default;
const ttsApi = require('./../threes/xunfei/tts.js');
const aliossApi = require('./../threes/alioss/alioss.js');
const path = require("path");

const xunfeiController = {
  tts: async function(req, res, next) {
    const content = req.body.content;
    const validator = new schema({
      content:  { type: 'string', required: true },
    })
    try {
      await validator.validate({ content })
      const data = await ttsApi.tts(content);
      const publicPath = path.join(__dirname, '..', data.path);
      const aliossRes = await aliossApi.put('docee', '/test/' + data.name,  publicPath);
      res.json({error_code: 0, data: aliossRes });
    } catch (e) {
      console.log(e)
      res.json({error_code: 1, message: e })
    }
  },
}

module.exports = xunfeiController;
