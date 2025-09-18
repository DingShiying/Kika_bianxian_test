// 数据类型声明
interface UserData {
  userEmail: string
}// 用户数据类型
interface APPData {
  id: string
  appName: string
  appIcon: string
  package: string
  system: string
  addTime: string
}
interface Response {
  code: number
  msg: string
  data: APPData[]
}// 请求参数类型

export function getUserAppList(params: UserData) {
  return usePost<Response, UserData>('/proxy/user/applist', params, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
