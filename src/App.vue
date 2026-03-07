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
import { onMounted } from "vue";

//全局初始化函数
const init = () => {
  console.log("欢迎来到我的项目");
};

//挂载
onMounted(() => {
  init();
});
</script>
