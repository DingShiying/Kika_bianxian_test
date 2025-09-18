import { useUserStore } from '~@/stores/user'

// 数据类型声明
interface PlatformData {
  id: string
  platformName: string
  creator: string
  createTime: string
  status: boolean
}// 请求接口数据类型
interface PlatformList {
  code: number
  msg: string
  data: {
    total: number
    list: PlatformData[]
  }
}// 用户列表数据类型
interface Params {
  platformName: string
  page: number
  pageSize: number
  userEmail?: string
}// 查询参数类型

const { userEmail } = useUserStore()

export function getPlatformListData(params: Params) {
  return useGet<PlatformList, Params>('/proxy/platform/list', { ...params, userEmail }, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
