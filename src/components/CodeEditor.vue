<script setup lang="ts">
import * as monaco from "monaco-editor";
import { ref, onMounted } from "vue";

/**
 * v-model
 */
// eslint-disable-next-line no-undef
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["update:modelValue"]);

const editorRef = ref<HTMLDivElement | null>(null);
let editor: monaco.editor.IStandaloneCodeEditor;

const language = ref("javascript");
const theme = ref("vs-dark");

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "Python", value: "python" },
  { label: "JSON", value: "json" },
];

const themes = [
  { label: "Light", value: "vs" },
  { label: "Visual Studio Dark", value: "vs-dark" },
  { label: "High Contrast", value: "hc-black" },
];

onMounted(() => {
  if (!editorRef.value) return;

  editor = monaco.editor.create(editorRef.value, {
    value: props.modelValue || "console.log('Hello Monaco')",
    language: language.value,
    theme: theme.value,
    automaticLayout: true,
    minimap: {
      enabled: true,
      scale: 7,
    },
  });
  /**
   * 监听代码变化
   */
  editor.onDidChangeModelContent(() => {
    const code = editor.getValue();
    emit("update:modelValue", code);
  });
});

/**
 * 切换语言
 */
const changeLanguage = (value: string) => {
  language.value = value;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  monaco.editor.setModelLanguage(editor.getModel()!, value);
};

/**
 * 切换主题
 */
const changeTheme = (value: string) => {
  theme.value = value;
  monaco.editor.setTheme(value);
};
</script>

<template>
  <div class="editor-container">
    <div class="editor-toolbar">
      <div class="toolbar-left">
        <span>Language</span>

        <a-select
          :model-value="language"
          style="width: 160px"
          @change="changeLanguage"
        >
          <a-option
            v-for="item in languages"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-option>
        </a-select>
      </div>

      <div class="toolbar-right">
        <span>Theme</span>

        <a-select
          :model-value="theme"
          style="width: 200px"
          @change="changeTheme"
        >
          <a-option
            v-for="item in themes"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-option>
        </a-select>
      </div>
    </div>

    <div ref="editorRef" class="editor"></div>
  </div>
</template>

<style scoped>
.editor-container {
  width: 100%;
}

.editor-toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.editor {
  height: 500px;
  border: 1px solid #ddd;
}
</style>
