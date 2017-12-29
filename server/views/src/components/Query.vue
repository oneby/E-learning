<template>
  <div id="query">
        <div :class="{data:hasData||this.$root.$data.isMoblie}" class="search">
        <el-input placeholder="请输入斗鱼ID" v-model="querytext" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="精确搜索" value="0"></el-option>
              <el-option label="模糊搜索" value="1"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="query"></el-button>
        </el-input>
        </div>
    <el-table 
      stripe
      border
      :data="danmuData" 
      v-show="isHiddle"
      >
      <el-table-column :fixed="this.$root.$data.isMoblie" prop="nn" label="斗鱼ID" width="100">
      </el-table-column>
      <el-table-column prop="rid" label="房间号" width="80">
      </el-table-column>
      <el-table-column prop="uid" label="斗鱼UID" width="100">
      </el-table-column>
      <el-table-column prop="txt" label="发言" width="300">
      </el-table-column>
      <el-table-column label="时间" width="140">
          <template slot-scope="scope">
            <p>{{scope.row.date}}</p>
            <p>{{ scope.row.time}}</p>
          </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-popover
              ref="uidList"
              placement="right"
              width="150"
              trigger="click">
              <el-table :data="gridData">
                <el-table-column width="150" property="nn" label="斗鱼ID"></el-table-column>
              </el-table>
            </el-popover>
            <el-button @click="find(scope.row)" v-popover:uidList type="primary" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      v-show="isHiddle"
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :small="this.$root.$data.isMoblie"
      :current-page="currentPage"
      :page-size=20
      :total='total'>
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "query",
  data() {
    return {
      querytext: "",
      select: "0",
      danmuData: [],
      gridData: [],
      total: 0,
      currentPage: 1
    };
  },
  methods: {
    query() {
      this.handleCurrentChange(1);
    },
    find(data) {
      let self = this;
      axios
        .get("/api/danmu?uid=" + data.uid)
        .then(function(response) {
          self.$message({
            type: "success",
            message: "读取成功!"
          });
          self.gridData = response.data;
        })
        .catch(function(error) {
          self.gridData = [];
          self.$message.error(error.response.data);
        });
    },
    handleCurrentChange(cur) {
      cur = cur - 1;
      if(first==true) return;      
      if(this.select==1)cur = cur+"&fuzzy=true";
      let self = this;
      axios
        .get("/api/danmu?douyunn=" + self.querytext + "&cur=" + cur)
        .then(function(response) {
          self.$message({
            type: "success",
            message: "读取成功!"
          });
          response.data.result.forEach(element => {
            let tempTime = new Date(element.time);
            element.date = tempTime.toLocaleDateString();
            element.time = tempTime.toLocaleTimeString();
          });
          self.danmuData = response.data.result;
          self.total = response.data.total;
        })
        .catch(function(error) {
          self.$message.error(error.response.data);
        });
    }
  },
  computed: {
    isHiddle() {
      return this.hasData ?true:false;
    },
    hasData() {
      return this.danmuData.length !== 0;
    }
  }
};
</script>

<style>
#query {
  color: #2c3e50;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.search{
  width: 30%;
  margin-left: 35%;
  margin-top: 10%;
}
.data.search{
  width: 100%;
  margin-left: 0%;
  margin-top: 0%;
}

</style>
