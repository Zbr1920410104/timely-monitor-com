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
        monitorUuid: result.monitorUuid,
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
    setAddConsumer(state, { payload: result }) {
      return {
        ...state,
        addConsumer: result,
      };
    },
    setChangeConsumer(state, { payload: result }) {
      return {
        ...state,
        changeConsumer: result,
      };
    },
    setConsumerUuid(state, { payload: result }) {
      return {
        ...state,
        consumerUuid: result,
      };
    },
    setConsumerRefresh(state, { payload: result }) {
      return {
        ...state,
        consumerRefresh: result,
      };
    },
    setBlackListRefresh(state, { payload: result }) {
      return {
        ...state,
        blackListRefresh: result,
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
    addConsumer: false,
    consumerRefresh: false,
    changeConsumer: false,
    blackListRefresh: false,
    monitorUuid: '',
    accountUuid: '',
    consumerUuid: '',
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
