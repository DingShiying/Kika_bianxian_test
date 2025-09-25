<script setup lang='ts' name='Shuttle_item'>
import { watch } from 'vue'

const { apps, title } = defineProps(['apps', 'title'])
const checkAll = defineModel<boolean>('checkAll')
const indeterminate = defineModel<boolean>('indeterminate')
const checkedList = defineModel<any>('checked')

function onCheckAllChange(e: any) {
  checkedList.value = e.target.checked ? apps : []
  indeterminate.value = false
}
watch(checkedList, (val) => {
  indeterminate.value = !!val.length && val.length < apps.length
  checkAll.value = val.length === apps.length
})
</script>

<template>
  <a-collapse-panel>
    <template #header>
      <div class="checkbox">
        <img src="/src/assets/images/business2.svg">
        <div class="text">
          <div class="name">
            {{ title }}
          </div>
          <span>共{{ apps.length }}个APP，已选{{ checkedList?.length }}个APP</span>
        </div>
      </div>
    </template>
    <template #extra>
      <!-- <span @click="handleClick">展开</span> -->
    </template>
    <a-checkbox v-model:checked="checkAll" :indeterminate="indeterminate" @change="onCheckAllChange">
      全选
    </a-checkbox>
    <a-checkbox-group v-model:value="checkedList">
      <template v-for="app in apps" :key="app.package">
        <a-checkbox :value="app">
          <div class="inner-app-details">
            <img :src="app.icon">
            <div class="text">
              <div class="name">
                {{ app.appName }}
                <img :src="`/src/assets/images/${app.system}.svg`">
              </div>
              <span>{{ app.package }}</span>
            </div>
          </div>
        </a-checkbox>
      </template>
    </a-checkbox-group>
  </a-collapse-panel>
</template>

<style scoped lang='scss'>
:deep(.ant-collapse-header) {
    padding: 5px 10px !important;
    align-items: center !important;
}

.ant-checkbox-group {
    flex-direction: column;
    width: 100%;
}

.ant-collapse-content-box {
    display: flex;
    flex-direction: column;
}

.checkbox {
    width: 100%;
    display: flex;
    align-items: center;

    img {
        height: 30px;
        width: 30px;
        object-fit: contain;
        margin-right: 15px;
    }

    .text {
        display: flex;
        flex-direction: column;

        .name {
            font-size: 18px;
            font-weight: bold;
        }

        span {
            font-size: 12px;
            color: grey;
        }
    }
}

.inner-app-details {
    width: 100%;
    display: flex;
    align-items: center;

    img {
        height: 30px;
        width: 30px;
        object-fit: contain;
        margin-right: 10px;
    }

    .text {
        display: flex;
        flex-direction: column;

        .name {
            font-size: 14px;
            font-weight: bold;

            img {
                width: 15px;
                height: 15px;
                margin-left: 5px;
                vertical-align: top;
            }
        }

        span {
            font-size: 12px;
            color: grey;
        }
    }
}
</style>
