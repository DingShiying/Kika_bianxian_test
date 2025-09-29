// 数据类型声明
interface StyleData {
  id: string | number
  type: number
  preview: string
  creator: string
  createTime: string
  updater: string
  updateTime: string
  json: {
    id: string | number
    base_id?: number 
    [key: string]: string | number | undefined
  }
}// 请求接口数据类型
interface StyleList {
  code: number
  msg: string
  data: StyleData
}// 用户列表数据类型
interface Params {
  id: string|number|undefined
}// 请求参数类型

export function getStyleDataById(params: Params) {
  const currentApp = computed(() => {
    return useUserStore().currentApp
  })
  return useGet<StyleList, any>('/proxy/ad/style/getById', { ...params, currentApp: currentApp.value }, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
