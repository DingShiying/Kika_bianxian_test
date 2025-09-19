export interface UserInfo {
  id: number | string
  username: string
  nickname: string
  avatar: string
  roles?: (string | number)[]
  userEmail: string
  apps?: Array<string>
}

export function getUserInfoApi() {
  return useGet<UserInfo>('/proxy/user/info')
}
