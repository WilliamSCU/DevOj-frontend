import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/user/HomeView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";
import UserInfoView from "@/views/user/UserInfoView.vue";
import AddProblemView from "@/views/problem/AddProblemView.vue";
import ProblemInfoView from "@/views/problem/ProblemInfoView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "题目信息",
    component: HomeView,
  },
  {
    path: "/user",
    children: [
      {
        path: "login",
        name: "登录",
        component: LoginView,
      },
    ],
    meta: {
      hide: true,
    },
  },
  {
    path: "/userinfo",
    name: "个人中心",
    component: UserInfoView,
    meta: {
      access: "user",
    },
  },
  {
    path: "/addProblem",
    name: "创建题目",
    component: AddProblemView,
    meta: {
      access: "admin",
    },
  },
  {
    path: "/Problem",
    name: "题目详情页",
    component: ProblemInfoView,
    meta: {
      access: "user",
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hide: true,
    },
  },
  {
    path: "/hide",
    name: "隐藏页面测试",
    component: AboutView,
    meta: {
      hide: true,
    },
  },
];
