<template>
  <div>
    <heeader></heeader>
    <router-view></router-view>
  </div>

</template>
<script>
import heeader from "./header/header.vue";
export default {
  data() {
    return {};
  },
  components: {
    heeader
  }
};
</script>
<style scoped>

</style>
