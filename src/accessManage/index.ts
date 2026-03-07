import router from "@/router";
import store from "@/store";
import { AccessType, checkAccess } from "@/accessManage/checkAccess";

//注册全局路由守卫
router.beforeEach(async (to, from, next) => {
  //获取登录用户
  let loginUser = store.state.user.loginUser;
  console.log("loginUser", loginUser);

  //如果没有登录信息，自动获取
  //因为页面刷新 vuex state 会丢失
  if (!loginUser) {
    //加await是为了等获取用户信息之后再执行后续代码
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }

  //获取要访问页面的权限
  const needAccess = (to.meta?.access as string) ?? AccessType.NotLogin;
  //要访问页面需要登录后才能访问
  if (needAccess !== AccessType.NotLogin) {
    //如果未登录，跳转到登录页面
    if (!loginUser || loginUser.userRole === AccessType.NotLogin) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    //验权不通过
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }

  next();
});
