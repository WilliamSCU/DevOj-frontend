const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = defineConfig({
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8121",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },

  transpileDependencies: true,

  chainWebpack(config) {
    config.plugin("monaco").use(MonacoWebpackPlugin, [
      {
        //运行时加载的编程语言，按需加载
        //languages: ["java", "cpp", "java", "python", "go", "rust"],
      },
    ]);
  },
});
