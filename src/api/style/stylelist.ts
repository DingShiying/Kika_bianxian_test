// 数据类型声明
interface StyleData {
  id: string | number
  type: string
  differences?: {
    [key: string]: {
      [key: string]: string | number
    }
  }
  preview?: string
  creator: string
  createTime: string
  updator: string
  updateTime: string
  json?: {
    [key: string]: string | number
  }
}// 请求接口数据类型
interface StyleList {
  code: number
  msg: string
  data: {
    total: number
    list: StyleData[]
  }
}// 用户列表数据类型
interface Params {
  id?: string | number
  type?: string | undefined
  creator?: string
  page?: number
  pageSize?: number
  operator: string | undefined
  currentApp: string | undefined
}// 请求参数类型

export function getStyleListData(params: Params) {
  return usePost<StyleList, Params>('/proxy/ad/style/list', params, {
    // 设置为false的时候不会携带token
    token: true,
    // 开发模式下使用自定义的接口
    customDev: true,
    // 是否开启全局请求loading
    // loading: true
  })
}
