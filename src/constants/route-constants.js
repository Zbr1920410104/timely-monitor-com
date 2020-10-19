export const BCG_ROOT_NAME = 'background';

// 一级路由
export const INDEX = { path: '', name: '首页' };
// export const LOGIN = { path: '/login', name: '登录页' };
// export const REGISTER = { path: '/register', name: '注册页' };
export const HOME = { path: '/home', name: '主页' };

// 二级路由
export const HOME_INDEX = { path: '/home/index', name: '主首页' };
export const HOME_PASSWORD = { path: '/home/password', name: '密码修改页面' };
export const HOME_BLOCK = {
  path: '/home/block',
  name: '区块查看页面',
};
export const HOME_TRANSACTION = {
  path: '/home/transaction',
  name: '交易查看页面',
};
export const HOME_ACCOUNT = {
  path: '/home/account',
  name: '账户管理页面',
};
export const HOME_MINE = {
  path: '/home/mine',
  name: '挖矿页面',
};
export const HOME_ACCOUNT_TRANSACTION = {
  path: '/home/accountTransaction',
  name: '交易页面',
};
