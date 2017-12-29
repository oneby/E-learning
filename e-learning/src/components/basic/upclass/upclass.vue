<template>
  <div id="bg">
    <div id="upclass">
    <p>视频图片:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      &nbsp&nbsp
      &nbsp&nbsp&nbsp&nbsp
      视频源:

    </p>


    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :multiple="false"
      accept="image/*"
      :before-upload="beforeAvatarUpload"
      id="upimg">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div id="up_info">
    上传视频，即表示您已同意用户使用协议</br>请勿上传色情，反动等违法视频。
    </br>允许上传的视频格式为:mp4,webm,rm,rmvb</br>允许上传的视频大小上限为:4G</br>
    视频图片上传jpg/png文件，且不超过500kb


        </div>

      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        accept="video/*"
        :multiple="false"
        id="upvido"
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
      
      </el-upload>

    </div>
   <tfooter></tfooter>
  </div>

</template>
<script>
import tfooter from '../footer/footer'
 export default {
    data() {
      return {
        imageUrl: ''
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    components:{
      tfooter
    }
  }
</script>
<style >

#upclass{
  /* background-color: #eee; */
  width: 1000px;
  left: 0;
  right: 0;
  margin: 30px auto 0px auto;
  height: 400px;
  border-radius: 5px;
  /* text-align: center; */
}
#upclass >p{
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
    border-color: #409EFF;
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
#upimg{
  float: left;
}
.upload-demo{
  width: 360px;
}
#upvido{
  display: inline;
  margin-left: 60px;
}
#up_info{
  /* background-color: #409EFF; */
  display: inline-block;
  margin-left: 0px;
  height: 180px;
  width: 380px;
  float: right;
  font-size: 18px;
  color: #666;
  line-height: 28px;
  padding-top: 10px;
}
</style>
