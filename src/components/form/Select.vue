<script setup lang='ts' name='Select'>
import { ref, watch } from 'vue'

const { options } = defineProps(['options'])
const model: any = defineModel()

const visible = ref(false)// 下拉框是否显示
const searchValue = ref('')// 搜索框内容
const indeterminate = ref(false)// 是否半选
const checkAll = ref(false)// 是否全选

const options_ = computed(() => {
  if (searchValue.value === '') {
    return options
  }
  else {
    const filterData: any = []
    options.forEach((item: any) => {
      if (item.includes(searchValue.value)) {
        filterData.push(item)
      }
    })
    return filterData
  }
})

function onCheckAllChange(e: any) {
  model.value = e.target.checked ? options_.value : []
  indeterminate.value = false
}

watch(model, (val) => {
  indeterminate.value = !!val.length && val.length <= options_.value.length
  checkAll.value = val.length === options_.value.length
})
</script>

<template>
  <a-dropdown v-model:open="visible">
    <span class="area-select">
      {{ model.length > 0
        ? `已选择 ${model.length} 个选项`
        : '请选择' }}
    </span>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a-input-search v-model:value="searchValue" placeholder="搜索其他选项" allow-clear />
        </a-menu-item>
        <a-menu-item>
          <a-checkbox
            v-model:checked="checkAll" :indeterminate="indeterminate"
            @change="onCheckAllChange"
          >
            已选择&nbsp;{{ model.length }}&nbsp;个选项
          </a-checkbox>
        </a-menu-item>
        <a-checkbox-group v-model:value="model">
          <template v-for="label in options_" :key="label">
            <a-menu-item>
              <a-checkbox :value="label">
                {{ label }}
              </a-checkbox>
            </a-menu-item>
          </template>
        </a-checkbox-group>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped lang='scss'>
.area-select {
    display: block;
    width: 100%;
    cursor: pointer;
    color: grey;
}

.ant-checkbox-group{
    display: flex;
    flex-direction: column;
}
</style>
