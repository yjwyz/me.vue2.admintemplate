/*
 * @Author: BORING GHOST
 * @Date: 2022-04-30 17:54:26
 * @LastEditTime: 2022-05-04 14:07:57
 * @Description:公司设置
 */
import Layout from '@/layout';

export default {
  path: '/Company',
  component: Layout,
  redirect: '/Company',
  children: [
    {
      path: '',
      name: 'Company',
      component: () => import('@/views/company/index'),
      meta: { title: '公司设置', noCache: true, icon: 'company', roles: ['Boring ghost'] }
    }
  ]
};
