/*
 * @Author: BORING GHOST
 * @Date: 2022-04-30 17:54:26
 * @LastEditTime: 2022-04-30 18:28:23
 * @Description:社保
 */
import Layout from '@/layout';

export default {
  path: '/Security',
  component: Layout,
  redirect: '/Security',
  children: [
    {
      path: '',
      name: 'Security',
      component: () => import('@/views/security/index'),
      meta: { title: '社保', icon: 'security', roles: ['Boring ghost'] }
    }
  ]
};
