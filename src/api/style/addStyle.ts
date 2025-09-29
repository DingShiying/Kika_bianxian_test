// 数据类型声明
interface Params {
  id: string | number|undefined
  type: number
  preview: string
  json: {
    id: string | number|undefined
    base_id?: number
    [key: string]: string | number | undefined
  }
  currentApp: string|undefined
}
interface Response {
  code: number
  msg: string
}// 请求参数类型

export function addStyle(params: Params) {
  return usePost<Response, Params>('/proxy/ad/style/add', params, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
