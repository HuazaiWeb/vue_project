<template>
  <div>
    <el-card>
      <!-- 三级联动已经注册为全局组件了 -->
      <CategorySelect @categoryInfo="categoryInfo" :show="scene!=0"></CategorySelect>
    </el-card>
    <el-card style="margin: 20px 0px">
      <!-- 底部这里将来是有三部分进行切换 -->
      <div v-show="scene==0">
        <!-- 展示SPU列表的结构 -->
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
        <el-table :data="records" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" aligin="center">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row}">
              <!-- 这里按钮将来用hintButton替换 -->
              <el-button type="success" icon="el-icon-plus" title="添加sku" @click="addSku(row)"></el-button>
              <el-button type="warning" icon="el-icon-edit" title="修改spu" @click="updateSpu(row)"></el-button>
              <el-button type="info" icon="el-icon-info" title="查看当前spu全部sku列表" @click="handler(row)"></el-button>
              <!-- 由于版本的问题 confirm 要写成 onConfirm -->
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                <el-button type="danger" icon="el-icon-delete" title="删除spu" slot="reference"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
          <!-- 分页器 -->
        <el-pagination
        style="text-align:center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          :pager-count="7"
          @size-change="handleSizeChange"
          @current-change="getSpuList"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total">
        </el-pagination>
      </div>
      <SpuForm v-show="scene==1" @changescene="changescene" ref="spu"></SpuForm>
      <SkuForm v-show="scene==2" ref="sku" @changeScenes="changeScenes"></SkuForm>
    </el-card>
    <!-- 弹出对话框 -->
    <el-dialog :title="`${spu.spuName}的列表`" :visible.sync="dialogTableVisible" :before-close="close">
        <el-table :data="spuList" style="width: 100%" border v-loading="loading">
          <el-table-column prop="skuName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="price" label="价格" width="width">
          </el-table-column>
          <el-table-column prop="weight" label="重量" width="width">
          </el-table-column>
          <el-table-column label="默认图片" width="width">
            <template slot-scope="{row}">
              <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
            </template>
          </el-table-column>
        </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SkuForm from './SkuForm'
import SpuForm from './SpuForm'
export default {
  name: "Spu",
  components:{
    SkuForm,
    SpuForm
  },
  data() {
    return {
      // 分类的id
      category1Id: "",
      category2Id: "",
      category3Id: "",
       page:1, //分页器当前第几页
      limit:3, //每一页需要展示多少条数据
      // 控制三级联动的可操作性
      records:[], //spu列表数据
      total:0, //分页器一共需要展示数据的条数
      scene:0, //0代表展示Spu列表数据  1 添加Spu|修改Spu  2  添加sku
      dialogTableVisible:false,
      spu:{},
      spuList:[],
      loading:true
    };
  },
  methods: {
    // 三级联动的自定义事件,可以把子组件的相应的id传递给父组件
    categoryInfo({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        // 清除二三级分类的id
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        // 清除三级分类id
        this.category3Id = "";
      } else {
        // 代表三级分类的id有了
        this.category3Id = categoryId;
        // 获取Spu列表数据进行展示
        this.getSpuList();
      }
    },
    // 获取Spu列表数据的方法
      async getSpuList(pages=1){
        this.page = pages
        const {page,limit,category3Id} = this
        //携带三个参数:page第几页limit每一页需要展示多少条数据三级分类id
        let result = await this.$API.spu.reqSpuList(page,limit,category3Id)
        if(result.code == 200){
          this.records = result.data.records;
          this.total = result.data.total;
        }
      },
      //当分页器的某一个展示数据条数发生变化的回调
      handleSizeChange(limit){
        this.limit = limit;
        this.getSpuList();
      },
      // 添加Spu
      addSpu(){
        this.scene = 1;
        // 通知子组件SoyForm发请求 -- 两个
        this.$refs.spu.addSpuData(this.category3Id);
      },
      // 修改Spu
      updateSpu(row){
        this.scene = 1
        //获取子组件SpuForm子组件的
        //在父组件当中可以通过$ref获取子组件等等
        this.$refs.spu.initSpuData(row)
      },
      // 自定义事件回调(SpuForm) 子传父
      changescene({scene,flag}){
        //flag这个形参为了区分保存按钮是添加还是修改
        // 切换结构
        this.scene = scene;
        //子组件通知父组件切换场景，需要再次获取SPu列表的数据进行展示
        if(flag=='修改'){
          this.getSpuList(this.page);
        }else{
          this.getSpuList();
        }
      },
      // 删除SPU的回调
      async deleteSpu(row){
       let result = await this.$API.spu.reqDeleteSpu(row.id);
       if(result.code == 200){
        this.$message({type:'success',message:'删除成功'})
        //代表SPu个数大于1删除的时候停留在当前页，如果SPu个数小子1回到上一页
        this.getSpuList(this.records.length > 1? this.page: this.page - 1);
       }
      },
      // 添加Sku
      addSku(row){
        console.log(row);
        // 切换结构
        this.scene = 2;
        this.$refs.sku.getData(this.category1Id,this.category2Id,row);
      },
      // sku取消按钮的自定事件的回调
      changeScenes(scene){
        this.scene = scene
      },
      // 查看sku列表
      async handler(spu){
        this.dialogTableVisible = true;
        this.spu = spu;
        let result = await this.$API.spu.reqSkuList(spu.id);
        if(result.code ==200){
          this.loading = false
          this.spuList = result.data
        }
      },
      // 关闭前的回调，会暂停 Dialog 的关闭
      close(done){
        // loading属性再次变为真
        this.loading = true;
        // 清除sku列表数据
        this.spuList = [];
        // 关闭对话框
        done();
      }
  },
};
</script>

<style></style>
