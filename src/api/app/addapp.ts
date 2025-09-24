// 数据类型声明
interface Params {
  isAdd: boolean
  appName: string
  package: string
  firebaseID: string
  business: string[]
  users: string[]
  system: string
  platform: string[]
  icon: string
  copyAppID?: string | undefined
  copyConfig?: string[]
  operator: string | undefined
}// 用户数据类型
interface Response {
  code: number
  msg: string
}// 请求参数类型

export function addApp(params: Params) {
  return usePost<Response, Params>('/proxy/app/add', params, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
