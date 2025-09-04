<script setup lang="ts">
import { LogoutOutlined } from '@ant-design/icons-vue'

const message = useMessage()
const userStore = useUserStore()
const multiTabStore = useMultiTab()
const layoutMenuStore = useLayoutMenu()
const router = useRouter()
const { avatar, nickname, isSuperManage } = storeToRefs(userStore)
const { setSuperManage } = userStore
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
</script>

<template>
  <div class="super">
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

    <!-- <a-button type="ghost" style="color:#406aed;border: 1px solid #406aed;">
      退出超级管理
    </a-button> -->
    <a-button type="default" class="but" @click="handleSuperManage">
      {{ isSuperManage ? '退出超级管理' : '超级管理' }}
    </a-button>
  </div>
</template>

<style lang="scss" scoped>
  .super{
    display: flex;
    align-items: center;
    .but{
      background-color: transparent;
      color: #fff;
      // box-shadow: 0 0 5px 1px #fff;
    }
  }
</style>
