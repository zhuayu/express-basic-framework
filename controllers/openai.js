const chatApi = require('./../threes/openai/chat_api.js');
const schema = require('async-validator').default;

const openAiController = {
  completions: async function(req, res, next) {
    const role = req.body.role
    const content = req.body.content;
    const validator = new schema({
      role:  { type: 'string', required: true },
      content:  { type: 'string', required: true },
    })
    try {
      await validator.validate({ role, content })
      const datas = await chatApi.completions(role, content);
      res.json({error_code: 0, data: { datas } })
    } catch (e) {
      res.json({error_code: 1, message: e })
    }
  },
}

module.exports = openAiController;
