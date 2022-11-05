import axios from 'axios';

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});
// request.interceptors.request.use(config => {
//   return config;
// });
// request.interceptors.response.use();

export default request;
