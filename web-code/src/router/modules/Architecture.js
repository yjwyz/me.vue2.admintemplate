/*
 * @Author: BORING GHOST
 * @Date: 2022-04-30 17:54:26
 * @LastEditTime: 2022-04-30 18:35:22
 * @Description:组织架构
 */
import Layout from '@/layout';

export default {
  path: '/Architecture',
  component: Layout,
  redirect: '/Architecture',
  children: [
    {
      path: '',
      name: 'Architecture',
      component: () => import('@/views/architecture/index'),
      meta: { title: '组织架构', icon: 'architecture', roles: ['Boring ghost'] }
    }
  ]
};
