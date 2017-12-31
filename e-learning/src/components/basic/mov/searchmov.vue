<template>
 <div class="mov_list">
       
  
  <footer></footer>
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
    searchScore(id) {
      //  console.log("ssss")
      console.log(id);
      this.$router.push({ name: "score", params: { scorename: id } });
    }
  },
  created() {
    // console.log("/api/suggest?term=" + this.$route.params.keyword);
    if (this.$route.params.keyword == "$allmov") {
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
        .get("/file/search?courseName=" + this.$route.params.keyword)
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
}
</style>

