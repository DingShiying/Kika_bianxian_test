// 数据类型声明
interface  OIDData{
  id: string
  json:{
    oid: string
    format: number
  }
  creator: string
  createTime: string
  updater: string
  updateTime: string
}// 请求接口数据类型
interface OIDList {
  code: number
  msg: string
  data: {
    total: number
    list: OIDData[]
  }
}// 请求接口数据类型
interface Params {
  oid: string
  creator: string
  page: number
  pageSize: number
}// 请求参数类型

export function getOIDListData(params: Params) {
  const currentApp = computed(() => {
    return useUserStore().currentApp
  })
  return useGet<OIDList, any>('/proxy/ad/oid/getList', { ...params, currentApp: currentApp.value }, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
