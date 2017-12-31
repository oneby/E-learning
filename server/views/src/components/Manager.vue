<template>
  <div id="manager">
    <el-table v-loading 
      :data="userData"
      :default-sort = "{prop: 'role', order: 'descending'}"
    >
      <el-table-column sortable :fixed="this.$root.$data.isMoblie" prop="username" label="用户名" width="150">
      </el-table-column>
      <el-table-column prop="douyunn" label="斗鱼ID" width="120">
      </el-table-column>
      <el-table-column prop="uid" label="斗鱼UID" width="120">
      </el-table-column>
      <el-table-column label="角色" width="140">
        <template slot-scope="scope">
          <el-select v-model="userData[scope.$index].role" placeholder="请选择">
            <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
              <span>{{ item.label }}</span>
            </el-option>
          </el-select>
        </template>

      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="modifyUser(scope.row)" type="primary" size="small">修改</el-button>
          <el-button @click="delUser(scope.$index,scope.row)" :disabled="userData[scope.$index].role==0" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      v-show='isHiddle'
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :small="this.$root.$data.isMoblie"
      :current-page="currentPage"
      :page-size="20"
      :total='total'>
    </el-pagination>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "manager",
    data() {
      return {
        userData: [],
        roles: [{
            value: 0,
            label: "管理员",
            disabled: true
          },
          {
            value: 1,
            label: "房管"
          },
          {
            value: 2,
            label: "游客"
          }
        ],
        total: 0,
        currentPage: 1,
      };
    },
    methods: {
      delUser(index, data) {
        let self = this;
        this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
            cancelButtonText: "取消",
            confirmButtonText: "确定",
            type: "warning"
          })
          .then(() => {
            axios
              .delete("/api/user?username=" + data.username)
              .then(function (response) {
                self.userData.splice(index, 1);
                self.$notify({
                  title: "成功",
                  type: "success",
                  message: "删除成功!"
                });
              })
              .catch(function (error) {
                this.$message.error(error);
              });
          })
          .catch(() => {
            self.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      handleCurrentChange(cur){
        let self = this;
        cur--;
        axios
          .get("/api/allUser?cur="+cur)
          .then(function (response) {
            self.userData = response.data.result;
            self.total = response.data.total
          })
          .catch(function (error) {
            self.$message.error(error.response.data);
          });
      },
      modifyUser(data) {
        let self = this;
        self
          .$confirm("确认修改?", "提示", {
            cancelButtonText: "取消",
            confirmButtonText: "确定",
            type: "warning"
          })
          .then(() => {
            axios
              .put("/api/user", {
                username: data.username,
                role: data.role
              })
              .then(function (response) {
                self.$notify({
                  title: "成功",
                  type: "success",
                  message: "修改成功!"
                });
              })
              .catch(function (error) {
                self.$message.error(error.response.data);
              });
          })
          .catch(() => {
            self.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    mounted() {
      // let self = this;
      // axios
      //   .get("/api/allUser")
      //   .then(function (response) {
      //     self.userData = response.data;
      //   })
      //   .catch(function (error) {
      //     self.$message.error(error);
      //   });
      this.handleCurrentChange(1);
    },
    computed:{
      total(){
        return this.userData.length;
      }
      ,isHiddle(){
        return this.total!==0;
      }
  }
  };

</script>

<style>
  #manager {
    color: #2c3e50;
  }

</style>
