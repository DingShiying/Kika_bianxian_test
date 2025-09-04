interface FormState {
  dateRange: any
  appName: string | undefined
  business: string | undefined
  department: string | undefined
  channel: string | undefined
} // 搜索表单类型
interface Response {
  totalConsume: string
  consumeTrend: string
  totalInstall: string
  installTrend: string
  CPI: string
  CPITrend: string
  appList: Array<{
    label: string
    value: string
  }>
  businessList: Array<{
    label: string
    value: string
  }>
  departmentList: Array<{
    label: string
    value: string
  }>
  channelList: Array<{
    label: string
    value: string
  }>
  offlineChartData: Array<{
    data: string
    label: string
    value: string
  }>
  dataDeatils: Array<{
    id: string
    date: string
    appName: string
    appGroup: string
    channel: string
    consume: string
    install: string
    CPI: string
  }>
}// 接口返回类型
interface ResultModel {
  code: number
  data: Response
  msg: string
}

export function getMainData(params: FormState) {
  return usePost<ResultModel, FormState>('/proxy/getdata1', params, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    loading: true,
  })
}
