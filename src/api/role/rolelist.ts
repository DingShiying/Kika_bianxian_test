// 数据类型声明
interface RoleData {
  id: string
  roleName: string
  roleScore: number
  creator: string
  createTime: string
  roleAuth: Array<string>
}// 请求接口数据类型
interface RoleList {
  code: number
  msg: string
  data: {
    total: number
    list: RoleData[]
  }
}// 用户列表数据类型
interface Params {
  roleName: string
  page: number
  pageSize: number
}// 请求参数类型

export function getRoleListData(params: Params) {
  return usePost<RoleList, Params>('/proxy/role/list', params, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
