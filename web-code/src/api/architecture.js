import request from '@/utils/request';

/**
 * 获取组织架构数据
 */
export function architectureApi() {
  return request({
    url: '/architecture/tree',
    method: 'GET'
  });
}

/**
 * 新增部门
 */
export function addArchitectureApi(data) {
  return request({
    url: '/architecture/addBumen',
    method: 'POST',
    data
  });
}

/**
 * 新增角色
 */
export function addRolesApi(data) {
  return request({
    url: '/architecture/addRoles',
    method: 'POST',
    data
  });
}

/**
 * 查看某个id信息
 */
export function lookTheIdInfo(id) {
  return request({
    url: '/architecture/lookTheIdInfo',
    method: 'GET',
    params: {
      id
    }
  });
}

/**
 * 删除单个角色
 */
export function delItemRole(id) {
  return request({
    url: '/architecture/delRole',
    method: 'POST',
    data: {
      id
    }
  });
}
