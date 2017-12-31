<template>
  <div id="bg">

    <el-form ref="newform" :model="newform" >
    <div id="upclass">
    <p>视频图片:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      &nbsp&nbsp
      &nbsp&nbsp&nbsp&nbsp
      视频源:

    </p>


        <el-form-item label="" >
    <el-upload
      class="avatar-uploader"
      :action="upload_url"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="newimg"
      :multiple="false"
      accept="image/*"
      ref="uploadimg"
      name="bgimg"
      id="upimg">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    </el-form-item>
    <div id="up_info">
    上传视频，即表示您已同意用户使用协议</br>请勿上传色情，反动等违法视频。
    </br>允许上传的视频格式为:mp4,webm,rm,rmvb</br>允许上传的视频大小上限为:4G</br>
    视频图片上传jpg/png文件，且不超过500kb
            <el-form-item >
        <el-button type="primary" @click="newSubmitForm()" class="yes-btn">
          确 定
         </el-button>
         </el-form-item>
        </div>

        <el-form-item label="" >
      <el-upload
        class="upload-demo"
        drag
        :action="upload_url"
        accept="video/*"
        :before-upload="newVideo"
        :multiple="false"
        ref="uploadvideo"
        id="upvido"
        name="video"
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
      </el-upload>
        </el-form-item>
   
    </div>
     </el-form>
   <tfooter></tfooter>
  </div>

</template>
<script>
import tfooter from "../footer/footer";
export default {
  data() {
    return {
      imageUrl: "",
      upload_url: "aaa", // 随便填一个，但一定要有
      uploadForm: new FormData(), // 一个formdata     // 用到的规则
      newform: {}
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    newimg: function(file) {
      this.uploadForm.append("bgimg", file);
      console.log("img join  formdata")
      return false;
    },
    newSubmitForm: function() {
        let _this = this;
        console.log("formdata:",this.formdata)
      this.$axios({
        method: "POST",
        url: "/file/upload",
        data:  _this.uploadForm
      }).then( (res) =>{
          console.log("res:",res.data)
      }).catch((err)=>{
          console.log("error")
      })
      this.$refs.uploadvideo.submit()
      this.$refs.uploadimg.submit()
    },
    newVideo: function(file) {
      this.uploadForm.append("video", file);
      console.log("video join form")
      return false;
    }
  },
  components: {
    tfooter
  }
};
</script>
<style >
#upclass {
  /* background-color: #eee; */
  width: 1000px;
  left: 0;
  right: 0;
  margin: 30px auto 0px auto;
  height: 400px;
  border-radius: 5px;
  /* text-align: center; */
}
#upclass > p {
  font-size: 23px;
  color: #333;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  background-color: aliceblue;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
#upimg {
  z-index: 50;
  float: left;
}
.upload-demo {
  width: 360px;
}
#upvido {
  display: inline;
  margin-left: 220px;
}
#up_info {
  /* background-color: #409EFF; */
  display: inline-block;
  margin-left: 0px;
  height: 180px;
  width: 380px;
  float: right;
  font-size: 18px;
  color: #666;
  line-height: 28px;
 
}
.el-form-item{
  display: inline;
  position: absolute;
  width: 0;
}
.yes-btn{
  position: relative;
  margin-top: 30px;
  margin-left: -342px;
}
</style>
