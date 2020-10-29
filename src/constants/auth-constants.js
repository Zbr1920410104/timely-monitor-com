// 权限
export const AUTHORITY = {
  ADMIN: {
    name: '管理员',
    code: 1,
  },
  MONITOR: {
    name: '监测员',
    code: 5,
  },
  CONSUMER: {
    name: '普通用户',
    code: 10,
  },
};

export const getAuthortyNameByCode = (roleCode) => {
  const auth = Object.values(AUTHORITY).find((item) => item.code === roleCode);

  if (auth) {
    return auth.name;
  } else {
    return '';
  }
};
