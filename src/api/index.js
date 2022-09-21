// 将四个模块请求接口函数统一引入
import * as trademark from './product/tradeMark';
import * as attr from './product/attr';
import * as spu from './product/spu';
import * as sku from "./product/sku";

// 引入权限相关的接口文件
import permission from './acl/permission'
import role from './acl/role'
import * as user from './acl/user'

// 对外暴露
export default {
  trademark,
  attr,
  spu,
  sku,
  permission,
  role,
  user,
};