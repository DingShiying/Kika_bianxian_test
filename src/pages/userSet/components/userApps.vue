<script setup lang='ts' name='userApps'>
import { computed, ref } from 'vue'
import { RollbackOutlined } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import Shuttle from './ShuttleBox.vue'
import operateTrue from '~@/components/base-loading/operateTrue.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'

// 父组件数据和方法
const { current } = defineProps(['current'])
const emit = defineEmits(['close'])

// 类型声明
interface APPData {
  id: string
  appName: string
  appIcon: string
  package: string
  system: string
  addTime: string
}
interface OIDList {
  ID: string
  oid: string
  format: number
  creator: string
  createTime: string
  auth: boolean
}
interface FormState {
  oid: string
  creator: string
}

// 请求响应数据
const response = ref<APPData[]>([
  {
    id: '1',
    appName: '应用1',
    appIcon: '/src/assets/images/icon1.png',
    package: 'com.package.jdjdj',
    system: 'Android',
    addTime: '2025-01-01',
  },
  {
    id: '2',
    appName: '应用2',
    appIcon: '/src/assets/images/icon3.png',
    package: 'com.package.kkididmdm',
    system: 'iOS',
    addTime: '2025-02-01',
  },
  {
    id: '3',
    appName: '应用3',
    appIcon: '/src/assets/images/icon3.png',
    package: 'com.package.ffsdsds',
    system: 'Android',
    addTime: '2025-03-01',
  },
  {
    id: '4',
    appName: '应用4',
    appIcon: '/src/assets/images/icon4.png',
    package: 'com.package.bajbjhabj,sn',
    system: 'iOS',
    addTime: '2025-04-01',
  },
])// APP表格数据
const OIDresponse = ref<OIDList[]>([
  {
    ID: '1',
    oid: 'wd_jajsja_aa',
    format: 0,
    creator: '张三',
    createTime: '2025-01-01',
    auth: true,
  },
  {
    ID: '2',
    oid: 'wd_jajsja_aa',
    format: 3,
    creator: '李四',
    createTime: '2025-02-01',
    auth: false,
  },
  {
    ID: '3',
    oid: 'wd_jajsja_aa',
    format: 4,
    creator: '王五',
    createTime: '2025-03-01',
    auth: true,
  },
])// OID表格数据

// APP表格相关变量
const columns: any = [
  {
    title: '应用ID',
    dataIndex: 'appID',
    key: 'appID',
  },
  {
    title: '应用名称',
    dataIndex: 'appName',
    key: 'appName',
    align: 'center',
  },
  {
    title: '应用图标',
    dataIndex: 'appIcon',
    key: 'appIcon',
    align: 'center',
  },
  {
    title: '包名',
    dataIndex: 'package',
    key: 'package',
    align: 'center',
  },
  {
    title: '发行端',
    dataIndex: 'system',
    key: 'system',
    align: 'center',
  },
  {
    title: 'APP权限添加时间',
    dataIndex: 'addTime',
    key: 'addTime',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
  },
]// 应用表格列头
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: response.value.length,
})// APP表格分页
const openAuth = ref(false)// 权限管理弹窗
const openOID = ref(false)// OID弹窗

// oid表格相关变量
const OIDcolumns: any = [
  {
    title: 'ID',
    dataIndex: 'ID',
    key: 'ID',
  },
  {
    title: 'oid',
    dataIndex: 'oid',
    key: 'oid',
  },
  {
    title: '广告类型',
    dataIndex: 'format',
    key: 'format',
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: 'OID权限',
    dataIndex: 'OIDauth',
    key: 'OIDauth',
  },
]// oid表格列头
const OIDpagination = ref({
  current: 1,
  pageSize: 10,
  total: OIDresponse.value.length,
})// OID表格分页
const formRef = ref()// oid查询表单
const formState = reactive<FormState>({
  oid: '',
  creator: '',
})// oid查询表单数据
const loading = ref(false)// oid表格加载状态

// 重新分配APP相关变量
const resetAppOpen = ref(false)
const resetApp = ref([])

// 事件反馈相关变量
const operationYes = ref(false) // 操作成功
const operationNo = ref(false) // 操作失败

// APP表格相关函数
function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变
function handleAuthOk() {
  openAuth.value = false
}// 权限管理弹窗确认
function handleAuthCancel() {
  openAuth.value = false
}// 权限管理弹窗取消
function handleOIDOk() {
  console.log(OIDresponse.value)
  openOID.value = false
}// oid管理弹窗确认
function handleOIDCancel() {
  openOID.value = false
}// oid管理弹窗取消

