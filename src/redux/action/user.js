import { createAction } from 'redux-actions';

export default {
  asyncSetUser: createAction('asyncSetUser'),
  setUser: createAction('setUser'),
  setLoginLoading: createAction('setLoginLoading'),
  asyncSetUserByToken: createAction('asyncSetUserByToken'),
  setUserLoading: createAction('setUserLoading'),
  setModifyPassword: createAction('setModifyPassword'),
  setAddAccount: createAction('setAddAccount'),
  setChangeAccount: createAction('setChangeAccount'),
  setAccountUuid: createAction('setAccountUuid'),
  setAccountRefresh: createAction('setAccountRefresh'),
  setAddConsumer: createAction('setAddConsumer'),
  setChangeConsumer: createAction('setChangeConsumer'),
  setConsumerUuid: createAction('setConsumerUuid'),
  setConsumerRefresh: createAction('setConsumerRefresh'),
  setBlackListRefresh: createAction('setBlackListRefresh'),
  // 普通员工填写
};
