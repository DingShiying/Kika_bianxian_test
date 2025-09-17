<script setup lang='ts' name='Shuttle_item'>
import { watch } from 'vue'
import { SmileOutlined } from '@ant-design/icons-vue'

const { users, title } = defineProps(['users', 'title'])
const checkAll = defineModel<boolean>('checkAll')
const indeterminate = defineModel<boolean>('indeterminate')
const checkedList = defineModel<any>('checked')

function onCheckAllChange(e: any) {
  checkedList.value = e.target.checked ? users : []
  indeterminate.value = false
}
watch(checkedList, (val) => {
  indeterminate.value = !!val.length && val.length < users.length
  checkAll.value = val.length === users.length
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
          <span>共{{ users.length }}个人，已选{{ checkedList?.length }}个人</span>
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
      <template v-for="user in users" :key="user.userName">
        <a-checkbox :value="user">
          <div class="inner-app-details">
            <SmileOutlined class="people" />
            <div class="text">
              <div class="name">
                {{ user.userName }}
              </div>
              <span>{{ user.userEmail }}</span>
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

  .people {
    font-size: 30px;
    margin-inline-start: 10px;
    margin-inline-end: 10px;
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
