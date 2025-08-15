import type { RouteRecordRaw } from 'vue-router'

// export const ROOT_ROUTE_REDIRECT_PATH = '/dashboard'
export const ROOT_ROUTE_REDIRECT_PATH = '/analysis'

const Layout = () => import('~/layouts/index.vue')

export const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'rootPath',
  redirect: ROOT_ROUTE_REDIRECT_PATH,
  component: Layout,
  children: [],
}
