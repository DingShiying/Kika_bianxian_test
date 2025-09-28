// 数据类型声明
interface Response {
  code: number
  msg: string
}// 请求参数类型

export function updateAds(params: any) {
  // 当前用户
  const currentApp = computed(() => {
    return useUserStore().currentApp
  })
  return usePost<Response, any>('/proxy/ad/ads/update', { ...params, currentApp: currentApp.value }, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
