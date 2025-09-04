// import axios from 'axios'
import type { MenuData } from '~@/layouts/basic-layout/typing'

export function getRouteMenusApi() {
  return useGet<MenuData>('/menu')
}

// export async function getRouteMenusApi() {
//   return await axios.get('/proxy/getMenu')
// }
