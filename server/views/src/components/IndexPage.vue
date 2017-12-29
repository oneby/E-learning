<template>
  <div class="index">
      <el-container>
            <el-aside width="10%">
                <el-menu
                :collapse="this.$root.$data.isMoblie"
                default-active="total"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                router>         
                    <el-menu-item v-show="isSuper" index="/index/total">
                        <i class="el-icon-menu"></i>
                        <span slot="title">网站总览</span>
                    </el-menu-item>                    
                    <el-menu-item v-show="isAdmin" index="/index/query">
                        <i class="el-icon-menu"></i>
                        <span slot="title">弹幕查询</span>
                    </el-menu-item>
                    <el-menu-item v-show="isSuper" index="/index/manager">
                        <i class="el-icon-menu"></i>                    
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                    <el-menu-item v-show="isAdmin" index="/index/mute">
                        <i class="el-icon-menu"></i>                    
                        <span slot="title">禁言查询</span>
                    </el-menu-item>

                    <div class="userInfo">
                        <p class="role">{{job}}:</p>
                        <p class="username">{{username}}</p>
                        <!-- <a href="#">注销</a> -->
                    </div>            
                </el-menu>
          </el-aside>
          <el-main>
              <router-view></router-view>
              <h3 v-show="!isAdmin">功能等待开发</h3>
          </el-main>
      </el-container>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
        roles:{},
        username:""
    };
  },
  mounted(){
      this.roles = JSON.parse(sessionStorage.getItem('roles'));
      this.username = sessionStorage.getItem("username");

  },
  computed:{
      isSuper(){
          return this.roles.manager&&this.roles.manager>2
        // return true
      },
      isAdmin(){
          return this.roles.query&&this.roles.query>2;
        // return true
      },
      job(){
          if(this.isSuper) return "管理员"
          else if(this.isAdmin) return "房管"
          else return "游客"
      }
  },
  methods:{
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.index,.el-container,.el-container ul{
    height: 100%;
}
.el-menu{
    border: 0;
    opacity: 0.8;
}
.userInfo{
    width: calc(10% - 20px);
    width: -moz-calc(10% - 20px);
	width: -webkit-calc(10% - 20px);

    position: fixed;
    bottom: 10px;
    padding-left: 20px;
    color: rgb(255, 255, 255);
    background-color: rgb(84, 92, 100);
}
.username{
    margin: 10px;
    font-size: 14px;
}

a{
    text-decoration: none;
    font-size: 20px;
    color: salmon;
}
</style>
