const OSS = require('ali-oss');

const aliossApi = {
  put: function(bucket, name, path) {
    const client = new OSS({
      region: "oss-cn-shanghai",
      accessKeyId: process.env.ALIYUN_OSS_ACCESSKEY_ID,
      accessKeySecret: process.env.ALIYUN_OSS_ACCESSKEY_SECRET,
      bucket: bucket
    });
    return client.put(name, path);
  },
}

module.exports = aliossApi;
