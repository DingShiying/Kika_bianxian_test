import type { RouteRecordRaw } from 'vue-router'

export const manageRouter: RouteRecordRaw[] = [
  {
    path: '/userSet',
    name: 'userSet',
    component: () => import('~/pages/userSet/index.vue'),
    meta: {
      title: '用户管理',
      icon: 'TeamOutlined',
    },
  },
  {
    path: '/roleSet',
    name: 'roleSet',
    component: () => import('~/pages/roleSet/index.vue'),
    meta: {
      title: '角色管理',
      icon: 'RobotOutlined',
    },
  },
  {
    path: '/platform',
    name: 'platform',
    component: () => import('~/pages/platform/index.vue'),
    meta: {
      title: '上架平台维护',
      icon: 'GlobalOutlined',
    },
  },
  {
    path: '/appSet',
    name: 'appSet',
    component: () => import('~/pages/appSet/index.vue'),
    meta: {
      title: 'APP维护',
      icon: 'TabletOutlined',
    },
  },
  {
    path: '/businessSet',
    name: 'businessSet',
    component: () => import('~/pages/businessSet/index.vue'),
    meta: {
      title: '业务组管理',
      icon: 'ApartmentOutlined',
    },
  },
]

export const configRouter: RouteRecordRaw[] = [
  {
    path: '/jsonSet',
    name: 'jsonSet',
    component: () => import('~/pages/jsonSet/index.vue'),
    meta: {
      title: '广告配置',
      icon: 'TeamOutlined',
    },
  },
  {
    path: '/styleSet',
    name: 'styleSet',
    component: () => import('~/pages/styleSet/index.vue'),
    meta: {
      title: '样式管理',
      icon: 'RobotOutlined',
    },
  },
  {
    path: '/loadingPlan',
    name: 'loadingPlan',
    component: () => import('~/pages/loadingPlan/index.vue'),
    meta: {
      title: '加载计划管理',
      icon: 'GlobalOutlined',
    },
  },
  {
    path: '/adSet',
    name: 'adSet',
    component: () => import('~/pages/adSet/index.vue'),
    meta: {
      title: '广告单元管理',
      icon: 'TabletOutlined',
    },
  },
  {
    path: '/adSourceSet',
    name: 'adSourceSet',
    component: () => import('~/pages/adSourceSet/index.vue'),
    meta: {
      title: '广告源ads管理',
      icon: 'ApartmentOutlined',
    },
  },
  {
    path: '/OIDSet',
    name: 'OIDSet',
    component: () => import('~/pages/OIDSet/index.vue'),
    meta: {
      title: 'OID管理',
      icon: 'ApartmentOutlined',
    },
  },
]

// export default [
//   {
//     path: '/userSet',
//     name: 'userSet',
//     component: () => import('~/pages/userSet/index.vue'),
//     meta: {
//       title: '用户管理',
//       icon: 'TeamOutlined',
//     },
//   },
//   {
//     path: '/roleSet',
//     name: 'roleSet',
//     component: () => import('~/pages/roleSet/index.vue'),
//     meta: {
//       title: '角色管理',
//       icon: 'RobotOutlined',
//     },
//   },
//   {
//     path: '/platform',
//     name: 'platform',
//     component: () => import('~/pages/platform/index.vue'),
//     meta: {
//       title: '上架平台维护',
//       icon: 'GlobalOutlined',
//     },
//   },
//   {
//     path: '/appSet',
//     name: 'appSet',
//     component: () => import('~/pages/appSet/index.vue'),
//     meta: {
//       title: 'APP维护',
//       icon: 'TabletOutlined',
//     },
//   },
//   {
//     path: '/businessSet',
//     name: 'businessSet',
//     component: () => import('~/pages/businessSet/index.vue'),
//     meta: {
//       title: '业务组管理',
//       icon: 'ApartmentOutlined',
//     },
//   },
// ] as RouteRecordRaw[]
