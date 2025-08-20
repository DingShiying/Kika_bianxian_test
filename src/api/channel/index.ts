interface Params {
  channel: string
}
interface ResultModel {
  code: number
  data: any
  msg: string
}

export function getChannelData(params: Params) {
  return usePost<ResultModel, Params>('/proxy/getdata5', params, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    loading: true,
  })
}
