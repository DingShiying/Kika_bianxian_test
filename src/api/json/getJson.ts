interface Params {
  configName: string
}
interface ResultModel {
  code: number
  data: {
    configName: string
    user_describe: string
    condition: Array<{
      type: string | undefined
      symbol?: string | undefined
      value: any
    }>
    json: any
  }
  msg: string
}

export function getJsonData(params: Params) {
  return usePost<ResultModel, Params>('/proxy/getJson', params, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    loading: false,
  })
}
