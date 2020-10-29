export const BCG_ROOT_NAME = 'background';

// 一级路由
export const INDEX = { path: '', name: '首页' };
// export const LOGIN = { path: '/login', name: '登录页' };
// export const REGISTER = { path: '/register', name: '注册页' };
export const HOME = { path: '/home', name: '主页' };

// 二级路由
export const HOME_INDEX = { path: '/home/index', name: '主首页' };
export const HOME_PASSWORD = { path: '/home/password', name: '密码修改页面' };
export const HOME_ACCOUNT = {
  path: '/home/account',
  name: '账户管理页面',
};
export const HOME_MONITOR = {
  path: '/home/monitor',
  name: '监测员监测页面',
};
export const HOME_MONITOR_LIST = {
  path: '/home/monitorList',
  name: '监测员监测列表页面',
};
export const HOME_MONITOR_TEXT = {
  path: '/home/monitorText',
  name: '监测员黑名单页面',
};
export const HOME_CONSUMER_LIST = {
  path: '/home/consumerList',
  name: '监测员账户管理页面',
};
export const HOME_CONSUMER_WELCOME = {
  path: '/home/consumerWelcome',
  name: '普通用户欢迎页面',
};
