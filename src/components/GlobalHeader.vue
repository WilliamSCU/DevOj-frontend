<script lang="ts" setup>
import { routes } from "@/router/routes";
import router from "@/router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { checkAccess } from "@/accessManage/checkAccess";

const store = useStore();

const loginUser = computed(() => store.state.user.loginUser);

const selectedMenu = ref(["/"]);

const visibleMenu = computed(() =>
  routes.filter(
    (item) =>
      !item.meta?.hide &&
      checkAccess(loginUser.value, item.meta?.access as string)
  )
);

router.afterEach((to) => {
  selectedMenu.value = [to.path];
});

const menuClick = (key: string) => {
  router.push({ path: key });
};
</script>

<template>
  <div id="global-header">
    <a-row align="center" style="width: 100%">
      <!-- 左侧 logo -->
      <a-col flex="160px">
        <div class="logo-area">
          <img class="logo" src="@/assets/oj.png" />
          <span class="title">DevOJ</span>
        </div>
      </a-col>

      <!-- 中间菜单 -->
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selected-keys="selectedMenu"
          @menu-item-click="menuClick"
          class="menu"
        >
          <a-menu-item v-for="menu in visibleMenu" :key="menu.path">
            {{ menu.name }}
          </a-menu-item>
        </a-menu>
      </a-col>

      <!-- 右侧用户 -->
      <a-col flex="120px">
        <div class="user-info">
          {{ loginUser?.userName ?? "未登录" }}
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
#global-header {
  position: sticky;
  top: 0;
  z-index: 1000;

  height: 64px;
  background: white;
  border-bottom: 1px solid #eee;

  display: flex;
  align-items: center;
}

/* logo */
.logo-area {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.logo {
  height: 40px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  color: #1890ff;
}

/* menu */
.menu {
  border-bottom: none;
  width: auto;
}

.menu :deep(.arco-menu-item) {
  padding: 0 14px;
}

/* user */
.user-info {
  text-align: right;
  padding-right: 20px;
}
</style>
