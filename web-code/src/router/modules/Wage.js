/*
 * @Author: BORING GHOST
 * @Date: 2022-04-30 17:54:26
 * @LastEditTime: 2022-04-30 18:36:28
 * @Description:工资
 */
import Layout from '@/layout';

export default {
  path: '/Wage',
  component: Layout,
  redirect: '/Wage',
  children: [
    {
      path: '',
      name: 'Wage',
      component: () => import('@/views/wage/index'),
      meta: { title: '工资', icon: 'wage', roles: ['Boring ghost'] }
    }
  ]
};
