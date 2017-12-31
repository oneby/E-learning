<template>
  <div class="home">
            <div class="block">
      <el-carousel height="550px">
        <el-carousel-item v-for="item in hour" :key="item.class">
         <div :class = "[item.class,BGbasic]" ></div>
       </el-carousel-item>
      </el-carousel>
      </div>
        <div class="button_bar" >
          <el-row :gutter="20">
             <el-col :span="6">
               <div class="button1" @click="fnwork">
                 <Icon type="ios-bookmarks"></Icon>
                 <p  class="button_p">{{work}}</p>
               </div>
               </el-col>
           <el-col :span="6">
             <div class="button2" @click="watchmov">
                <Icon type="social-youtube"></Icon>
                <p class="button_p">观看视频</p>
             </div>
             </el-col>
             <el-col :span="6">
               <div class="button3" @click="fnclas">
                  <Icon type="android-download"></Icon>
                  <p class="button_p">{{clas}}</p>
               </div>
               </el-col>
           <el-col :span="6">
             <div class="button4" >
               <Icon type="outlet"></Icon>
               <p class="button_p">敬请期待</p>
             
             </div>
             </el-col>
     </el-row>
      
        </div>
        <div class="wire" ></div>


        <div class="vidoe">
        <p ><Icon type="speakerphone" ></Icon>&nbsp<span style="color:#000;">热门视频</span></p>
        <div class="vidoe_bar">
         <el-card :body-style="{ padding: '0px' }" class="vidoe_cord">
      <img src="./1.jpg" class="image">
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          
          <el-button type="text" class="button">观看视频</el-button>
        </div>
      </div>
    </el-card>
     <el-card :body-style="{ padding: '0px' }" class="vidoe_cord">
      <img src="./2.jpg" class="image">
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          
          <el-button type="text" class="button">观看视频</el-button>
        </div>
      </div>
    </el-card>
     <el-card :body-style="{ padding: '0px' }" class="vidoe_cord">
      <img src="./3.jpg" class="image">
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
         
          <el-button type="text" class="button">观看视频</el-button>
        </div>
      </div>
    </el-card>
     <el-card :body-style="{ padding: '0px' }" class="vidoe_cord">
      <img src="./4.jpg" class="image">
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          
          <el-button type="text" class="button">观看视频</el-button>
        </div>
      </div>
    </el-card>
     <el-card :body-style="{ padding: '0px' }" class="vidoe_cord">
      <img src="./5.jpg" class="image">
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          
          <el-button type="text" class="button">观看视频</el-button>
        </div>
      </div>
    </el-card>
        </div>
        </div>
        <thefooter></thefooter>
  </div>

</template>
<script>
import store from '../../../vuex/index'
import thefooter from '../footer/footer'
export default {
  data() {
      return {
        userrole: 10,
        BGbasic: 'bgbasic',
        hour: [{
          class: 'bg1' 
        },{
          class: 'bg2' 
        },{
          class: 'bg3' 
        },{
          class: 'bg4' 
        }],
        work: '提交作业',
        clas: '下载课件'
        
      }
  },
  created(){
    if(store.state.userdata.role === 20){
      this.work = '批改作业',
      this.clas = '发布课件',
      this.userrole = 20
    }
  },
  methods :{
      fnwork: function(){
        switch(this.userrole){
          case 20 :
            this.$router.push("/basic/upwork")
            break;
          case 10 :
            this.$router.push("/basic/downwork")
            break;
        }
      },
      fnclas: function(){
         switch(this.userrole){
          case 20 :
            this.$router.push("/basic/upclass")
            break;
          case 10 :
            this.$router.push("/basic/downclass")
            break;
        }
      },
      watchmov: function(){
         this.$router.push({name: 'score', params: { scorename: '$allmov'}}) 
      }

  },
  components: {
    thefooter
  }
}
</script>
<style lang="scss" scoped>


$--center-width:1200px;
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
  width: $--center-width;
  left: 0px;
  right: 0px;
  margin: 20px auto 20px auto;
}
.button_bar{
  width: $--center-width;
  left: 0;
  right: 0;
  margin: auto;
}

.button1{
   cursor:pointer;
  background-color: #fed05d;
  text-align: center;
  color: #fff;
  font-size: 88px;
  height: 180px;
  width: 100%;
}
.button2{
   cursor:pointer;
  background-color: #8aff7d;
   text-align: center;
  color: #fff;
    font-size: 88px;
  height: 180px;
  width: 100%;
}
.button3{
   cursor:pointer;
  background-color: #83c0ff;
   text-align: center;
  color: #fff;
    font-size: 88px;
  height: 180px;
  width: 100%;
}
.button4{
   cursor:pointer;
  background-color: #fd6266;
   text-align: center;
  color: #fff;
    font-size: 88px;
  height: 180px;
  width: 100%;
}
.button_p{
  font-size: 25px;
}

.wire{
  width: 100%;
  /* background-color: #8aff7d; */
  height: 20px;
  margin-top: 20px;
  box-shadow:  0px 3px 5px #bfbfbf;
  margin-bottom: 20px;
}
.vidoe{
  width: 100%;
  overflow: hidden;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
}
.vidoe >p{
  font-size: 35px;
  color: deeppink;
}
.vidoe_bar{
  height: 350px;
  // background-color: #bfbfbf;
  width: 1400px;
  left: 0;
  right: 0;
  margin: 20px auto 0 auto;
 
}
.image{
  width: 100%;
}
.vidoe_cord{
  width: 250px;
  float: left;
  margin: 0px 15px;
}
.vidoe_cord span{
  font-size: 20px;
}
.button{
  font-size: 20px;
}
</style>
