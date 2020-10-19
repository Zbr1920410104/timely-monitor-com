import * as ROUTE from '@/constants/route-constants';
import { AUTHORITY } from '@/constants/auth-constants';

export const NAV = {
  /* 超级管理员 */
  [AUTHORITY.ADMIN.code]: [
    {
      key: 'manager',
      path: ROUTE.HOME_INDEX.path,
      icon: 'audit',
      name: '首页',
    },
    {
      key: 'password',
      path: ROUTE.HOME_PASSWORD.path,
      name: '修改密码',
      icon: 'key',
    },
    {
      key: 'block',
      path: ROUTE.HOME_BLOCK.path,
      name: '区块查看',
      icon: 'solution',
    },
    {
      key: 'transaction',
      path: ROUTE.HOME_TRANSACTION.path,
      icon: 'apartment',
      name: '交易查看',
    },
    {
      key: 'account',
      path: ROUTE.HOME_ACCOUNT.path,
      icon: 'apartment',
      name: '账户管理',
    },
  ],
  /* 普通节点 */
  [AUTHORITY.COMMOM_POINT.code]: [
    {
      key: 'manager',
      path: ROUTE.HOME_INDEX.path,
      name: '首页',
      icon: 'bank',
    },
    {
      key: 'mine',
      path: ROUTE.HOME_MINE.path,
      icon: 'apartment',
      name: '账户与挖矿',
    },
    {
      key: 'block',
      path: ROUTE.HOME_BLOCK.path,
      name: '区块查看',
      icon: 'solution',
    },
    {
      key: 'transaction',
      path: ROUTE.HOME_TRANSACTION.path,
      icon: 'apartment',
      name: '交易查看',
    },
    {
      key: 'accountTransaction',
      path: ROUTE.HOME_ACCOUNT_TRANSACTION.path,
      icon: 'apartment',
      name: '账户交易',
    },
  ],
};
