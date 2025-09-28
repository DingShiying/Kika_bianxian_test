// 数据类型声明


export function getAllOidList() {
  const currentApp = computed(() => {
    return useUserStore().currentApp
  })
  return useGet<any, any>('/proxy/ad/ads/list', {currentApp: currentApp.value }, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
