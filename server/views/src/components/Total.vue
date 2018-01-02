<template>
  <div id="total">
       <h2>Dashborad</h2>
       <el-row>
         <el-col :md="3" :xs="12" :sm="6" class="stats-container">
              <div class="stats-heading">今日访客</div>
              <div class="stats-body-alt"> 
                <div class="text-center">
                  <span class="text-top"></span>{{statistics.views}}
                </div>
              </div>
              <div class="stats-footer">more info</div>
         </el-col>
          <el-col :md="3" :xs="12" :sm="6" class="stats-container">
              <div class="stats-heading">今日查询</div>
              <div class="stats-body-alt"> 
                <div class="text-center">
                  <span class="text-top"></span>{{statistics.queryCount}}
                </div>
              </div>
              <div class="stats-footer">more info</div>
         </el-col>
       </el-row>

  </div>
</template>


<style scoped>
.stats-container{    display: block;    margin: 0 0 20px;}
.stats-heading {    background-color:rgba(0,0,0,0.3);    border-top-left-radius: 2px;    border-top-right-radius: 2px;    letter-spacing: 0.04em;    padding: 5px 10px;    text-align: center;    text-transform: uppercase;}
.stats-body-alt {    background-color:rgba(0,0,0,0.4);    border-bottom-left-radius: 0;    border-bottom-right-radius: 0;    font-size: 48px;    font-weight: 300;    padding: 10px;}
.stats-body-alt .text-center {    margin-top: -5px;}
.stats-body-alt .text-top {    font-size: 24px;    vertical-align: super;}
.stats-body-alt div + small {    display: block;    font-size: 14px;    font-weight: 400;    margin-bottom: 4px;    margin-top: -7px;    opacity: 0.7;    text-align: center;}
.stats-body-alt div + small {    display: block;    font-size: 14px;    font-weight: 400;    margin-bottom: 4px;    margin-top: -7px;    opacity: 0.7;    text-align: center;}
.stats-footer {    border-bottom-left-radius: 2px;    border-bottom-right-radius: 2px;    color: rgba(255, 255, 255, 0.4);    padding: 5px 10px; 	background-color:rgba(0,0,0,0.5);}
h2{
  margin: 20px 0;
}
.el-col{
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
}
</style>


<script>
import axios from "axios";
export default {
  name: "total",
  data() {
    return {
      statistics:{
        views:0,
        queryCount:0
      }
    };
  },
  mounted() {
    let self = this;
    axios
    .get("/api/statistics")
    .then(function (response) {
      self.statistics = response.data;
    }).catch((err)=>{
      selt.$message.error(error.response.data);
    })
  }
};
</script>  
