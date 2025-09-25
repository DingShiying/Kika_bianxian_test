// 数据类型声明
interface PlanData {
  label: string
  load_strategy: number
  creator: string
  createTime: string
  updater: string
  updateTime: string
  status: boolean
}// 用户数据类型
interface PlanList {
  code: number
  msg: string
  data: {
    total: number
    list: PlanData[]
  }
}// 用户列表数据类型
interface Params {
  load_strategy?: string
  page?: number
  pageSize?: number
  operator?: string | undefined
}// 请求参数类型

export function getPlanListData(params: Params) {
  return usePost<PlanList, Params>('/proxy/loadStrategy/list', params, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
