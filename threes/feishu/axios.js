const axios = require('axios');

const axiosInstance = axios.create();
axiosInstance.defaults.timeout = 20000;

axiosInstance.interceptors.request.use(
  config => {
    const newConfig = {
      ...config,
      params: {
        ...config.params,
      },
      data: {
        ...config.data,
      }
    };
    return newConfig;
  },
  error => Promise.reject(error)
);

const handleErrorRequest = error => {
  const { response } = error;
  const status = response ? response.status : 408;
  if (response) {
    const { data } = response;
    const message = data.msg || "服务器发送错误，请稍后再试";
    console.log(status, message);
  } else {
    console.log(error);
  }
};

const successRes = res => {
  switch (true) {
    case res.data.code === 0:
      return res.data;
    default:
      return Promise.reject(res.data);
  }
};

const errorRes = error => {
  handleErrorRequest(error);
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(successRes, errorRes);

module.exports = {
  post(url = "", data = {}, config = {}) {
    return axiosInstance.post(url, data, config);
  },
  put(url = "", data = {}, config = {}) {
    return axiosInstance.put(url, data, config);
  },
  get(url = "", params = {}, config = {}) {
    const OPTIONS = Object.assign(
      {
        params
      },
      config
    );
    return axiosInstance.get(url, OPTIONS);
  },
  delete(url = "", params = {}, config = {}) {
    const OPTIONS = Object.assign(
      {
        params
      },
      config
    );
    return axiosInstance.delete(url, OPTIONS);
  }
};
