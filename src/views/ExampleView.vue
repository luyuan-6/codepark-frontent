<template>
  <div class="home">
    <!--    <CodeEditor :value="codeValue" :handle-change="onCodeChange" />-->
    <!--    <MdEditor :value="mdValue" :handle-change="onMdchange" />-->
    <!--    <MainView />-->
    <h1>开发中！！！！！！敬请期待！！</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import MainView from "@/views/MainView.vue";

const codeValue = ref();

const onCodeChange = (val: string) => {
  codeValue.value = val;
};

const mdValue = ref();

const onMdchange = (val: string) => {
  mdValue.value = val;
};
</script>
