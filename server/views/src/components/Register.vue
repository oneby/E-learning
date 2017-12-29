<template>
  <div class="login">
    <el-row :gutter="10" class="layout">
      <el-col :xl="{span:8,offset:8}" :xs="{span:22,offset:1}" :sm="{span:22,offset:1}" :md="{span:22,offset:1}" :lg="{span:8,offset:8}">
          <div class="login-form">
              <el-form label-width="100px" label-position="right" ref="ruleForm" :rules="rules" :model="ruleForm" status-icon>
                <el-form-item label="账户" prop="username">
                  <el-input type="text" v-model="ruleForm.username" ></el-input>
                </el-form-item>
                <el-form-item label="斗鱼ID" prop="douyunn">
                  <el-input type="text" v-model="ruleForm.douyunn" ></el-input>
                </el-form-item>               
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="ruleForm.password" ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="ruleForm.checkPass" ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="register('ruleForm')">注册</el-button>
                  <el-button @click="reset('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
          </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: "Login",
  data() {

    let validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'));
    } else if(value.length<6){
       callback(new Error('密码不能少于6位'));
    }else{
         if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
    }
    };
    let validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
    };
    return {
      ruleForm: {
        username: "",
        douyunn:"",
        password: "",
        checkPass:""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        douyunn:[{required: true,trigger: "blur" }],        
        password:[{required: true,validator:validatePass,trigger: "blur" }],
        checkPass:[{required: true,validator:validatePass2,trigger: "blur" }],
        

      }
    };
  },
  methods: {
    register(formName) {
      let router = this.$router;
      this.$refs[formName].validate((vaild)=>{
        if (vaild) {
          axios
        .post("/register", {
          username:this.ruleForm.username,
          douyunn:this.ruleForm.douyunn,
          password:this.ruleForm.password
        })
        .then(function(response) {
          router.push('/login');
        })
        .catch(function(error) {
          console.log(error);
        });
        }else{
          return false;
        }
      })

    },
    reset(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script scoped>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .layout{
      margin-top: 20px;
    }
</style>