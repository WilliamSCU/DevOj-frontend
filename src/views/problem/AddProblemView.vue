<script setup lang="ts">
import MarkDownEditor from "@/components/MarkDownEditor.vue";
import { reactive, ref } from "vue";

// 难度
const difficultyOptions = [
  { label: "简单", value: 1, color: "green" },
  { label: "中等", value: 2, color: "orange" },
  { label: "困难", value: 3, color: "red" },
];

// 标签推荐
const tagOptions = [
  { label: "数组", value: "数组" },
  { label: "字符串", value: "字符串" },
  { label: "哈希表", value: "哈希表" },
  { label: "动态规划", value: "动态规划" },
  { label: "图论", value: "图论" },
  { label: "贪心", value: "贪心" },
  { label: "DFS", value: "DFS" },
  { label: "BFS", value: "BFS" },
  { label: "二分查找", value: "二分查找" },
];

// JSON 批量导入
const jsonInput = ref("");

// 表单
const form = reactive({
  title: "",
  content: "",
  answer: "",
  difficulty: 1,
  tags: [],
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 128,
    stackLimit: 64,
    timeLimit: 1000,
  },
});

// 添加测试用例
const addCase = () => {
  form.judgeCase.push({
    input: "",
    output: "",
  });
};

// 删除
const removeCase = (index: number) => {
  form.judgeCase.splice(index, 1);
};

// JSON 导入
const importJSON = () => {
  try {
    const data = JSON.parse(jsonInput.value);
    if (Array.isArray(data)) {
      form.judgeCase = data.map((item: any) => ({
        input: item.input,
        output: item.output,
      }));
    }
  } catch (e) {
    alert("JSON 格式错误");
  }
};

// 提交
const handleSubmit = () => {
  console.log(form);
};
</script>

<template>
  <div class="problem-container">
    <a-card title="创建题目">
      <a-form
        :model="form"
        layout="horizontal"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 21 }"
      >
        <!-- 标题 -->
        <a-form-item label="标题">
          <a-input v-model="form.title" />
        </a-form-item>

        <!-- 难度 -->
        <a-form-item label="难度">
          <a-radio-group v-model="form.difficulty">
            <a-radio
              v-for="item in difficultyOptions"
              :key="item.value"
              :value="item.value"
            >
              <a-tag :color="item.color">{{ item.label }}</a-tag>
            </a-radio>
          </a-radio-group>
        </a-form-item>

        <!-- 标签推荐 -->
        <a-form-item label="标签">
          <a-select
            v-model="form.tags"
            :options="tagOptions"
            multiple
            allow-create
            allow-clear
            placeholder="选择或输入标签"
          />
        </a-form-item>

        <!-- 题目内容 -->
        <a-divider>题目内容</a-divider>
        <MarkDownEditor v-model="form.content" class="markdown-editor" />

        <!-- 答案解析 -->
        <a-divider>答案解析</a-divider>
        <MarkDownEditor v-model="form.answer" class="markdown-editor" />

        <!-- 判题配置 -->
        <a-divider>判题配置</a-divider>

        <a-row :gutter="20">
          <a-col :span="8">
            <a-card size="small" title="时间限制">
              <a-input-number
                v-model="form.judgeConfig.timeLimit"
                mode="button"
                :step="100"
                :min="1"
                style="width: 100%"
              />
            </a-card>
          </a-col>

          <a-col :span="8">
            <a-card size="small" title="内存限制">
              <a-input-number
                v-model="form.judgeConfig.memoryLimit"
                mode="button"
                :step="64"
                :min="1"
                style="width: 100%"
              />
            </a-card>
          </a-col>

          <a-col :span="8">
            <a-card size="small" title="堆栈限制">
              <a-input-number
                v-model="form.judgeConfig.stackLimit"
                mode="button"
                :step="64"
                :min="1"
                style="width: 100%"
              />
            </a-card>
          </a-col>
        </a-row>

        <!-- 测试用例 -->
        <a-divider>测试用例</a-divider>

        <!-- JSON 导入 -->
        <a-card size="small" title="JSON 批量导入">
          <a-textarea
            v-model="jsonInput"
            placeholder='[{"input":"1 2","output":"3"}]'
          />
          <a-button type="primary" style="margin-top: 10px" @click="importJSON">
            导入
          </a-button>
        </a-card>

        <!-- 测试用例列表 -->
        <div class="case-list">
          <a-card
            v-for="(item, index) in form.judgeCase"
            :key="index"
            class="case-card"
          >
            <div class="case-header">
              <span>测试用例 {{ index + 1 }}</span>

              <a-button size="mini" status="danger" @click="removeCase(index)">
                删除
              </a-button>
            </div>

            <a-textarea v-model="item.input" placeholder="输入" auto-size />

            <a-textarea
              v-model="item.output"
              placeholder="输出"
              auto-size
              style="margin-top: 10px"
            />
          </a-card>
        </div>

        <a-button type="dashed" style="margin-top: 10px" @click="addCase">
          + 添加测试用例
        </a-button>

        <!-- 提交 -->
        <div class="submit-btn">
          <a-button type="primary" size="large" @click="handleSubmit">
            提交题目
          </a-button>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<style scoped>
.problem-container {
  max-width: 1400px;
  margin: auto;
}

.markdown-editor {
  min-height: 300px;
}

.case-list {
  margin-top: 20px;
}

.case-card {
  margin-bottom: 10px;
}

.case-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.submit-btn {
  text-align: center;
  margin-top: 30px;
}

:deep(.arco-input-number input) {
  text-align: center;
}
</style>
