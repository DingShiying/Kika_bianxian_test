// 数据类型声明
interface Params {
  id: string
}// 请求参数类型

export function getOidDataById(params: Params) {
  const currentApp = computed(() => {
    return useUserStore().currentApp
  })
  return useGet<any, any>('/proxy/ad/oid/getById', { ...params, currentApp: currentApp.value }, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
