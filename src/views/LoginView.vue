<script setup lang="ts">
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import message from "@arco-design/web-vue/es/message";
import { UserControllerService } from "../../api";
import type { UserLoginRequest } from "../../api";

const router = useRouter();
const route = useRoute();
const store = useStore();

/**
 * 表单
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

/**
 * 登录
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);

  if (res.code === 0) {
    message.success("登录成功");

    // 更新用户信息
    await store.dispatch("user/getLoginUser");

    // redirect
    const redirect =
      typeof route.query.redirect === "string" ? route.query.redirect : "/";

    router.push(redirect);
  } else {
    message.error("登录失败：" + res.message);
  }
};

/**
 * 注册
 */
const goRegister = () => {
  router.push("/user/register");
};
</script>

<template>
  <div class="login-card">
    <div class="login-title">
      <img src="../assets/oj.png" class="logo" />
      <div class="title">DevOJ</div>
    </div>

    <a-form layout="vertical">
      <a-form-item label="用户名">
        <a-input v-model="form.userAccount" placeholder="请输入用户名" />
      </a-form-item>

      <a-form-item label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>

      <a-button type="primary" long @click="handleSubmit"> 登录 </a-button>

      <div class="register-tip">
        没有账号？
        <span class="register-link" @click="goRegister"> 注册 </span>
      </div>
    </a-form>
  </div>
</template>

<style scoped>
.login-card {
  width: 420px;
  margin: 120px auto;
  padding: 60px 50px;

  background: white;
  border-radius: 10px;

  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12), 0 3px 8px rgba(0, 0, 0, 0.08);

  transition: all 0.25s ease;
}

.login-card:hover {
  transform: translateY(-3px);
}

.login-title {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  height: 70px;
  margin-bottom: 12px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  color: #1890ff;
}

:deep(.arco-form-item) {
  margin-bottom: 24px;
}

.register-tip {
  margin-top: 12px;
  text-align: right;
}

.register-link {
  color: #165dff;
  cursor: pointer;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
