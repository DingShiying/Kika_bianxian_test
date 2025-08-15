<script setup lang="ts">
import { useLayoutState } from '../../basic-layout/context'
import SubMenu from './sub-menu.vue'

const { theme, collapsed, layout, isMobile, selectedMenus, selectedKeys, openKeys, handleOpenKeys, handleSelectedKeys, handleMenuSelect } = useLayoutState()
const menuTheme = computed(() => {
  if (theme.value === 'inverted')
    return 'dark'
  return theme.value
})
</script>

<template>
  <a-menu
    :selected-keys="selectedKeys" :open-keys="collapsed ? [] : openKeys"
    :mode="(layout === 'top' && !isMobile) ? 'horizontal' : 'inline'" :theme="menuTheme" :collapsed="collapsed"
    class="ant-pro-sider-menu" @update:open-keys="handleOpenKeys" @update:selected-keys="handleSelectedKeys"
    @select="handleMenuSelect"
  >
    <template v-for="item in selectedMenus">
      <template v-if="!item.hideInMenu">
        <SubMenu :key="item.path" :item="item" />
      </template>
    </template>
  </a-menu>
</template>

<style lang="scss" scoped>
.a-menu {
  /* 设置滚动条的宽度 */
  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  /* 设置滚动条轨道的样式 */
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  /* 设置滚动条滑块的样式 */
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 10px;
  }

  /* 设置滚动条滑块在悬停时的样式 */
  &::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }

  /* 设置滚动条角的样式 */
  &::-webkit-scrollbar-corner {
    background: #ccc;
  }
}
</style>
