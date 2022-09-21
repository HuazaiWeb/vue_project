<template>
  <div>
    <el-card>
      <div class="header-radio" slot="header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="radio" size="small">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <!-- 饼状图 容器 -->
        <div class="charts" ref="charts"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入echarts
import * as echarts from "echarts";
export default {
  name: "Category",
  data() {
    return {
      radio: "全部渠道",
    };
  },
  mounted() {
    let myCharts = echarts.init(this.$refs.charts);
    myCharts.setOption({
      title:{
        text:'视频联盟',
        subtext:'vido1048',
        left:'center',
        top:'center'
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "视频联盟" },
            { value: 735, name: "谷歌浏览器" },
            { value: 580, name: "火狐浏览器" },
            { value: 484, name: "QQ浏览器" },
            { value: 300, name: "欧朋浏览器" },
          ],
        },
      ],
    });
    // 绑定事件
    myCharts.on('mouseover',(params)=>{
      //获取鼠标移上去那条数据
      const {name,value} = params.data;
      // 重新设置标题
      myCharts.setOption({
        title:{
          text:name,
          subtext:value
        }
      })
    });
  },
};
</script>

<style scoped>
.header-radio {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.charts{
  width: 100%;
  height: 300px;
}
</style>
