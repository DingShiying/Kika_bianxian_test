// 数据类型声明
interface Params {
  id: string
  desc: string
  json: {
    id: string
    count: number | undefined
    refill: number | undefined
    load_strategy: number | undefined
    timeout: number | undefined
    capping: number | undefined
    load_context: number | undefined
    scatter_loading: number | undefined
    offset: number | undefined
    prob: number | undefined
    load_prob: number | undefined
    limit: number | undefined
  }
  currentApp: string | undefined
}// 用户数据类型
interface Response {
  code: number
  msg: string
}// 请求参数类型

export function addPlan(params: Params) {
  return usePost<Response, any>('/proxy/ad/plan/add', params, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
