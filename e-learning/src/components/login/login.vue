<template>
    <div id="login">
         <img src="./logo.png" class="home_logo">
         <p class="infor">分享改变世界,编程构建未来</p>

          <div class="logBar">
        <a @click="changeicoflag()">你是?</a>
        <div id="logicon" :class="{icomove:icoflag}">
       <div class="icobar" @click="student()"><Icon type="person"> </Icon>学生</div>
       <div class="icobar" @click="teacher()"><Icon type="university"> </Icon>教师</div>
       <div class="icobar" @click="manage()"><Icon type="person-stalker"> </Icon>管理员</div>
        </div>
      </div>



      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline id="logform">
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="用户名">    
            </Input>
        </FormItem>
        <FormItem prop="password" id="loginform">
            <Input type="password" v-model="formInline.password" placeholder="密码"> 
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')" id="loginbutton">登录</Button>
        </FormItem>
      </Form>
    </div>
</template>
<script type="text/ecmascript-6">
import store from "@/vuex/index.js";
export default {
  data() {
    return {
      icoflag: false,
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { type: "string", min: 2, message: "密码最小六位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      let _this = this;

      this.$axios
        .post("/user/login", {
          loginNum: this.formInline.user,
          loginPsd: this.formInline.password
        })
        .then(function(response) {
          console.log(response.data.role);
          if (response.data.role !== 30 ) {
            var userData = {
              role: parseInt(response.data.role),
              name: response.data.name
            };
            store.commit("updata", userData);
            console.log("rouke")
            _this.$router.push("/basic/home");
          }
        })
        .catch(function(error) {
          console.log("请求失败");
        });
    },
     changeicoflag() {
                this.icoflag = !this.icoflag
                console.log(this.icoflag)
      },
      student() {
        let userdata = {
          role: 10,
          name: 'dawn',
          accountnum: 15180600303
        }
        store.commit("updata",userdata);
        this.$router.push("/basic/home")
      },
      teacher() {
        let userdata = {
          role: 20,
          name: 'shaow',
          accountnum: 122222222321
        }
        store.commit('updata', userdata);
        this.$router.push("/basic/home")
      }
  }
};
</script>
<style lang="scss">

$--login-width: 256px;
#login {
  width: 500px;
  margin: auto;
  text-align: center;
  left: 0;
  right: 0;

  display: block;
}
.home_logo {
  width: 200px;
  margin-top: 100px;
}
@keyframes icomove {
  0% {
    -webkit-transform: translate(-5px, 0);
    transform: translate(-5px, 0px);
    color: rgba(188, 188, 188, 0);
  }

  100% {
    -webkit-transform: translate(0px, 0px);
    transform: translate(0px, 0px);
    clear: rgba(188, 188, 188, 0.8);
  }
}
.ziconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
}
#loginform div input {
  width: $--login-width;
  
}
#logform{
  margin-top: 20px;
}
#loginbutton {
  width: $--login-width;
  font-size: 15px;
}
.ivu-input {
  width: $--login-width;
}
.logBar {
  
  text-align: left;
  width: $--login-width;
  vertical-align: top;
  line-height: 24px;
  left: 0;
  right: 0;
  width: 250px;
  margin: 20px auto 0px auto;
}
.logBar a {
  display: inline-block;
  color: #888;
  font-size: 14px;
  line-height: 24px;
}
.logBar a:hover {
  color: #666;
}
#logicon {
  //    -webkit-transform: translate(-10px,0);
  //      transform: translate(-10px, 0px);
  //     color:rgba(117,117,117,0);
  display: none;
  margin-left: 5px;
  line-height: 28px;
  vertical-align: top;
  color: #888;
  letter-spacing: 3px;
  font-size: 15px;

}
.icobar{
  display: inline-block;
}
.icomove {
  animation: icomove 1s;
  -webkit-animation: icomove 1s;
  display: inline-block !important;
}
#logicon i:hover {
  color: #666;
}
.infor{
  margin-top: 20px;
  color:#666;
  font-size: 18px;
  text-align: center;
}
</style>
