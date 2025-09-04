<script setup lang='ts' name='Welcome'>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const alertText = userStore.isSuperManage ? '正在进入超级管理' : '正在进入配置管理'

let timer: any = null

onMounted(() => {
  timer = setTimeout(() => {
    router.push('/')
  }, 1000)
})
onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<template>
  <div class="loading">
    <a-spin size="large" />
    <span>{{ alertText }}</span>
  </div>
</template>

<style scoped lang='scss'>
  .loading {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .ant-spin {
      margin-bottom: 20px;
    }
    span{
      font-size: 20px;
      font-weight: 600;
    }
  }
</style>
