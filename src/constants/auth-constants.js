// 权限
export const AUTHORITY = {
  ADMIN: {
    name: '管理员',
    code: 1,
  },
  COMMOM_POINT: {
    name: '普通节点',
    code: 5,
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
