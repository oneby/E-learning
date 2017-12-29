<template>
  <div class="error">
    <p>{{error.info}}</p>
  </div>
</template>

<script>
export default {
  name: 'error',
  data () {
      return{
        error:{
          info:'权限不够'
        }
      }
      
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
