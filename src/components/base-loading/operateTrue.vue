<script setup lang='ts' name='operateTrue'>
import { CheckOutlined } from '@ant-design/icons-vue'
import { watch } from 'vue'

const model = defineModel()

watch(model, () => {
  setTimeout(() => {
    model.value = false
  }, 1000)
})
</script>

<template>
  <transition name="fade">
    <template v-if="model">
      <Teleport to="body">
        <div class="loading">
          <CheckOutlined class="icon" />
          <span>操作成功</span>
        </div>
      </Teleport>
    </template>
  </transition>
</template>

<style lang="less" scoped>
.loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
        font-size: 30px;
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
