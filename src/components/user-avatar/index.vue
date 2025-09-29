<script setup lang="ts">
import { ref } from 'vue'
import { FolderOpenOutlined, LogoutOutlined } from '@ant-design/icons-vue'

// 数据类型声明
// interface APPData {
//   appID: string
//   appName: string
//   package: string
//   firebaseID: string
//   business: string
//   manager: string[]
//   system: string
//   platform: string[]
//   icon: string
//   creator: string
//   createTime: string
//   copyAppID?: string | undefined
//   copyConfig?: string[]
// }// 请求接口数据类型

// const visible = ref(false)
const message = useMessage()
const userStore = useUserStore()
const multiTabStore = useMultiTab()
const layoutMenuStore = useLayoutMenu()
const router = useRouter()
const { avatar, nickname, isSuperManage, apps, currentApp } = storeToRefs(userStore)
const { setSuperManage } = userStore

// const appList: APPData[] = ([
//   {
//     appID: 'app-1',
//     appName: 'APP1',
//     package: 'com.oaojsa.app1',
//     firebaseID: 'ajbbhj_jhkbjhb',
//     business: '电商业务组',
//     manager: ['张三', '李四'],
//     system: 'iOS',
//     platform: ['Google', 'Apple Store', 'xiaomi'],
//     icon: '/src/assets/images/icon1.png',
//     creator: '王五',
//     createTime: '2022-01-01',
//   },
//   {
//     appID: 'app-2',
//     appName: 'APP2',
//     package: 'com.oaojsa.app2',
//     firebaseID: 'ajbbhj_jhkbjhb',
//     business: '电商健康组',
//     manager: ['王五', '李四'],
//     system: 'Android',
//     platform: ['Google', 'Apple Store'],
//     icon: '/src/assets/images/icon2.png',
//     creator: '王五',
//     createTime: '2022-01-01',
//   },
//   {
//     appID: 'app-3',
//     appName: 'APP3',
//     package: 'com.oaojsa.app3',
//     firebaseID: 'ajbbhj_jhkbjhb',
//     business: '电商幸福组',
//     manager: ['张三', '王五'],
//     system: 'iOS',
//     platform: ['Apple Store', 'xiaomi'],
//     icon: '/src/assets/images/icon3.png',
//     creator: '王五',
//     createTime: '2022-01-01',
//   },
//   {
//     appID: 'app-1',
//     appName: 'APP1',
//     package: 'com.oaojsa.app1',
//     firebaseID: 'ajbbhj_jhkbjhb',
//     business: '电商业务组',
//     manager: ['张三', '李四'],
//     system: 'iOS',
//     platform: ['Google', 'Apple Store', 'xiaomi'],
//     icon: '/src/assets/images/icon1.png',
//     creator: '王五',
//     createTime: '2022-01-01',
//   },
//   {
//     appID: 'app-2',
//     appName: 'APP2',
//     package: 'com.oaojsa.app2',
//     firebaseID: 'ajbbhj_jhkbjhb',
//     business: '电商健康组',
//     manager: ['王五', '李四'],
//     system: 'Android',
//     platform: ['Google', 'Apple Store'],
//     icon: '/src/assets/images/icon2.png',
//     creator: '王五',
//     createTime: '2022-01-01',
//   },
//   {
//     appID: 'app-3',
//     appName: 'APP3',
//     package: 'com.oaojsa.app3',
//     firebaseID: 'ajbbhj_jhkbjhb',
//     business: '电商幸福组',
//     manager: ['张三', '王五'],
//     system: 'iOS',
//     platform: ['Apple Store', 'xiaomi'],
//     icon: '/src/assets/images/icon3.png',
//     creator: '王五',
//     createTime: '2022-01-01',
//   },
//   {
//     appID: 'app-1',
//     appName: 'APP1',
//     package: 'com.oaojsa.app1',
//     firebaseID: 'ajbbhj_jhkbjhb',
//     business: '电商业务组',
//     manager: ['张三', '李四'],
//     system: 'iOS',
//     platform: ['Google', 'Apple Store', 'xiaomi'],
//     icon: '/src/assets/images/icon1.png',
//     creator: '王五',
//     createTime: '2022-01-01',
//   },
//   {
//     appID: 'app-2',
//     appName: 'APP2',
//     package: 'com.oaojsa.app2',
//     firebaseID: 'ajbbhj_jhkbjhb',
//     business: '电商健康组',
//     manager: ['王五', '李四'],
//     system: 'Android',
//     platform: ['Google', 'Apple Store'],
//     icon: '/src/assets/images/icon2.png',
//     creator: '王五',
//     createTime: '2022-01-01',
//   },
//   {
//     appID: 'app-3',
//     appName: 'APP3',
//     package: 'com.oaojsa.app3',
//     firebaseID: 'ajbbhj_jhkbjhb',
//     business: '电商幸福组',
//     manager: ['张三', '王五'],
//     system: 'iOS',
//     platform: ['Apple Store', 'xiaomi'],
//     icon: '/src/assets/images/icon3.png',
//     creator: '王五',
//     createTime: '2022-01-01',
//   },
//   {
//     appID: 'app-1',
//     appName: 'APP1',
//     package: 'com.oaojsa.app1',
//     firebaseID: 'ajbbhj_jhkbjhb',
//     business: '电商业务组',
//     manager: ['张三', '李四'],
//     system: 'iOS',
//     platform: ['Google', 'Apple Store', 'xiaomi'],
//     icon: '/src/assets/images/icon1.png',
//     creator: '王五',
//     createTime: '2022-01-01',
//   },
//   {
//     appID: 'app-2',
//     appName: 'APP2',
//     package: 'com.oaojsa.app2',
//     firebaseID: 'ajbbhj_jhkbjhb',
//     business: '电商健康组',
//     manager: ['王五', '李四'],
//     system: 'Android',
//     platform: ['Google', 'Apple Store'],
//     icon: '/src/assets/images/icon2.png',
//     creator: '王五',
//     createTime: '2022-01-01',
//   },
//   {
//     appID: 'app-3',
//     appName: 'APP3',
//     package: 'com.oaojsa.app3',
//     firebaseID: 'ajbbhj_jhkbjhb',
//     business: '电商幸福组',
//     manager: ['张三', '王五'],
//     system: 'iOS',
//     platform: ['Apple Store', 'xiaomi'],
//     icon: '/src/assets/images/icon3.png',
//     creator: '王五',
//     createTime: '2022-01-01',
//   },
//   {
//     appID: 'app-1',
//     appName: 'APP1',
//     package: 'com.oaojsa.app1',
//     firebaseID: 'ajbbhj_jhkbjhb',
//     business: '电商业务组',
//     manager: ['张三', '李四'],
//     system: 'iOS',
//     platform: ['Google', 'Apple Store', 'xiaomi'],
//     icon: '/src/assets/images/icon1.png',
//     creator: '王五',
//     createTime: '2022-01-01',
//   },
//   {
//     appID: 'app-2',
//     appName: 'APP2',
//     package: 'com.oaojsa.app2',
//     firebaseID: 'ajbbhj_jhkbjhb',
//     business: '电商健康组',
//     manager: ['王五', '李四'],
//     system: 'Android',
//     platform: ['Google', 'Apple Store'],
//     icon: '/src/assets/images/icon2.png',
//     creator: '王五',
//     createTime: '2022-01-01',
//   },
//   {
//     appID: 'app-3',
//     appName: 'APP3',
//     package: 'com.oaojsa.app3',
//     firebaseID: 'ajbbhj_jhkbjhb',
//     business: '电商幸福组',
//     manager: ['张三', '王五'],
//     system: 'iOS',
//     platform: ['Apple Store', 'xiaomi'],
//     icon: '/src/assets/images/icon3.png',
//     creator: '王五',
//     createTime: '2022-01-01',
//   },
// ])
// const currentApp = ref<APPData>(appList[0])

