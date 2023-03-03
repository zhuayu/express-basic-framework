const axios = require('./axios.js');
const OPENAI_KEY = process.env.OPENAI_KEY;

const chatApi = {
  completions: async function(role, content) {
  	try{
  		const API = `https://api.openai.com/v1/chat/completions`;
  		const res = await axios.post(API, {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": role, "content": content}]
        }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_KEY}`
        }
      });
  		Promise.resolve(res.data)
  	} catch (e) {
  		Promise.reject(e)
  	}
  },
}

module.exports = chatApi;
