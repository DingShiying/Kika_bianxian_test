import { logoutApi } from '~@/api/common/login'
// import { getRouteMenusApi } from '~@/api/common/menu'
import type { UserInfo } from '~@/api/common/user'
import { getUserInfoApi } from '~@/api/common/user'
import type { MenuData } from '~@/layouts/basic-layout/typing'
// import { rootRoute } from '~@/router/constant'
import { generateFlatRoutes, generateRoutes } from '~@/router/generate-route'
// generateTreeRoutes
import { configRouter, manageRouter } from '~@/router/dynamic-routes'

export const useUserStore = defineStore('user', () => {
  const routerData = shallowRef()
  const menuData = shallowRef<MenuData>([])
  const userInfo = shallowRef<UserInfo>()
  const token = useAuthorization()
  const avatar = computed(() => userInfo.value?.avatar)
  const nickname = computed(() => userInfo.value?.nickname ?? userInfo.value?.username)
  const roles = computed(() => userInfo.value?.roles)
  const isSuperManage = ref(false)
  const operator = computed(() => userInfo.value?.userEmail)
  const apps = computed(() => userInfo.value?.apps)

  // interface MenuDataItem {
  //   id: string | number
  //   parentId: string | number | null
  //   title: string
  //   path: string
  //   component: string
  //   name: string
  //   icon?: string
  //   keepAlive?: boolean
  //   locale?: string
  //   children?: MenuDataItem[]
  // }
  // type MenuData = MenuDataItem[]

  // function treeToFlat(menus: MenuData): MenuData {
  //   const flatList: MenuData = []

  //   const traverse = (node: MenuDataItem) => {
  //     // 创建一个新对象，不包含 children 字段
  //     const flatNode = {
  //       id: node.id,
  //       parentId: node.parentId,
  //       title: node.title,
  //       path: node.path,
  //       component: node.component,
  //       name: node.name,
  //       icon: node.icon,
  //       keepAlive: node.keepAlive,
  //       locale: node.locale,
  //     }

  //     // 将新对象添加到扁平列表中
  //     flatList.push(flatNode)

  //     // 递归处理子节点
  //     if (node.children && node.children.length > 0) {
  //       node.children.forEach(child => traverse(child))
  //     }
  //   }

  //   // 从根节点开始递归
  //   menus.forEach(node => traverse(node))

  //   return flatList
  // }

  // const getMenuRoutes = async () => {
  //   const { data } = await getRouteMenusApi()
  //   return generateTreeRoutes(data ?? [])
  //   // const { data } = await getRouteMenusApi()
  //   // return generateTreeRoutes(data.menuList ?? [])
  // }

  const generateDynamicRoutes = async () => {
    // const dynamicLoadWay = DYNAMIC_LOAD_WAY === DynamicLoadEnum.BACKEND ? getMenuRoutes : generateRoutes
    const dynamicLoadWay = generateRoutes

    const { menuData: treeMenuData, routeData } = await dynamicLoadWay(isSuperManage.value ? manageRouter : configRouter)
    // const { menuData: treeMenuData, routeData } = await getMenuRoutes()
    menuData.value = treeMenuData
    routerData.value = {
      // ...rootRoute,
      path: '/',
      name: 'rootPath',
      redirect: routeData[0].path,
      component: () => import('@/layouts/index.vue'),
      children: generateFlatRoutes(routeData, routeData[0].path),
    }
    return routerData.value
  }

  // 获取用户信息
  const getUserInfo = async () => {
    // 获取用户信息
    const { data } = await getUserInfoApi()
    userInfo.value = data
  }

  const logout = async () => {
    // 退出登录
    // 1. 清空用户信息
    try {
      await logoutApi()
    }
    finally {
      token.value = null
      userInfo.value = undefined
      routerData.value = undefined
      menuData.value = []
    }
  }

  const setSuperManage = (state: boolean) => {
    userInfo.value = undefined
    routerData.value = undefined
    menuData.value = []
    isSuperManage.value = state
  }

  const currentApp = ref<undefined | string>(undefined)

  const sources = ref([
    {
      label: 'AdMob广告源',
      value: 'AdMob',
    },
    {
      label: 'Max广告源',
      value: 'MAX',
    },
    {
      label: 'TopOn广告',
      value: 'TopOn',
    },
    {
      label: 'TradPlus广告',
      value: 'TradPlus',
    },
    {
      label: 'Olaex广告',
      value: 'Olaex',
    },
  ])

  const formats = ref([
    {
      label: '插屏广告-INTERSTITIAL',
      value: 0,
    },
    {
      label: '激励视频广告-REWARDED_VIDEO',
      value: 1,
    },
    {
      label: '开屏广告-APP_OPEN',
      value: 2,
    },
    {
      label: '激励插屏广告-REWARDED_INTERSTITIAL',
      value: 3,
    },
    {
      label: '原生广告-NATIVE',
      value: 4,
    },
    {
      label: '原生插屏广告-NATIVE_INTER',
      value: 5,
    },
    {
      label: '横幅广告-BANNER',
      value: 6,
    },
    {
      label: '中等矩形横幅广告-MEDIUM',
      value: 7,
    },
    {
      label: '内联横幅广告-INLINE_BANNER',
      value: 8,
    },
    {
      label: 'APP_OPEN+INTERSTITIAL',
      value: 9,
    },
    {
      label: 'INTERSTITIAL+NATIVE_INTER',
      value: 10,
    },
    {
      label: 'NATIVE+BANNER',
      value: 11,
    },
  ])

  return {
    userInfo,
    roles,
    getUserInfo,
    logout,
    routerData,
    menuData,
    generateDynamicRoutes,
    avatar,
    nickname,
    setSuperManage,
    isSuperManage,
    operator,
    apps,
    currentApp,
    sources,
    formats,
  }
})