// @ts-expect-error:...

if (apps.value.length > 0) {
  currentApp.value = apps.value?.[0]
}

async function handleClick({ key }: any) {
  if (key === 'logout') {
    const hide = message.loading('退出登录...', 0)
    try {
      await userStore.logout()
    }
    finally {
      hide()
      message.success('退出登录成功', 3)
      router.push({
        path: '/login',
      }).then(() => {
        multiTabStore.clear()
        layoutMenuStore.clear()
      })
    }
  }
}

function handleSuperManage() {
  setSuperManage(!isSuperManage.value)
  router.push('/welcome')
}
// function handleAppClick(e: any) {
//   if (e.key) {
//     currentApp.value = appList.find(item => item.appID === e.key) || appList[0]
//     visible.value = false
//   }
// }
</script>

<template>
  <div class="super">
    <!-- <a-dropdown v-model:open="visible" :trigger="['click']" style="max-height:40vh;overflow-y: auto;">
      <div class="app-option">
        <img :src="currentApp.icon" class="app-option-icon">
        <div class="app-name">
          <div class="top">
            {{ currentApp.appName }}
            <img :src="`/src/assets/images/${currentApp.system}.svg`" class="app-system">
          </div>
          <div class="bottom">
            ({{ currentApp.package }})
          </div>
        </div>
      </div>
      <template #overlay>
        <a-menu mode="inline" @click="handleAppClick">
          <template v-for="app in appList" :key="app.appID">
            <a-menu-item>
              <div class="app-option">
                <img :src="app.icon" class="app-option-icon">
                <div class="app-name">
                  <div class="top">
                    <span>{{ app.appName }}</span>
                    <img :src="`/src/assets/images/${app.system}.svg`" class="app-system">
                  </div>
                  <div class="bottom">
                    ({{ app.package }})
                  </div>
                </div>
              </div>
            </a-menu-item>
          </template>
