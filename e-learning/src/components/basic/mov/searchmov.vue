<template>
<div>
 <div class="mov_list">
     
        <el-card v-for="tiem in showData" :key="tiem._id" class="mov_card">
      <img :src="tiem.imgPath " class="image">
      <div style="padding: 14px;">
        <span>{{tiem.fileName}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ tiem.meta.updateAt}}</time>
          <el-button type="text" class="button" @click="mov(tiem._id)">观看视频</el-button>
        </div>
      </div>
    </el-card>
     
  </div>
  <tfooter></tfooter>
</div>
</template>
<script type="text/ecmascript-6">
import tfooter from "../footer/footer";
export default {
  data() {
    return {
      showData: {}
    };
  },
  components: {
    tfooter
  },
  methods: {
  
    mov(_id){
        // console.log(_id)
         this.$router.push({ name: "showmov", params: { id: _id } });
    }
  },
  created() {
    // console.log( this.$route.params.scorename);
    if (this.$route.params.scorename == "$allmov") {
        let _this = this;
        this.$axios
        .get("/file/alldata")
        .then((res) => {
          _this.showData = res.data.allFile;
          console.log(_this.showData)
        }).catch((err)=>{
                console.log('err:',err)
        })
    } else {
      let _this = this;
      this.$axios
        .get("/file/search?courseName=" + this.$route.params.scorename)
        .then(res => {
          _this.showData = res.data.searchRes;
            console.log(_this.showData)
        }).catch((err)=>{
                console.log('err:',err)
        })
    }
  }
};
</script>
<style scoped>
.mov_list {
  width: 1200px;
  left: 0;
  right: 0;
  margin: 20px auto 10px auto;
  background-color: antiquewhite;
  height: 800px;
}
.mov_card{
    width: 250px;
    margin: 10px;
    display: inline-block;
    text-align: center;
}
.image{
  width: 100%;
}
</style>

