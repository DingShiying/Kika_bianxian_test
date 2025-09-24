// 数据类型声明
interface BusinessData {
  id: string
  business: string
  creator: string
  createTime: string
  updater: string
  updateTime: string
}// 请求接口数据类型
interface BusinessList {
  code: number
  msg: string
  data: {
    total: number
    list: BusinessData[]
  }
}// 用户列表数据类型
interface Params {
  business?: string
  page?: number
  pageSize?: number
  operator: string | undefined
}// 请求参数类型

export function getAppListData(params: Params) {
  return usePost<BusinessList, Params>('/proxy/app/list', params, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