<a-menu-item>
  <a-sub-menu>
    <template #icon>
                <FolderOpenOutlined class="dir-icon" />
              </template>
    <template #title>
                <span class="dir-name">
                  文件夹
                </span>
              </template>

    <div class="sub-content">
      <template v-for="app in appList" :key="app.appID">
                  <a-menu-item>
                    <div class="app-option">
                      <img :src="app.icon" class="app-option-icon">
                      <div class="app-name">
                        <div class="top">
                          <span>{{ app.appName }}</span>
                          <img :src="`/src/assets/images/${app.system}.svg`" class="app-system">
                        </div>
                        <div class="bottom">
                          ({{ app.package }})
                        </div>
                      </div>
                    </div>
                  </a-menu-item>
                </template>
    </div>
  </a-sub-menu>
</a-menu-item>
</a-menu>
</template>
</a-dropdown> -->
    
<!-- <div class="app">
      <div class="app-option" @click="() => visible = !visible">
        <img :src="currentApp.icon" class="app-option-icon">
        <div class="app-name">
          <div class="top">
            {{ currentApp.appName }}
            <img :src="`/src/assets/images/${currentApp.system}.svg`" class="app-system">
          </div>
          <div class="bottom">
            {{ currentApp.package }}
          </div>
        </div>
      </div>

      <a-menu v-if="visible" mode="inline" class="app-menu" @click="handleAppClick">
        <template v-for="app in appList" :key="app.appID">
          <a-menu-item>
            <div class="app-option">
              <img :src="app.icon" class="app-option-icon">
              <div class="app-name">
                <div class="top">
                  <span>{{ app.appName }}</span>
                  <img :src="`/src/assets/images/${app.system}.svg`" class="app-system">
                </div>
                <div class="bottom">
                  {{ app.package }}
                </div>
              </div>
            </div>
          </a-menu-item>
        </template>
        <a-sub-menu>
          <template #icon>
            <FolderOpenOutlined class="dir-icon" />
          </template>
          <template #title>
            <span class="dir-name">
              文件夹
            </span>
          </template>

          <template v-for="app in appList" :key="app.appID">
            <a-menu-item>
              <div class="app-option">
                <img :src="app.icon" class="app-option-icon">
                <div class="app-name">
                  <div class="top">
                    <span>{{ app.appName }}</span>
                    <img :src="`/src/assets/images/${app.system}.svg`" class="app-system">
                  </div>
                  <div class="bottom">
                    {{ app.package }}
                  </div>
                </div>
              </div>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </a-menu>
    </div> -->
    <a-select v-model:value="currentApp">
      <template v-for="app in apps" :key="app">
        <a-select-option :value="app">
          {{ app }}
        </a-select-option>
      </template>
    </a-select>

    <a-dropdown>
      <span hover="bg-[var(--hover-color)]" flex items-center h-48px px-12px cursor-pointer class="transition-all-300">
        <a-avatar :src="avatar" mr-8px size="small" />
        <span class="anticon">{{ nickname }}</span>
      </span>
      <template #overlay>
        <a-menu @click="handleClick">
          <!-- <a-menu-item key="0">
          <template #icon>
            <UserOutlined />
          </template>
  <RouterLink to="/account/center">
    个人中心
  </RouterLink>
  </a-menu-item>
  <a-menu-item key="1">
    <template #icon>
            <ProfileOutlined />
          </template>
    <RouterLink to="/account/settings">
      个人设置
    </RouterLink>
  </a-menu-item>
  <a-menu-divider /> -->
          <a-menu-item key="logout">
            <template #icon>
              <LogoutOutlined />
            </template>
            退出登录
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <a-button type="default" class="but" @click="handleSuperManage">
      {{ isSuperManage ? '退出超级管理' : '超级管理' }}
    </a-button>
  </div>
</template>

<style lang="scss" scoped>
.super {
  display: flex;
  align-items: center;

  .but {
    background-color: transparent;
    color: #fff;
    // box-shadow: 0 0 5px 1px #fff;
  }

  .ant-select {
    min-width: 200px;
  }
}

:deep(.ant-dropdown-menu-item) {
  padding: 5px !important;
}

:deep(.ant-dropdown-menu) {
  max-height: 400px;
  overflow-y: auto;
}

.app {
  position: relative;

  .app-option {
    cursor: pointer;
    min-width: 200px;
    height: 45px;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 3px 10px;
    border-radius: 5px;

    .app-option-icon {
      width: 30px;
      height: 30px;
      object-fit: contain;
    }

    .app-system {
      width: 12px;
      height: 12px;
      object-fit: contain;
      margin-left: 5px;
    }

    .app-name {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      margin-left: 10px;

      .top,
      .bottom {
        font-size: 10px;
        height: 10px;
        display: flex;
        align-items: center;
      }
      .top{
        font-size:12px;
        height: 20px;

      }
    }
  }

  .app-menu {
    position: absolute;
    top: 45px;
    max-height: 300px;
    overflow-y: auto;

    :deep(.ant-menu-item) {
      padding: 0 !important;
      border-bottom: 1px solid #d9d9d9;
      border-radius: 0;
      margin-bottom: 5px;
    }
  }
}

:deep(.ant-dropdown-menu-submenu-title) {
  display: flex;
  align-items: center;

  .dir-icon {
    font-size: 30px !important;
    color: orange;
  }

  .dir-name {
    font-size: 16px;
  }
}
</style>
