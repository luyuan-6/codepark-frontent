<template>
  <div id="userLayout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <h1>Code-Park</h1>
          <img src="../assets/logo.png" class="logo" alt="111" />
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">Code-Park</a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped>
#userLayout {
  text-align: center;
  //background: url("../assets/background.png");
  //background-image: url("../assets/background.jpg");
}

#userLayout .logo {
  width: 64px;
  height: 64px;
}

#userLayout .header {
  margin-bottom: 16px;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
}
</style>
