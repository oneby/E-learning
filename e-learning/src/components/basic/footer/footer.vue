<template>
<div id="footer">

  <div class="facebook-section">
      <div class="center"> 
          <Icon type="social-snapchat"></Icon> <p> 本站处于试运行阶段,此为展示用Demo,更多功能仍在开发中.....</p>
      </div>
	</div>
    <div class="footer_info">
    <el-row :gutter="20">
  <el-col :span="6">
      <p style="margin-bottem: 10px">开发者:</p>
      <a href="https://github.com/TOKdawn"> <img src="./1.jpg" class="autho_img"></a>
      <a href="https://github.com/Mr-WangZhe"> <img src="./5.jpg" class="autho_img"></a>
      <a href="https://github.com/Riunshow"> <img src="./3.jpg" class="autho_img"></a></br>
    
      <a href="https://github.com/VerJean"> <img src="./4.jpg" class="autho_img"></a>
      <a href="https://github.com/sansroman"> <img src="./2.jpg" class="autho_img"></a>
  </el-col>
  <el-col :span="6">
      设计模式:</br>
       <Tag closable color="blue">工厂方法模式</Tag>
    <Tag closable color="green">原型模式</Tag>
    <Tag closable color="red">观察者模式</Tag>
    <Tag closable color="yellow">命令模式</Tag>
    
    <Tag closable color="red">组合模式</Tag>
     <Tag closable color="green">享元模式</Tag>
    <Tag closable color="yellow">模板方法模式</Tag>
  </el-col>
  <el-col :span="6">
      技术栈:</br>
      <el-tag type="success">Vue</el-tag>
<el-tag type="info">Express</el-tag>
<el-tag type="warning">Vuex</el-tag>
<el-tag type="danger">Axios</el-tag>


<el-tag type="info">MongoDB</el-tag>
<el-tag type="warning">iView</el-tag>
<el-tag type="danger">Vue-router</el-tag>


  </el-col>
  <el-col :span="6">
      
          联系我们:</br>
          <p>OneBy:<a herf="https://github.com/oneby">&nbsphttps://github.com/oneby</a></br>
          QQ:&nbsp473187141

      </p>
  </el-col>
</el-row>
    </div>
</div>
</template>
<style scoped>
.facebook-section {
    background: url(./face.jpg) no-repeat 0px 0px;
    background-size: cover;
}
.center{
    width: 700px;
    left: 0;
    right: 0;
    margin: auto;
    color: aliceblue;
    font-size: 40px;
    padding-top:20px;
}
.center >p {
    font-size: 23px;
    display: inline;
    position: relative;
    top: -7px;
}
#footer{
    width: 100%;
    height: 350px;
    margin-top: 50px;
    background-color: #272727;
}
.footer_info{
    width: 1300px;
    left: 0;
    right: 0;
    margin: auto;
    color: #fff;
    font-size: 25px;
}
.autho_img{
    width: 90px;
}
</style>
<script>
export default {
  
}
</script>
