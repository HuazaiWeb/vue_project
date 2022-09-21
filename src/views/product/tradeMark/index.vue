<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 10px"
      @click="showDialog"
      >添加</el-button
    >
    <!--
      表格组件
      data:表格组件将来需要展示的数据------数组类型
      border:是给表格添加边框
      column属性
      label:显示标题
      width:对应列的宽度
      align:标题的对齐方式
      prop:对应列内容的字段名
      注意1: elmentuI当中的table组件，展示的数据是以一列一列进行展示数据
      -->
    <el-table style="width: 100%" border :data="list">
      <!-- element-Ui的表格是一列为主的，el-table-column 表示一列 -->
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <!-- 利用作用域插槽 给每一列添加图片 row是子组件返回回来的参数 固定的 -->
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <!-- row 是当前这一行的品牌信息 -->
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--分页器
    当前第几页、数据总条数、每一页展示条数、连续页码数
    current-page:代表的是当前第几页
    total:代表分页器一共需要展示数据条数
    page-size:代表的是每一页需要展示多少条数据
    page-sizes:代表可以设置每一页展示多少条数据
    layout:可以实现分页器布局
    pager-count:按钮的教量如果9连续页码是7
    -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      :page-count="7"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="getPageList"
      @size-change="handlesizechange"
    >
    </el-pagination>
    <!-- 对话框 -->
    <!-- 对话框         
         :visible.sync:控制对话框显示与隐藏用的 
    -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <!-- from 表单 -->
      <!-- :model 是收集表单数据的一个对象
        Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，
        并将 Form-Item 的 prop 属性设置为需校验的字段名即可
      -->
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 上传图片内部是element-ui发的请求。。所以没有配置dev-api所以要补全
          这里收集效据:不能使用v-model，因为不是表单元素
          action:设置图片上传的地址
          : on-success:可以检测到图片上传成功，当图片上传成功，会执行一次
          :before-upload:可以在上传图片之前,会执行一次
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="this.tmForm.logoUrl"
              :src="this.tmForm.logoUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddorUpdataTrademark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
       // 自定义校验规则
       var validateTmname = (rule, value, callback) => {
        if(value.length < 2 || value.length > 8){
          callback(new Error('品牌名称要求2~8位'))
        }else{
          callback()
        }
      };
    return {
      // 代表分页器第几页
      page: 1,
      // 当前页数展示数据条数
      limit: 3,
      // 总共数据条数
      total: 0,
      // 列表展示的数据
      list: [],
      // 对话框显示与隐藏控制的属性
      dialogFormVisible: false,
      tmForm:{
        logoUrl:'',
        tmName:''
      },
      // 表单验证规则
      rules:{
        //品牌名称的验证规则
        //require:必须要校验字段(前面五角星有关系)message提示信息trigger:用户行为设置(事件的设置:blur.change）
        tmName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            // { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'change' }
            // 自定义校验规则
             { validator: validateTmname, trigger: 'blur' }
          ],
          logoUrl: [
            { required: true, message: '请选择图片上传'}
          ],
      }
    };
  },
  // 组件挂载完毕发请求
  mounted() {
    // 获取数据列表方法
    this.getPageList();
  },
  methods: {
    // 获取品牌列表的数据
    // pager 是默认参数，一上来挂载没有传参会使用1作为参数
    async getPageList(pager = 1) {
      this.page = pager;
      // 解构出参数
      const { page, limit } = this;
      // 获取品牌列表的接口
      //当你向服务器发请求的时候，这个函数需要带参数，因此老师在data当中初始化两个字段，代表给服务器传递参数
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        // 分别是展示数据总条数与列表展示的数据
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    handlesizechange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    // 点击添加品牌按钮
    showDialog() {
      // 显示对话框
      this.dialogFormVisible = true;
      // 每次点击添加按钮都清除一遍数据
      this.tmForm = {logoUrl:'',tmName:''}
    },
    // 修改某一个品牌
    updateTradeMark(row){
      //row:当前用户选中这个品牌信息
      // 显示对话框
      this.dialogFormVisible = true;
      //将已有的品牌信息赋值给tmForm进行展示
      //将服务器返回品牌的信息，直接赋值给了tmForm进行展示。
      //也就是tmForm存储即为服务器返回品牌信息
      // 难点：------------------- 深浅拷贝 ------------
      // 这里list 和 tmForm 指向的都是 rou  服务器返回品牌的信息
      // var obj1 = { foo: 'bar', x: 42 };
      // var clonedObj = { ...obj1 };
      // 克隆后的对象: { foo: "bar", x: 42 }
      this.tmForm = {...row};
    },
    // 上传图片成功的回调
     handleAvatarSuccess(res, file) {
      //res: 上传成功之后返回前端数据
      //file:上传成功之后服务器返回前端数据
      //收集品牌图片数据，因为将来需要带给服务器
        this.tmForm.logoUrl = res.data
      },
      // 图片上传之前
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //添加按钮（添加品牌|修改品牌）
       AddorUpdataTrademark(){
        // 当全部验证字段通过，再去书写业务逻辑
        this.$refs.ruleForm.validate(async (success) => {
          // 如果全部字段符合条件
          if (success) {
            this.dialogFormVisible = false
        //发请求（添加品牌|修改品牌>
         let result = await this.$API.trademark.reqAddorUpdataTrademark(this.tmForm)
         if(result.code == 200){
          //弹出信息:添加品牌成功、修改品牌成功
          this.$message({
            type:'success',
            message:this.tmForm.id?'修改品牌成功':'添加品牌成功'
          })
          //添加或者修改品牌成功以后，需要再次获取品牌列表进行展示
          //如果添加品牌:停留在第一页，修改品牌应该留在当前页面
          this.getPageList(this.tmForm.id?this.page:1);
         }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 删除品牌操作
      deleteTradeMark(row){
         this.$confirm(`是否确定删除${row.tmName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          //当用户点击确定按钮的时候会触发
          // 向服务器发请求
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id)
          // 如果删除成功
          if(result.code == 200){
            this.$message({
            type: 'success',
            message: '删除成功!'
            });
            // 再次获取品牌列表数据
            this.getPageList(this.list.length>1?this.page:this.page-1);
          }
        }).catch(() => {
          //当用户点击取消按钮的时候会触发
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
