// 数据类型声明
interface Ad {
  unit: '' | undefined
  priority?: number | undefined
  scenarios_id?: string | undefined
  banner_extra?: {
    banner_type: number | undefined
    max_height: number | undefined
  }
  range?: {
    first: number | undefined
    last: number | undefined
    retry: number | undefined
    type: number | undefined
    params: {
      [key: string]: string
    }
  }
  capping?: number | undefined
  default_revenue?: number | undefined
  timeout?: number | undefined
  timeout_buffer?: number | undefined
}
interface Params {
  id: string
  desc: string
  sources?: string[]
  formats?: number[]
  unitCount?: number
  groupCount?: number
  json: {
    id: string
    ads: Array<Ad>[]
  }
}
interface Response {
  code: number
  msg: string
}// 请求参数类型

export function addAds(params: Params) {
  const currentApp = computed(() => {
    return useUserStore().currentApp
  })
  return usePost<Response, any>('/proxy/ad/ads/add', { ...params, currentApp: currentApp.value }, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
