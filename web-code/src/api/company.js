/*
 * @Author: BORING GHOST
 * @Date: 2022-05-02 16:33:11
 * @LastEditTime: 2022-05-04 14:14:37
 * @Description:公司设置 api
 */

import request from '@/utils/request.js';

/**
 * 获取公司信息
 */
export function companyListApi() {
  return request({
    url: '/company/get',
    method: 'GET'
  });
}
