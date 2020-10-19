import { handleActions } from 'redux-actions';

export default handleActions(
  {
    // 保存企业基本信息
    setUser(state, { payload: result }) {
      return {
        ...state,
        userName: result.userName,
        name: result.name,
        role: result.role,
        publicKey: result.publicKey,
        privateKey: result.privateKey,
        amount: result.amount,
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
    // setAccountUuid(state, { payload: result }) {
    //   return {
    //     ...state,
    //     accountUuid: result,
    //   };
    // },
  },
  {
    loginLoading: false,
    userLoading: false,
    modifyPassword: false,
    addAccount: false,
    uuid: '',
    userName: '',
    phone: '',
    name: '',
    amount: 0,
    publicKey: '',
    privateKey: '',
    role: 0,
    password: '',
  }
);
