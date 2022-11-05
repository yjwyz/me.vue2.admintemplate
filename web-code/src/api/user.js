import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/user/login',
    method: 'GET',
    data
  });
}

export function getInfo(token) {
  return request({
    url: '/user/userInfo',
    method: 'POST',
    params: { token }
  });
}

export function logout() {
  return new Promise(resolve => {
    resolve([]);
  });
}
