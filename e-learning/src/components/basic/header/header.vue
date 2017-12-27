<template>
  <div id="header">
      <el-row :gutter="20">
     <el-col :span="4">
         <img src="../../login/logo.png" alt="logo" class="header_logo">
         
     </el-col>
    <el-col :span="16">

     <div  id="search">
  <el-input placeholder="请输入内容" v-model="searchData" class="input-with-select">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
     </div>
    </el-col>
    <el-col :span="4">
        <div class="photo">
            <img :src="imgsrc" alt="portrait" style="width:100%; cursor：pointer;"> 
        </div>
    </el-col>
    </el-row>
  </div>

</template>
<script>
export default {
  data () {
      return {
          searchData: '',
          imgsrc: require('./user.jpg')
      }
  }
}
</script>
<style scoped>

#header{
    height: 100px;
    text-align: center;
    min-width: 800px;
}
#search{
    max-width: 500px;
    left: 0;
    right: 0;
    margin: 30px auto 0px auto;
    height: 60;
    
}
.header_logo{
    height: 70px;
    margin-top: 15px;
    margin-left: 0px;
}
.photo{
        display: block;
    border: 1px solid #fff;
    border-radius: 300px;
    width: 80px;
    height: 80px;
    margin: 8px auto;
    position: relative;
    overflow: hidden;
    background: #88acdb;
    -webkit-transition: all .2s ease-in;
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    text-align: center;
    cursor:pointer;

}

</style>
<style>
.el-input-group{
    border-radius: 20px;
}
</style>
