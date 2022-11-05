/*
 * @Author: BORING GHOST
 * @Date: 2022-05-02 16:33:11
 * @LastEditTime: 2022-05-02 17:58:31
 * @Description:员工api
 */
import request from '@/utils/request';

/**
 * 获取所有人物信息
 */
export function rolesApi() {
  return request({
    url: '/employees/list',
    method: 'GET'
  });
}
/**
 * 新增人物
 */
export function addRole(form) {
  return request({
    url: '/employees/add',
    method: 'post',
    data: form
  });
}
/**
 * 查看人物
 */
export function lookRole(id) {
  return request({
    url: '/employees/look',
    method: 'GET',
    params: {
      id
    }
  });
}

/**
 * 删除人物
 */
export function delRole(id) {
  return request({
    url: '/employees/del',
    method: 'post',
    data: {
      id
    }
  });
}
