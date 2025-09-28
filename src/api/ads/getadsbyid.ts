// 数据类型声明
interface AdsData {
  id: string
  desc: string
  sources: string[]
  formats: number[]
  unitCount: number
  groupCount: number
  json: {
    id: string
    ads: Array<{
      source: string
      value: string
      format?: number
      priority?: number
      scenarios_id?: string
      banner_extra?: {
        banner_type?: number
        max_height?: number
      }
      range?: {
        first: number
        last: number
        retry?: number
        type?: number
        params?: {
          [key: string]: string
        }
      }
      capping?: number
      default_revenue?: number
      timeout?: number
      timeout_buffer?: number
    }>[]
  }
  creator: string
  createTime: string
  updater: string
  updateTime: string
}// 请求接口数据类型
interface AdsList {
  code: number
  msg: string
  data: AdsData
}// 用户列表数据类型
interface Params {
  id: string
}// 请求参数类型

export function getAdsDataById(params: Params) {
  const currentApp = computed(() => {
    return useUserStore().currentApp
  })
  return useGet<AdsList, any>('/proxy/ad/ads/getById', { ...params, currentApp: currentApp.value }, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