// oid表格相关函数
function handleOIDTableChange(event: any) {
  OIDpagination.value = event
}// 表格分页改变
function searchOID() {
  try {
    loading.value = true
    setTimeout(() => {
      console.log(formState)
      loading.value = false
    }, 1000)
  }
  catch (error: any) {
    loading.value = false
    console.error(error)
    notification.open({
      message: '获取数据失败',
      description: error.message,
    })
  }
}// oid查询
function resetForm() {
  Object.assign(formState, {
    oid: '',
    creator: '',
  })
}// 重置oid查询表单
const formatOptions = [
  {
    label: '插屏广告-INTERSTITIAL',
    value: 0,
  },
  {
    label: '激励视频广告-REWARDED_VIDEO',
    value: 1,
  },
  {
    label: '开屏广告-APP_OPEN',
    value: 2,
  },
  {
    label: '激励插屏广告-REWARDED_INTERSTITIAL',
    value: 3,
  },
  {
    label: '原生广告-NATIVE',
    value: 4,
  },
  {
    label: '原生插屏广告-NATIVE_INTER',
    value: 5,
  },
  {
    label: '横幅广告-BANNER',
    value: 6,
  },
  {
    label: '中等矩形横幅广告-MEDIUM',
    value: 7,
  },
  {
    label: '内联横幅广告-INLINE_BANNER',
    value: 8,
  },
]// oid格式选项

// 重新分配APP相关函数
function resetAppOK() {
  console.log(resetApp.value)
  operationYes.value = true
  resetApp.value = []
  resetAppOpen.value = false
}// 重新分配APP
function resetAppCancel() {
  resetApp.value = []
  resetAppOpen.value = false
}// 取消重新分配APP

interface TreeDataItem {
  key: string
  title: string
  disabled?: boolean
  children?: TreeDataItem[]
}

const tData: TreeDataItem[] = [
  {
    key: 'systemSet',
    title: '系统管理',
    children: [
      {
        key: 'userSet',
        title: '用户管理',
        children: [
          { key: 'searchUser', title: '用户查询' },
          { key: 'addUser', title: '用户新增' },
          { key: 'editUser', title: '用户修改' },
          { key: 'deleteUser', title: '用户删除' },
          { key: 'exportUser', title: '用户导出' },
          { key: 'importUser', title: '用户导入' },
          { key: 'initUser', title: '用户重置' },
        ],
      },
      {
        key: 'roleSet',
        title: '角色管理',
        children: [
          { key: 'searchRole', title: '角色查询' },
          { key: 'addRole', title: '角色新增' },
          { key: 'editRole', title: '角色修改' },
          { key: 'deleteRole', title: '角色删除' },
          { key: 'exportRole', title: '角色导出' },
          { key: 'importRole', title: '角色导入' },
          { key: 'initRole', title: '角色重置' },
        ],
      },
    ],
  },
]
const transferDataSource: TreeDataItem[] = []
function flatten(list: TreeDataItem[] = []) {
  list.forEach((item) => {
    transferDataSource.push(item)
    if (item.children) {
      flatten(item.children)
    }
  })
}
flatten(JSON.parse(JSON.stringify(tData)))

function isChecked(selectedKeys: string[], eventKey: string) {
  return selectedKeys.includes(eventKey)
}

function handleTreeData(data: TreeDataItem[], targetKeys: string[] = []): TreeDataItem[] {
  data.forEach((item) => {
    item.disabled = targetKeys.includes(item.key)
    if (item.children) {
      handleTreeData(item.children, targetKeys)
    }
  })
  return data
}

const targetKeys = ref<string[]>([])
const dataSource = ref<TreeDataItem[]>(transferDataSource)

const treeData = computed<TreeDataItem[]>(() => {
  return handleTreeData(tData, targetKeys.value)
})

function onChange(keys: string[]) {
  targetKeys.value = keys
}

function onChecked(_: any, e: any, checkedKeys: string[], onItemSelect: (n: any, c: boolean) => void) {
  const { eventKey } = e.node
  onItemSelect(eventKey, !isChecked(checkedKeys, eventKey))
  console.log(e)
  if (e.node.children.length > 1) {
    console.log('llll')
    e.node.children.forEach((item: any) => {
      onItemSelect(item.key, !isChecked(checkedKeys, item.key))
    })
  }
}
</script>

