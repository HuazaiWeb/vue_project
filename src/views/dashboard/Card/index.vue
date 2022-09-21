<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <!-- 第一个card -->
          <Detail title='总销售额' count='￥ 12806'>
            <template v-slot:charts>
              <span>周同比 56.89%<svg t="1659255324148" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9722" width="16" height="16"><path d="M325.456471 862.280661" p-id="9723" fill="#d81e06"></path><path d="M882.057788 862.280661" p-id="9724" fill="#d81e06"></path><path d="M236.028491 877.160382" p-id="9725" fill="#d81e06"></path><path d="M960.132455 877.160382" p-id="9726" fill="#d81e06"></path><path d="M63.683483 788.736998" p-id="9727" fill="#d81e06"></path><path d="M958.469023 788.736998" p-id="9728" fill="#d81e06"></path><path d="M64.77753 858.792098" p-id="9729" fill="#d81e06"></path><path d="M861.417121 738.727375c41.604731 0 65.233383-54.963795 34.928639-85.258218L547.071415 304.191372c-20.029996-20.031716-49.822121-20.031716-69.853837 0L127.955275 653.469157c-31.085714 31.073673-5.136514 85.258218 35.441258 85.258218L861.417121 738.727375 861.417121 738.727375z" p-id="9730" fill="#d81e06"></path><path d="M959.523505 858.792098" p-id="9731" fill="#d81e06"></path></svg></span>
              &nbsp;&nbsp;
              <span>日同比 19.68%<svg t="1659255188744" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8411" width="16" height="16"><path d="M128.005 302.974l386.971 420.571 381.019-422.746z" fill="#1afa29" p-id="8412"></path></svg></span>
            </template>
            <template v-slot:footer>
              <span>日销售额￥ 12504</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第二个card -->
          <Detail title='访问量' count='￥ 88490'>
            <template v-slot:charts>
              <lineCharts></lineCharts>
            </template>
            <template v-slot:footer>
              <span>日访问量 52188</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第三个card -->
          <Detail title='支付笔数' count='￥ 33564'>
            <template v-slot:charts>
              <barCharts></barCharts>
            </template>
            <template v-slot:footer>
              <span>转化率 57%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第四个card -->
          <Detail title='运营活动效果' count='￥ 44765'>
             <template v-slot:charts>
              <progressCharts></progressCharts>
            </template>
            <template v-slot:footer>
              <span>周同比 23%<svg t="1659255324148" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9722" width="16" height="16"><path d="M325.456471 862.280661" p-id="9723" fill="#d81e06"></path><path d="M882.057788 862.280661" p-id="9724" fill="#d81e06"></path><path d="M236.028491 877.160382" p-id="9725" fill="#d81e06"></path><path d="M960.132455 877.160382" p-id="9726" fill="#d81e06"></path><path d="M63.683483 788.736998" p-id="9727" fill="#d81e06"></path><path d="M958.469023 788.736998" p-id="9728" fill="#d81e06"></path><path d="M64.77753 858.792098" p-id="9729" fill="#d81e06"></path><path d="M861.417121 738.727375c41.604731 0 65.233383-54.963795 34.928639-85.258218L547.071415 304.191372c-20.029996-20.031716-49.822121-20.031716-69.853837 0L127.955275 653.469157c-31.085714 31.073673-5.136514 85.258218 35.441258 85.258218L861.417121 738.727375 861.417121 738.727375z" p-id="9730" fill="#d81e06"></path><path d="M959.523505 858.792098" p-id="9731" fill="#d81e06"></path></svg></span>
              <span>日同比 46%<svg t="1659255188744" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8411" width="16" height="16"><path d="M128.005 302.974l386.971 420.571 381.019-422.746z" fill="#1afa29" p-id="8412"></path></svg></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import lineCharts from './lineChart'
import barCharts from './barCharts'
import progressCharts from './progressCharts'
export default {
  name: "Card",
  components: {
    Detail,
    lineCharts,
    barCharts,
    progressCharts
  },
};
</script>

<style scoped>
</style>
