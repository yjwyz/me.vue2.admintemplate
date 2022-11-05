/*
 * @Author: BORING GHOST
 * @Date: 2022-04-30 17:54:26
 * @LastEditTime: 2022-04-30 18:28:12
 * @Description:考勤
 */
import Layout from '@/layout';

export default {
  path: '/Attendance',
  component: Layout,
  redirect: '/Attendance',
  children: [
    {
      path: '',
      name: 'Attendance',
      component: () => import('@/views/attendance/index'),
      meta: { title: '考勤', icon: 'attendance', roles: ['Boring ghost'] }
    }
  ]
};
