// 数据类型声明
interface PlanData {
  id: string
  creator: string
  createTime: string
  updator: string
  updateTime: string
  json: {
    id: string
    desc: string
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
}// 请求接口数据类型
interface PlanList {
  code: number
  msg: string
  data: {
    total: number
    list: PlanData[]
  }
}// 用户列表数据类型
interface Params {
  id: string
  creator: string
  page: number
  pageSize: number
}// 请求参数类型

export function getPlanListData(params: Params) {
  const currentApp = computed(() => {
    return useUserStore().currentApp
  })
  return useGet<PlanList, any>('/proxy/ad/plan/getList', { ...params, currentApp: currentApp.value }, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
