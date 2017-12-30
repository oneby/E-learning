<template>
  <el-container> 
   <el-header id="retrieveHeader">       
   </el-header> 
   <el-main> 
    <row> 
     <i-col span="16"> 
      <card v-for="tiem in showData.data" :key="tiem._id" class="card" > 
          <div @click="searchScore(tiem._id)">
       <row> 
        <i-col span="7"> 
         <p class="cadImg"> <img :src="tiem.cover" /></p> 
        </i-col> 
        <i-col span="16" > 
         <p id="cadTitel">{{tiem.title}}</p> 
         <p>
          <el-tag v-for="tag in tiem.tags" :key="tag" class="cadTag" >
           {{tag}}
          </el-tag></p> 
         <el-row type="flex" class="row-bg" justify="space-around" id="cardInfo"> 
          <el-col :span="3">
           <icon type="eye"></icon>24
          </el-col> 
          <el-col :span="8">
           <icon type="ios-person"></icon>{{tiem.userId}}
          </el-col> 
          <el-col :span="12">
           {{tiem.updateAt}}
          </el-col> 
         </el-row> 
        </i-col> 
       </row> 
          </div>
      </card> 
     </i-col> 
     <i-col span="8">
      col-12
     </i-col> 
    </row> 
   </el-main>
  <footer></footer>
  </el-container> 
</template>
<script type="text/ecmascript-6">
import tfooter from '../footer/footer'
export default {
  data() {
    return {
        showData : {}
    };
  },
  components: {
    tfooter  
  },
  methods: {
   
     searchScore(id){
        //  console.log("ssss")
            console.log(id)
            this.$router.push({name: 'score', params: { scorename:id}})
        }
  },
  created() {
      console.log('/api/suggest?term='+this.$route.params.keyword)
      
      let _this = this;
      this.$axios.get('/api/suggest?term='+this.$route.params.keyword)
      .then((res)=>{
        _this.showData = res.data
      })
     
      
  },
 
};
</script>
<style lang="scss" scoped>
$--main-font-color: #888;
$--special-font-color: #666;
$--button-color:#8ebebc;
$--classification-color: #f1f5f5;
$--tspectrum-color: #ecf1f1;
$--donation-color: #e8edec;
$--about-color:#dce3e2;
#retrieveHeader{
    padding-top:20px;
    height: 120px !important;
    background: #666;
}
.cadImg{
    width: 80%;
    height: 110px;
    overflow: hidden;
}
.cadImg img{
    width: 100%;
    height: auto;
}
.card{
    margin-bottom: 5px;
}
#cardInfo{
    color: $--main-font-color;
    
    margin-top: 20px;
}
#cardInfo i{
    color: $--special-font-color;
    margin-right: 5px;
    font-size: 19px;
    vertical-align:bottom;
}
#cardInfo div{
    vertical-align: bottom;
    font-size: 14px;
}
#cadTitel {
    // border-bottom: 1px solid;
    margin-bottom:5px; 
    font-size: 23px;
}
.cadTag {
    margin-right: 5px;
}

</style>
