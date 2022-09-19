require('dotenv').config();
const NodeCache = require( "node-cache" );
const axios = require('./axios.js');
const FEISHU_TOKEN_KEY = "feishu_token";
const BASE_URI = "https://open.feishu.cn";
const myCache = new NodeCache({stdTTL: 7200, checkperiod: 3600 });

const tokenApi = {
  token: async function() {
  	const value = myCache.get(FEISHU_TOKEN_KEY);
  	if(value) {
  		return Promise.resolve(value);
  	}

  	try{
  		const API = "/open-apis/auth/v3/app_access_token/internal";
  		const res = await axios.post(`${BASE_URI}${API}`, {
	  	    'app_id': process.env.FEI_SHU_APP_ID,
	  	    'app_secret': process.env.FEI_SHU_APP_SECRET,
	  	});
  		if(res.expire >= 3600) {
  			myCache.set(FEISHU_TOKEN_KEY, res);
  		}
  		return Promise.resolve(res);
  	} catch (e) {
  		console.log(e);
  		return Promise.reject(e);
  	}
  },
  getAppAccessToken: async function() {
  	const res = await tokenApi.token();
  	return res.app_access_token;
  },
}

module.exports = tokenApi;
