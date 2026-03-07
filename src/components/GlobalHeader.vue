<script lang="ts" setup>
import { routes } from "@/router/routes";
import router from "@/router";
import { ref } from "vue";
import { useStore } from "vuex";

//顶部菜单栏默认页面
const selectedMenu = ref(["/"]);

const store = useStore();
//console.log(store.state.user.loginUser.username);

//根据路由跳转。更新选中的菜单
router.afterEach((to, from, failure) => {
  selectedMenu.value = [to.path];
});
const menuClick = (key: string) => {
  console.log(key);
  router.push({
    path: key,
  });
};
</script>

<template>
  <a-row id="global-header" style="margin-bottom: 16px" align="center">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedMenu"
        @menu-item-click="menuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div id="title-bar">
            <img class="logo" src="@/assets/oj.png" />
            <div class="title">DevOJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="route in routes" :key="route.path">
          {{ route.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser?.username ?? "未登录" }}</div>
    </a-col>
  </a-row>
</template>

<style scoped>
#title-bar {
  display: flex;
  align-items: center;
}

.title {
  font-size: 22px;
  font-weight: bold;
  margin-left: 10px;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  color: #1890ff;
}
.logo {
  height: 48px;
}
</style>
