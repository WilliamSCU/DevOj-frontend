//权限种类
const AccessType = {
  NotLogin: "notLogin",
  User: "user",
  Admin: "admin",
};

//权限校验
const checkAccess = (
  loginUser: any,
  needAccess: string = AccessType.NotLogin
) => {
  //获取当前登录用户具有的权限
  const userAccess = loginUser?.userRole ?? AccessType.NotLogin;

  //所有人可见
  if (needAccess === AccessType.NotLogin) {
    return true;
  }

  //普通用户可见
  if (needAccess === AccessType.User && userAccess === AccessType.NotLogin) {
    return false;
  }

  //管理员可见
  return !(needAccess === AccessType.Admin && userAccess !== AccessType.Admin);
};

export { AccessType, checkAccess };
