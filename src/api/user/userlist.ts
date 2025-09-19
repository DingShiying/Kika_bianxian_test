// 数据类型声明
interface UserData {
  id: string
  userName: string
  userEmail: string
  business: Array<string>
  role: string
  apps: Array<string>
}// 用户数据类型
interface UserList {
  code: number
  msg: string
  data: {
    total: number
    list: UserData[]
  }
}// 用户列表数据类型
interface Params {
  userName: string
  page: number
  pageSize: number
  operator: string | undefined
}// 请求参数类型

export function getUserListData(params: Params) {
  return usePost<UserList, Params>('/proxy/user/list', params, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
