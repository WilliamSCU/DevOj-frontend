<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layout/BasicLayout.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

//鉴权
router.beforeEach((to, from, next) => {
  if (
    to.meta.access === "onlyAdmin" &&
    store.state.user.loginUser?.role !== "admin"
  ) {
    return next("/noAuth");
  }
  next();
});
</script>
