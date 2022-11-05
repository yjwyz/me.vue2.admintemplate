/*
 * @Author: BORING GHOST
 * @Date: 2022-04-30 17:54:26
 * @LastEditTime: 2022-05-02 18:03:32
 * @Description:员工
 * noCache: true,
 */
import Layout from '@/layout';

export default {
  path: '/Employees',
  component: Layout,
  redirect: '/Employees',
  children: [
    {
      path: '',
      name: 'Employees',
      component: () => import('@/views/employees/index'),
      meta: { title: '员工', icon: 'employees', roles: ['Boring ghost'] }
    }
  ]
};
