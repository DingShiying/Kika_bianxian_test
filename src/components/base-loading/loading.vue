<script lang="ts" setup name="Loading">
import { LoadingOutlined } from '@ant-design/icons-vue'
import { onMounted } from 'vue'

const model = defineModel()

onMounted(() => {
  setTimeout(() => {
    model.value = false
  }, 1000)
})
</script>

<template>
  <transition name="fade">
    <template v-if="model">
      <Teleport to="body">
        <div class="containner">
          <div class="loading">
            <LoadingOutlined class="icon" />
            <span>加载中</span>
          </div>
        </div>
      </Teleport>
    </template>
  </transition>
</template>

<style lang="less" scoped>
.containner{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100000;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loading {
    background-color: rgb(97, 94, 95);
    width: 100px;
    height: 100px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: white;

    .icon {
        font-size: 40px;
        color: white;
        margin-bottom: 15px;
    }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
