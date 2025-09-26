// 数据类型声明
interface Params {
  id: number
  unitName: string
  json: {
    value: string
    format: number | undefined
    source: string | undefined
  }
}// 用户数据类型
interface Response {
  code: number
  msg: string
}// 请求参数类型

export function updateUnit(params: Params) {
  // 当前用户
  const currentApp = computed(() => {
    return useUserStore().currentApp
  })
  return usePost<Response, any>('/proxy/ad/unit/update', { ...params, currentApp }, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
