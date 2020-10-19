import * as ROUTE from '@/constants/route-constants';
import { AUTHORITY } from '@/constants/auth-constants';

export const NAV = {
  /* 超级管理员 */
  [AUTHORITY.ADMIN.code]: [
    {
      key: 'manager',
      path: ROUTE.HOME_INDEX.path,
      icon: 'bank',
      name: '首页',
    },
    {
      key: 'password',
      path: ROUTE.HOME_PASSWORD.path,
      name: '修改密码',
      icon: 'key',
    },
    {
      key: 'account',
      path: ROUTE.HOME_ACCOUNT.path,
      icon: 'apartment',
      name: '账户管理',
    },
  ],
  /* 普通节点 */
  [AUTHORITY.MONITOR.code]: [
    {
      key: 'manager',
      path: ROUTE.HOME_INDEX.path,
      name: '首页',
      icon: 'bank',
    },
    {
      key: 'password',
      path: ROUTE.HOME_PASSWORD.path,
      name: '修改密码',
      icon: 'key',
    },
    {
      key: 'monitor',
      path: ROUTE.HOME_MONITOR.path,
      name: '图片监控',
      icon: 'monitor',
    },
    {
      key: 'monitorList',
      path: ROUTE.HOME_MONITOR_LIST.path,
      name: '监控列表',
      icon: 'bars',
    },
  ],
};
