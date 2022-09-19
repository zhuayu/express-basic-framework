const tokenApi = require('./../threes/feishu/token_api.js')
const bitableApi = require('./../threes/feishu/bitable_api.js')

const feishuController = {
  token: async function(req, res, next) {
    try {
      const datas = await tokenApi.token();
      res.json({error_code: 0, data: { datas } })
    } catch (e) {
      res.json({error_code: 1, message: e.msg})
    }
  },
  appInfo: async function(req, res, next) {
    try {
      const appToken = req.params.appToken;
      const datas = await bitableApi.getAppInfo(appToken);
      res.json({error_code: 0, data: { datas } })
    } catch (e) {
      res.json({error_code: 1, message: e.msg})
    }
  },
  tables: async function(req, res, next) {
    try {
      const appToken = req.params.appToken;
      const datas = await bitableApi.getTables(appToken);
      res.json({error_code: 0, data: { datas } })
    } catch (e) {
      res.json({error_code: 1, message: e.msg})
    }
  },
  fields: async function(req, res, next) {
    try {
      const appToken = req.params.appToken;
      const tableId = req.params.tableId;
      const datas = await bitableApi.getFields(appToken, tableId);
      res.json({error_code: 0, data: { datas } })
    } catch (e) {
      res.json({error_code: 1, message: e.msg})
    }
  },
  records: async function(req, res, next) {
    try {
      const appToken = req.params.appToken;
      const tableId = req.params.tableId;
      const datas = await bitableApi.getRecords(appToken, tableId);
      res.json({error_code: 0, data: { datas } })
    } catch (e) {
      res.json({error_code: 1, message: e.msg})
    }
  },
}

module.exports = feishuController;
