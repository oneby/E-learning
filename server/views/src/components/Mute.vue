<template>
  <div id="mute">
       <div id="echarts" :style="{width: '100%', height: '800px'}"></div>
      <el-table v-loading :data="formData">
        <el-table-column fixed prop="nn" label="用户名" width="150">
        </el-table-column>
        <el-table-column fixed prop="count" label="总数" width="150">
        </el-table-column>
      </el-table>
  </div>
</template>


<style>
#query {
  color: #2c3e50;
}
</style>


<script>
import echarts from "echarts";
import axios from "axios";
export default {
  name: "mute",
  data() {
    return {
      option: {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: []
          }
        ]
      }
    };
  },
  methods: {
    init(url, targetEl) {
      axios
        .get(url)
        .then(response => {
          this.option.xAxis[0].data = response.data.nnList;
          this.option.series[0].data = response.data.countList;
          console.log(this.option);
          targetEl.setOption(this.option);
        })
        .catch(err => {
          console.log(err);
        });
    },
    update(url, targetEl, delay) {
      setInterval(() => {
        axios
          .get(url)
          .then(response => {
            this.option.xAxis[0].data = response.data.nnList;
            this.option.series[0].data = response.data.countList;
          })
          .catch(err => {
            console.log(err);
          });
      }, delay);
    }
  },
  computed:{
    formData(){
       let data = [];
       this.option.xAxis[0].data.forEach((element,index)=>{
         data.push({nn:element,count:this.option.series[0].data[index]})
       })

      return data;
    }
  },
  mounted() {
    var Myechart = echarts.init(document.getElementById("echarts"));
    this.init("/api/mute", Myechart);
    this.update("/api/mute", Myechart, 30 * 1000);
  }
};
</script>  
<style>

</style>