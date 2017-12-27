<template>
  <div class="home">
            <div class="block">
      <el-carousel height="550px">
        <el-carousel-item v-for="item in hour" :key="item.class">
         <div :class = "[item.class,BGbasic]" ></div>
       </el-carousel-item>
      </el-carousel>
      </div>
        <div class="button_bar">
          <el-row :gutter="20">
             <el-col :span="6">
               <div class="button1"></div>
               </el-col>
           <el-col :span="6">
             <div class="button2"></div>
             </el-col>
             <el-col :span="6">
               <div class="button3"></div>
               </el-col>
           <el-col :span="6">
             <div class="button4"></div>
             </el-col>
    </el-row>
      
        </div>
        <div class="wire" ></div>
        
  </div>

</template>
<script>
export default {
  data() {
      return {
        BGbasic: 'bgbasic',
        hour: [{
          class: 'bg1' 
        },{
          class: 'bg2' 
        },{
          class: 'bg3' 
        },{
          class: 'bg4' 
        }]
      }
  }
}
</script>
<style scoped>
.bgbasic{
  width: 100%;
  height: 100%;
  
}
.bg1{
  background: url('./1.jpg') 0 0 /100% auto;
}
.bg2{
  background: url('./2.jpg') 0 0/100% auto ;
}
.bg3{
  background: url('./3.jpg') 0 0 /100% auto;
}
.bg4{
  background: url('./4.jpg') 0 0/100% auto ;
}
#home{

    text-align: center;
    min-width: 800px;
}
.block{
  width: 1200px;
  left: 0px;
  right: 0px;
  margin: 20px auto 20px auto;
}
.button_bar{
  width: 1200px;
  left: 0;
  right: 0;
  margin: auto;
}
.button1{
  background-color: #fed05d;
  height: 180px;
  width: 100%;
}
.button2{
  background-color: #8aff7d;
  height: 180px;
  width: 100%;
}
.button3{
  background-color: #83c0ff;
  height: 180px;
  width: 100%;
}
.button4{
  background-color: #fd6266;
  height: 180px;
  width: 100%;
}
.wire{
  width: 100%;
  /* background-color: #8aff7d; */
  height: 20px;
  margin-top: 20px;
  box-shadow:  0px 3px 5px #bdbdbd;
  margin-bottom: 20px;
}
</style>
