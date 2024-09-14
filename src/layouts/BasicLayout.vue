<template>
  <div id="userLayout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header">
        <GloalHeader />
      </a-layout-header>
      <a-layout-content class="content"><router-view /></a-layout-content>
      <a-layout-footer class="footer">
        <h1>Code-Park</h1>
        <h4>
          电话：XXXXXXXXXXXXXXXXX<a-divider
            direction="vertical"
          />地址：XXXXXXXXXXXXXXXXX
        </h4>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GloalHeader from "@/components/GloalHeader.vue";
</script>
<style scoped>
#userLayout {
}
#userLayout .header {
  position: fixed;
  width: 100%;
  height: 60px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin-bottom: 2px;
  z-index: 100;
}

#userLayout .content {
  margin-bottom: 0px;
  min-height: 900vh;
  padding: 0px;
  z-index: 50;
}

#userLayout .footer {
  background: #5073fc;
  padding: 16px;
  bottom: 0;
  right: 0;
  left: 0;
  max-height: 140px;
  text-align: center;
  z-index: 100;
}
</style>
