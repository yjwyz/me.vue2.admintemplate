/*
 * @Author: BORING GHOST
 * @Date: 2022-04-30 17:54:26
 * @LastEditTime: 2022-04-30 18:28:20
 * @Description:权限管理
 */
import Layout from '@/layout';

export default {
  path: '/Permissions',
  component: Layout,
  redirect: '/Permissions',
  children: [
    {
      path: '',
      name: 'Permissions',
      component: () => import('@/views/permissions/index'),
      meta: { title: '权限管理', icon: 'permissions', roles: ['Boring ghost'] }
    }
  ]
};
