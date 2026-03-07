import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import adminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "题目信息",
    component: HomeView,
  },
  {
    path: "/user",
    name: "用户信息",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/admin",
    name: "仅管理员可见",
    component: adminView,
    meta: {
      access: "onlyAdmin",
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
  },
];