<template>
  <div class="header">
    <a-button type="primary" @click="() => emit('close', false)">
      <template #icon>
        <RollbackOutlined />
      </template>
      返回
    </a-button>
    <span>{{ current.userName }}的APP权限管理</span>
    <a-button type="primary" @click="() => resetAppOpen = true">
      重新分配APP
    </a-button>
  </div>

  <a-table
    :columns="columns" :data-source="response" :pagination="pagination" class="table-part"
    @change="handleTableChange($event)"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'appIcon'">
        <a-image :src="record.appIcon" :width="40" :height="40" />
      </template>
      <template v-if="column.dataIndex === 'system'">
        <div class="system">
          <img :src="`/src/assets/images/${record.system}.svg`" class="system-icon">
          <span>{{ record.system === 'Android' ? '安卓' : '苹果' }}</span>
        </div>
      </template>
      <template v-if="column.dataIndex === 'operation'">
        <div class="option">
          <div class="option-item" @click="() => openAuth = true">
            权限管理
          </div>

          <div class="option-item" @click="() => openOID = true">
            OID管理
          </div>
        </div>
      </template>
    </template>
    <!-- <template #footer>
      显示&nbsp;{{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }}&nbsp;到&nbsp;
      {{ pagination.current * pagination.pageSize > pagination.total ? pagination.total : pagination.current
        * pagination.pageSize }}&nbsp;条数据，共&nbsp;{{ pagination.total }}&nbsp;条数据
    </template> -->
  </a-table>

  <a-modal
    v-model:open="resetAppOpen" title="重新分配APP" style="top:20vh;width:80vw;" :mask-closable="false" class="OID-modal"
    ok-text="确认" cancel-text="取消" @ok="resetAppOK" @cancel="resetAppCancel"
  >
    <Shuttle :checked="resetApp" />
  </a-modal>

  <a-modal
    v-model:open="openAuth" title="权限管理" style="top:10vh;width:70vw;" :mask-closable="false" @ok="handleAuthOk"
    @cancel="handleAuthCancel"
  >
    <a-transfer
      class="tree-transfer" :data-source="dataSource" :target-keys="targetKeys" :render="item => item.title"
      :show-select-all="false" @change="onChange"
    >
      <template #children="{ direction, selectedKeys, onItemSelect }">
        <a-tree
          v-if="direction === 'left'" block-node checkable check-strictly default-expand-all
          :checked-keys="[...selectedKeys, ...targetKeys]" :tree-data="treeData"
          @check="(_, props) => { onChecked(_, props, [...selectedKeys, ...targetKeys], onItemSelect) }"
          @select="(_, props) => { onChecked(_, props, [...selectedKeys, ...targetKeys], onItemSelect) }"
        />
      </template>
    </a-transfer>

    <template #footer>
      <a-button key="back" @click="handleAuthCancel">
        取消
      </a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleAuthOk">
        确定
      </a-button>
    </template>
  </a-modal>

  <a-modal
    v-model:open="openOID" title="OID管理" style="top:5vh;width:90vw;" :mask-closable="false" class="OID-modal"
    @ok="handleOIDOk" @cancel="handleOIDCancel"
  >
    <a-form ref="formRef" name="OIDForm" :model="formState" layout="inline">
      <a-form-item label="OID" name="oid">
        <a-input v-model:value="formState.oid" placeholder="请输入OID" />
      </a-form-item>
      <a-form-item label="创建人" name="creator">
        <a-input v-model:value="formState.creator" placeholder="请输入创建人" />
      </a-form-item>
      <div class="form-but">
        <a-button type="primary" @click="searchOID">
          查询
        </a-button>
        <a-button type="default" @click="resetForm">
          重置
        </a-button>
      </div>
    </a-form>

    <a-table
      :columns="OIDcolumns" :data-source="OIDresponse" :loading="loading" :pagination="OIDpagination"
      style="margin-top:10px" :scroll="{ y: '50vh' }" @change="handleOIDTableChange($event)"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'format'">
          {{ formatOptions.find((i) => i.value === record.format)?.label }}
        </template>
        <template v-if="column.dataIndex === 'OIDauth'">
          <a-switch v-model:checked="record.auth" />
        </template>
      </template>
      <!-- <template #footer>
        显示&nbsp;{{ OIDpagination.current * OIDpagination.pageSize - OIDpagination.pageSize + 1 }}&nbsp;到&nbsp;
        {{ OIDpagination.current * OIDpagination.pageSize > OIDpagination.total ? OIDpagination.total : OIDpagination.current
          * OIDpagination.pageSize }}&nbsp;条数据，共&nbsp;{{ OIDpagination.total }}&nbsp;条数据
      </template> -->
    </a-table>

    <template #footer>
      <a-button key="back" @click="handleOIDCancel">
        取消
      </a-button>
      <a-button key="submit" type="primary" @click="handleOIDOk">
        确定
      </a-button>
    </template>
  </a-modal>

  <operateTrue v-model="operationYes" />
  <operateFalse v-model="operationNo" />
</template>

<style scoped lang='scss'>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  span {
    font-size: 18px;
    font-weight: bold;
  }
}

.table-part {
  min-height: 40vh;
  padding: 0 !important;

  .system {
    display: flex;
    align-items: center;
    font-size: 14px;

    .system-icon {
      width: 20px;
      height: 20px;
      object-fit: contain;
      margin-right: 10px;
    }
  }

  .option {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .option-item {
      color: #574ee6;
      cursor: pointer;
    }
  }

}

.form-but {
  display: flex;
  align-items: center;

  .ant-btn {
    &:first-of-type {
      margin-right: 20px;
    }
  }
}

.ant-modal.OID-modal{
  overflow: auto;
  overflow-x: hidden;
  max-height: 80vh;
  background-color: pink;
}
</style>
