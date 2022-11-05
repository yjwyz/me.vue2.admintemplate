/*
 * @Author: BORING GHOST
 * @Date: 2022-04-30 17:54:26
 * @LastEditTime: 2022-04-30 18:35:09
 * @Description:审批
 */
import Layout from '@/layout';

export default {
  path: '/Approval',
  component: Layout,
  redirect: '/Approval',
  children: [
    {
      path: '',
      name: 'Approval',
      component: () => import('@/views/approval/index'),
      meta: { title: '审批', icon: 'approval', roles: ['Boring ghost'] }
    }
  ]
};
