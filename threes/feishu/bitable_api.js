const axios = require('./axios.js');
const tokenApi = require('./token_api.js');

const bitableApi = {
  getAppInfo: async function(appToken) {
  	try{
  		const API = `https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}`;
      const accessToken = await tokenApi.getAppAccessToken();
  		const res = await axios.get(API, {}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
  		return Promise.resolve(res);
  	} catch (e) {
  		return Promise.reject(e.response.data);
  	}
  },
  getTables: async function(appToken) {
    try{
      const API = `https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables`;
      const accessToken = await tokenApi.getAppAccessToken();
      const res = await axios.get(API, {}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return Promise.resolve(res);
    } catch (e) {
      return Promise.reject(e.response.data);
    }
  },
  getFields: async function(appToken, tableId) {
    try{
      const API = `https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/fields`;
      const accessToken = await tokenApi.getAppAccessToken();
      const res = await axios.get(API, {}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return Promise.resolve(res);
    } catch (e) {
      return Promise.reject(e.response.data);
    }
  },
  getRecords: async function(appToken, tableId) {
    try{
      const API = `https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records`;
      const accessToken = await tokenApi.getAppAccessToken();
      const res = await axios.get(API, {}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return Promise.resolve(res);
    } catch (e) {
      return Promise.reject(e.response.data);
    }
  }
}

module.exports = bitableApi;
