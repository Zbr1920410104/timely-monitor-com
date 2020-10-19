import { createAction } from 'redux-actions';

export default {
  asyncSetUser: createAction('asyncSetUser'),
  setUser: createAction('setUser'),
  setLoginLoading: createAction('setLoginLoading'),
  asyncSetUserByToken: createAction('asyncSetUserByToken'),
  setUserLoading: createAction('setUserLoading'),
  setModifyPassword: createAction('setModifyPassword'),
  setAddAccount: createAction('setAddAccount'),
  setAccountUuid: createAction('setAccountUuid'),
  // 普通员工填写
};
