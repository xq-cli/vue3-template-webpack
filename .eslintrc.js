module.exports = { //继承 Eslint规则
    extends: ["plugin:vue/vue3-essential","plugin:vue/vue3-strongly-recommended","eslint:recommended"],
    env: {
        node: true, //启用node中全局变量
    },
    parserOptions: {
        parser:"@babel/eslint-parser"
    }
}