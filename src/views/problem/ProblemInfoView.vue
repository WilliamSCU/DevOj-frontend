<script setup lang="ts">
import CodeEditor from "@/components/CodeEditor.vue";
import { ref } from "vue";

const code = ref("");
</script>

<template>
  <CodeEditor v-model="code" />

  <a-button type="primary" @click="console.log(code)"> 获取代码 </a-button>
</template>
