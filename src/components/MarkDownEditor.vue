<script setup lang="ts">
import "bytemd/dist/index.css";
import { Editor } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { ref } from "vue";

interface Props {
  modelValue?: string;
}

// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["update:modelValue"]);

const value = ref(props.modelValue);

const plugins = [gfm(), highlight()];

const handleChange = (v: string) => {
  value.value = v;
  emit("update:modelValue", v);
};
</script>

<template>
  <Editor :value="value" :plugins="plugins" @change="handleChange" />
</template>

<style scoped>
:deep(.bytemd-toolbar-right .bytemd-toolbar-icon:last-child) {
  display: none;
}
:deep(.bytemd-toolbar-icon:nth-last-child(2)) {
  display: none;
}
</style>
