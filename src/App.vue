<template>
  <div id="nav">
    <header class="header">
      <router-link to="/" class="header--link">ログイン</router-link>
      <router-link to="/signup" class="header--link">新規登録</router-link>
    </header>
    <router-view></router-view> 
  </div>
</template>

<style scoped>
.header {
  text-align: center;
  display: flex;
  justify-content: center;
}
.header--link {
  padding: 10px;
}

</style>
