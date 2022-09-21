<template>
  <div>
    <div class="header">
      <span class="header-search">搜索用户数</span>
      <svg
        t="1659253621751"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4884"
        width="16"
        height="16"
      >
        <path
          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
          p-id="4885"
        ></path>
        <path
          d="M512 336m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"
          p-id="4886"
        ></path>
        <path
          d="M536 448h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"
          p-id="4887"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span class="title">12385</span>
      <span class="content">17.1</span>
      <i class="el-icon-caret-top" style="color: red"></i>
      <i class="el-icon-caret-bottom" style="color: green"></i>
    </div>
    <div class="footer">
      <!-- 容器 -->
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
// 引入echarts
import * as echarts from "echarts";
export default {
  name: "lineCharts",
  mounted() {
    // 初始化echrats实例
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数据
    lineCharts.setOption({
      xAxis: {
        // 隐藏x轴
        show: false,
        type: "category",
      },
      yAxis: {
        // 隐藏y轴
        show: false,
      },
      // 系列
      series: [
        {
          type: "line",
          data: [10, 25, 40, 37, 26, 33, 55, 12, 59, 23],
          // 拐点的样式的设置
          itemStyle: {
            opacity: 0,
          },
          // 线条的样式
          lineStyle: {
            color: "skyblue",
          },
          // 弧度
          smooth: true,
          // 填充颜色设置  渐变色
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "skyblue", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
}
.header-search {
  margin-right: 20px;
  font-size: 14px;
  color: dimgrey;
}
.charts {
  width: 100%;
  height: 50px;
}
.title {
  margin-right: 30px;
}
.content {
  margin-right: 10px;
}
.main {
  margin-top: 15px;
}
</style>
