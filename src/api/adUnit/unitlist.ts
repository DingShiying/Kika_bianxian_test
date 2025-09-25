// 数据类型声明
interface UnitData {
  id: number
  unitName: string
  json: {
    value: string
    format: number
    source: string
  }
  creator: string
  createTime: string
  updater: string
  updateTime: string
}// 请求接口数据类型
interface UnitList {
  code: number
  msg: string
  data: {
    total: number
    list: UnitData[]
  }
}// 用户列表数据类型
interface Params {
  unitName: string
  value: string
  format: number | undefined | string
  source: string | undefined
  creator: string
  page: number
  pageSize: number
}// 请求参数类型

export function getUnitListData(params: Params) {
  const currentApp = computed(() => {
    return useUserStore().currentApp
  })
  return useGet<UnitList, any>('/proxy/ad/unit/list', { ...params, currentApp: currentApp.value }, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
