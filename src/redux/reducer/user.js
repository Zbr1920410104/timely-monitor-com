import { handleActions } from 'redux-actions';

export default handleActions(
  {
    // 保存企业基本信息
    setUser(state, { payload: result }) {
      return {
        ...state,
        userName: result.userName,
        role: result.role,
        uuid: result.uuid,
        password: result.password,
      };
    },
    // 设置登录loading
    setLoginLoading(state, { payload: result }) {
      return {
        ...state,
        loginLoading: result,
      };
    },
    setUserLoading(state, { payload: result }) {
      return {
        ...state,
        userLoading: result,
      };
    },
    setModifyPassword(state, { payload: result }) {
      return {
        ...state,
        modifyPassword: result,
      };
    },
    setAddAccount(state, { payload: result }) {
      return {
        ...state,
        addAccount: result,
      };
    },
    setChangeAccount(state, { payload: result }) {
      return {
        ...state,
        changeAccount: result,
      };
    },
    setAccountUuid(state, { payload: result }) {
      return {
        ...state,
        accountUuid: result,
      };
    },
    setAccountRefresh(state, { payload: result }) {
      return {
        ...state,
        accountRefresh: result,
      };
    },
  },
  {
    loginLoading: false,
    userLoading: false,
    modifyPassword: false,
    addAccount: false,
    accountRefresh: false,
    changeAccount: false,
    addUuid: '',
    uuid: '',
    userName: '',
    phone: '',
    name: '',
    amount: 0,
    role: 0,
    password: '',
  }
);
