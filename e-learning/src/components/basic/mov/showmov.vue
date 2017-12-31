<template>
  <div>
  <div id="movbar">
    <p>{{movData.fileName}}</p>
    <video :src="movData.filePath" controls="controls" class="mov">
        您的浏览器不支持 video 标签。
    </video>
  </div>
  <div class="mov">
    
  </div>
  <tfooter></tfooter>
  </div>

</template>
<script>
import tfooter from '../footer/footer'
export default {
  data() {
      return {
        movData: '',
        commentData: '',
        comment : ''
      }
  },
  methods: {
    
  },
  created(){
     console.log( this.$route.params.id);
        let _this = this;
        this.$axios
        .get("/file/detail/"+this.$route.params.id)
        .then((res) => {
          _this.movData = res.data;
          console.log(_this.movData)
        }).catch((err)=>{
                console.log('err:',err)
        })
         this.$axios
        .get("/comment/results/"+this.$route.params.id)
        .then((res) => {
          _this.movData = res.data;
          console.log(_this.movData)
        }).catch((err)=>{
                console.log('err:',err)
        })
  },
  components:{
    tfooter
  }
  

}
</script>
<style scoped>
.mov{
  width: 900px;
  height: 600px;
  left: 0;
  right: 0;
  margin: 10px auto;
  display: block;
}
#movbar{
  text-align: center;

}
#movbar >p{
  font-size: 20px;
}
</style>
