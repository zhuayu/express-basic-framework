
const CryptoJS = require('crypto-js')
const WebSocket = require('ws')
const log = require('log4node')
const XUNFEI_APPID = process.env.XUNFEI_APPID;
const XUNFEI_APIKEY = process.env.XUNFEI_APIKEY;
const XUNFEI_APISECRET = process.env.XUNFEI_APISECRET;

const ttsApi = {
  tts:  function(content) {
    return new Promise((resolve, reject) => {
      try{
        const config = {
          hostUrl: "wss://tts-api.xfyun.cn/v2/tts",
          host: "tts-api.xfyun.cn",
          appid: XUNFEI_APPID,
          apiSecret: XUNFEI_APISECRET,
          apiKey: XUNFEI_APIKEY,
          text: content,
          uri: "/v2/tts",
          vcn: "xiaoyan",
        }
        // 获取当前时间 RFC1123格式
        const date = (new Date().toUTCString());
        const authorization = ttsApi._getAuthStr(date, config);
        const wssUrl = config.hostUrl + "?authorization=" + authorization + "&date=" + date + "&host=" + config.host
        const ws = new WebSocket(wssUrl);

        // 连接建立完毕，读取数据进行识别
        ws.on('open', () => {
          log.info("websocket connect!");

          let frame = {
            // 填充common
            "common": {
                "app_id": config.appid
            },
            // 填充business
            "business": {
                "aue": "lame",
                "auf": "audio/L16;rate=16000",
                "vcn": config.vcn,
                "tte": "UTF8"
            },
            // 填充data
            "data": {
              "text": Buffer.from(config.text).toString('base64'),
              "status": 2
            }
          }
          ws.send(JSON.stringify(frame))

          // 如果之前保存过音频文件，删除之
          if (fs.existsSync('./test.mp3')) {
            fs.unlink('./test.mp3', (err) => {
              if (err) {
                log.error('remove error: ' + err);
              }
            })
          }
        });

        // 得到结果后进行处理，仅供参考，具体业务具体对待
        ws.on('message', (data, err) => {
          if (err) {
            log.error('message error: ' + err)
            return
          }

          let res = JSON.parse(data)

          if (res.code != 0) {
            log.error(`${res.code}: ${res.message}`)
            ws.close()
            reject({msg: res.message});
            return
          }

          let audio = res.data.audio
          let audioBuf = Buffer.from(audio, 'base64')
          
          resolve({url: 'ok'});
          fs.writeFile('./test.pcm', audioBuf, { flag: 'a' }, (err) => {
            if (err) {
              log.error('save error: ' + err)
              return 
            }
            log.info('文件保存成功')
          })

          if (res.code == 0 && res.data.status == 2) {
            ws.close()
          }
        });


        // 资源释放
        ws.on('close', () => {
          log.info('connect close!')
        });

        // 连接错误
        ws.on('error', (err) => {
          log.error("websocket connect err: " + err)
          reject(err.message);
        });
      } catch (e) {
        reject(e);
        throw(e)
      }
    });
  },
  _getAuthStr: function (date, config) {
    const signatureOrigin = `host: ${config.host}\ndate: ${date}\nGET ${config.uri} HTTP/1.1`;
    const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, config.apiSecret);
    const signature = CryptoJS.enc.Base64.stringify(signatureSha);
    const authorizationOrigin = `api_key="${config.apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
    const authStr = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(authorizationOrigin));
    return authStr;
  },
}

module.exports = ttsApi;
