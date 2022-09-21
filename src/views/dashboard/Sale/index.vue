<template>
  <div>
    <el-card class="sale">
      <div class="clearfix">
        <!--  @tab-click="handleClick"           -->
        <!-- 头部的左侧内容 -->
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visit"></el-tab-pane>
        </el-tabs>
        <!-- 头部的右侧内容 -->
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <!-- 日历 -->
          <el-date-picker
            v-model="date"
            class="data"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            value-format='yyyy-MM-dd'
          >
          </el-date-picker>
        </div>
      </div>
      <el-row :gutter="20">
        <el-col :span="18">
          <!-- 柱状图 -->
          <!-- 容器 -->
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="6">
            <h3>门店{{title}}排名</h3>
            <ul>
                <li>
                    <span class="lfloat">0</span>
                    <span class="center">肯德基</span>
                    <span class="rfloat">123456</span>
                </li>
                 <li>
                    <span class="lfloat">1</span>
                    <span class="center">麦当劳</span>
                    <span class="rfloat">213524</span>
                </li>
                 <li>
                    <span class="lfloat">2</span>
                    <span class="center">海底捞</span>
                    <span class="rfloat">256912</span>
                </li>
                 <li>
                    <span>3</span>
                    <span class="center">蜜雪冰城</span>
                    <span class="rfloat">123456</span>
                </li>
                 <li>
                    <span>4</span>
                    <span class="center">汉堡王</span>
                    <span class="rfloat">123456</span>
                </li>
                 <li>
                    <span>5</span>
                    <span class="center">真功夫</span>
                    <span class="rfloat">123456</span>
                </li>
                 <li>
                    <span>6</span>
                    <span class="center">猪扒饭</span>
                    <span class="rfloat">123456</span>
                </li>
            </ul>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import dayjs from 'dayjs'
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
    //   因为myCharts只能在mounted 当中使用，所以将它挂载到组件的实例身上
      myCharts:null,
    //   收集日历数据 
    date:[],
    };
  },
  mounted() {
    // 创建echarts 实例
    this.myCharts = echarts.init(this.$refs.charts);
    // 配置数据
    this.myCharts.setOption({
        title:{
            text:"销售额趋势"
        },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220,150,230,350,280,100],
          color:'springgreen'
        },
      ],
    });
  },
  computed:{
    //计算右侧标题
    title(){
        return this.activeName == 'sale' ? '销售额' : '访问量'
    }
  },
  watch:{
    title() {
        // 重新修改图表的数据
        //图表配置数据可以再次修改，如果有新的数值，新的数值，没有新的数值，还是用以前的
        this.myCharts.setOption({
            title:{
                text:this.title + '趋势'
            }
        })
    }
  },
  methods:{
    // 本天
    setDay(){
        const day = dayjs().format('YYYY-MM-DD')
        this.date = [day,day];
    },
    // 本周
    setWeek(){
        const star = dayjs().day(1).format('YYYY-MM-DD')
        const end = dayjs().day(7).format('YYYY-MM-DD')
        this.date = [star,end];
    },
    // 本月
    setMonth(){
        const star = dayjs().startOf('month').format('YYYY-MM-DD')
        const end = dayjs().endOf('month').format('YYYY-MM-DD')
        this.date = [star,end];
    },
    // 本年
    setYear(){
        const star = dayjs().startOf('year').format('YYYY-MM-DD')
        const end = dayjs().endOf('year').format('YYYY-MM-DD')
        this.date = [star,end];
    }
  },
};
</script>

<style scoped>
.sale {
  margin: 10px 0;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.data {
  width: 230px;
  margin: 0 20px;
}
.right span {
  margin: 0 10px;
}
.charts{
    width: 100%;
    height: 300px;
}
ul {
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
}
ul li {
    height: 8%;
    margin: 10px 0;
}
.lfloat {
    float: left;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    background: black;
    color: white;
    text-align: center;
}
.rfloat {
    float: right;
}
.center {
    margin-left: 30px;
}
</style>
