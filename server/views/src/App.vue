<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>


html,body{
  height: 100%;
  overflow:hidden;
  width: 100%;
  background-color: #54364a;
  background-size: cover;
  background-image:url(./assets/a.jpg);
}
#app {
  color: #fff;
  min-height: 600px;
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
}
</style>
