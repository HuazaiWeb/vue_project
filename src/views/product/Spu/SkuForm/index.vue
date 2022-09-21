<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称"> {{spu.spuName}} </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="价格(重量(千克))" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id">
            <!-- 把平台属性和平台属性值的Id 收集到各自的平台里面，在平台属性添加一个属性attrIdAnValueId -->
            <el-select placeholder="请选择" v-model="attr.attrIdAnValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="attrValue in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.saleIdAnValueId">
              <el-option :label="saleValue.saleAttrValueName" :value="`${saleAttr.id}:${saleValue.id}`" v-for="saleValue in  saleAttr.spuSaleAttrValueList" :key="saleValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table style="width: 100%" :data="spuImageList" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" prop="prop" width="80" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" alt="" style="width:100px;heigth:100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row}">  
              <el-button v-if="row.isDefault==0" type="primary" @click="changeDefault(row)">设置默认</el-button>
              <el-button>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      // 获取存储图片的信息
      spuImageList: [],
      // 存储销售属性
      spuSaleAttrList: [],
      // 存储平台属性的数据
      attrInfoList: [],
      // 收集sku数据的字段
      skuInfo: {
        // 第一类收集的数据，父组件给的数据
        category3Id: 0,
        tmId: 0,
        spuId: 0,
        // 第二类：需要通过数据双向绑定v-model 收集 
        skuName: "string",
        price: 0,
        weight: "1",
        skuDesc: "string",
        // 第三类：需要自己书写代码
        // 平台属性 
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          //}
        ],
        // 默认图片
        skuDefaultImg: "",
        // 收集图片的字段
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        // 销售属性
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
      spu:{},
      // 收集图片的数据字段  因为数据不完整的，所以先收集到这里
      imageList:[]
    };
  },
  methods: {
    // 获取SkuForm数据
    async getData(category1Id, category2Id, spu) {
      // 收集父组件给予的数据
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.spu = spu
      // 获取图片的数据
      let result = await this.$API.spu.reqSpuImageList1(spu.id);
      if (result.code == 200) {
        let list = result.data;
        list.forEach(item => {
          item.isDefault = 0;
        });
        this.spuImageList = list
      }
      // 获取销售属性的数据
      let result1 = await this.$API.spu.reqSpuSaleAttrList(spu.id);
      if (result1.code == 200) {
        this.spuSaleAttrList = result1.data;
      }
      // 获取平台属性的数据
      let result2 = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (result2.code == 200) {
        this.attrInfoList = result2.data;
      }
    },
    // table复选框按钮的事件
    handleSelectionChange(parmas){
      //获取到用户选中图片的信息数据，但是需要注意，当前收集的数据当中，缺少isDefault字段 
      this.imageList = parmas;
    },
    // 点击设置默认事件 排他操作
    changeDefault(row){
      //图片列表的数据的isDefault字段变为0
      this.spuImageList.forEach(item => {
        item.isDefault = 0;
      })
      //点击的那个图片的数据变为1
      row.isDefault = 1;
      // 收集默认图片的数据
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    // 取消按钮的回调
    cancel(){
      // 自定义事件，让父组件切换场景 0
      this.$emit('changeScenes',0);
      // 清除数据
      Object.assign(this._data,this.$options.data())
    },
    // 保存按钮事件
    async save(){
      // 整理参数
      // 整理平台属性
      // 解构数据
      const {attrInfoList,skuInfo,spuSaleAttrList,imageList} = this;
      // 整理平台属性方式一：
      // 新建数组
     /*  let arr = [];
      // 把收集到的数据整理一下
      attrInfoList.forEach(item => {
        // 判断当前平台属性用户有没有选择
        if(item.attrIdAnValueId){
          // 返回源字符串以分隔符出现位置分隔而成的一个 数组
          const [attrId,valueId] = item.attrIdAnValueId.split(':')
          // 携带给服务器参数应该是对象
          let obj = {attrId,valueId};
          arr.push(obj)
        }   
      })
      //将整理好的参数赋值给skuInfo.skuAttrvalueList
      skuInfo.skuAttrValueList = arr; */

      // 整理平台属性方式二：
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev,item)=>{
         if(item.attrIdAnValueId){
          // 返回源字符串以分隔符出现位置分隔而成的一个 数组
          const [attrId,valueId] = item.attrIdAnValueId.split(':');
          prev.push({attrId,valueId});
        }  
        return prev;
      },[]);
      // 整理销售属性：
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev,item)=>{
         if(item.saleIdAnValueId){
          // 返回源字符串以分隔符出现位置分隔而成的一个 数组
          const [saleAttrId,saleAttrValueId] = item.saleIdAnValueId.split(':');
          prev.push({saleAttrId,saleAttrValueId});
        }  
        return prev;
      },[]);
      // 整理图片的数据
      skuInfo.skuImageList = imageList.map(item=>{
        return {
          imgName:item.imgName,
          imgUrl:item.imgUrl,
          isDefault:item.isDefault,
          spuImgId:item.id,
        }
      })
      // 发请求
      let result = await this.$API.spu.reqAddSku(skuInfo)
      if(result.code == 200){
        this.$message({type:'success',message:'添加SKU成功!'})
        this.$emit('changeScenes',0)
      }
    }
  },
};
</script>

<style></style>
