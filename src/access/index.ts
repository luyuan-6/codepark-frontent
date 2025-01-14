import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/access_enum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  let loginUser = store.state.user.loginUser;
  console.log("登录用户信息", loginUser);

  //如果之前没有登陆过
  if (!loginUser || !loginUser.userRole) {
    // 加await 是为了等用户登录成功之后 再执行后续的代码
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM;
  // 要跳转的页面必须要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没登录 跳转到登录页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      next(`/user/login？redirect=${to.fullPath}`);
      return;
    }
    // 如果已经登录了 但是权限不足 哪么跳转到无权限页面
    if (!checkAccess(loginUser.userRole, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
