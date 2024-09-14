<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 400px; height: 60vh"
  ></div>
  <!--  <a-button @click="fillValue">填充值</a-button>-->
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { withDefaults, onMounted, ref, toRaw, defineProps, watch } from "vue";

const codeEditorRef = ref();
const codeEditor = ref();

/**
 * 定义组件属性类型
 */
interface Props {
  code: any;
  language?: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  code: "import java.util.Scanner;\n// 1:无需package\n// 2: 类名必须Main, 不可修改\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        //在此输入您的代码...\n        scan.close();\n    }\n}",
  handleChange: (v: string) => {
    console.log(v);
  },
  language: () => "java",
});

// 切换代码时候高亮显示
watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      // 改变值的关键代码
      toRaw(codeEditor?.value).getModel().setValue(props.code);
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.code,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true, // 颜色装饰器
    minimap: {
      enabled: true,
      size: "fit",
    },
    readOnly: false,
    theme: "vs-dark",
    lineNumbers: "on",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
  });
  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    // 在获取codeEditor的值的时候 必须加toRaw 不然页面会卡死
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>
<style scoped></style>
