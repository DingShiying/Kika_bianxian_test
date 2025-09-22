// 数据类型声明
interface Response {
  code: number
  msg: string
}// 用户列表数据类型
interface Params {
  scatter_loading: string
  operator: string | undefined
}// 请求参数类型

export function deletePlanData(params: Params) {
  return usePost<Response, Params>('/proxy/scatterLoading/delete', params, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
