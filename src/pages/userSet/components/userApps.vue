<script setup lang='ts' name='userApps'>
import { RollbackOutlined } from '@ant-design/icons-vue'
import { computed, ref } from 'vue'

const { current } = defineProps(['current'])
const emit = defineEmits(['reset', 'close'])

interface APPList {
  appID: string
  appName: string
  appIcon: string
  package: string
  system: string
  addTime: string
}
interface OIDList {
  ID: string
  OID: string
  OIDname: string
  adType: string
  creator: string
  createTime: string
  OIDauth: boolean
}
interface FormState {
  OIDname: string
  creator: string
}

const columns = [
  {
    title: '应用ID',
    dataIndex: 'appID',
    key: 'appID',
  },
  {
    title: '应用名称',
    dataIndex: 'appName',
    key: 'appName',
  },
  {
    title: '应用图标',
    dataIndex: 'appIcon',
    key: 'appIcon',
  },
  {
    title: '包名',
    dataIndex: 'package',
    key: 'package',
  },
  {
    title: '发行端',
    dataIndex: 'system',
    key: 'system',
  },
  {
    title: 'APP权限添加时间',
    dataIndex: 'addTime',
    key: 'addTime',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
  },
]// 表格列头

const OIDcolumns = [
  {
    title: 'ID',
    dataIndex: 'ID',
    key: 'ID',
  },
  {
    title: 'OID',
    dataIndex: 'OID',
    key: 'OID',
  },
  {
    title: 'OID名称',
    dataIndex: 'OIDname',
    key: 'OIDname',
  },
  {
    title: '广告类型',
    dataIndex: 'adType',
    key: 'adType',
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
]

const response = ref<APPList[]>([
  {
    appID: '1',
    appName: '应用1',
    appIcon: '/src/assets/images/icon1.png',
    package: 'com.package.jdjdj',
    system: 'Android',
    addTime: '2025-01-01',
  },
  {
    appID: '2',
    appName: '应用2',
    appIcon: '/src/assets/images/icon3.png',
    package: 'com.package.kkididmdm',
    system: 'iOS',
    addTime: '2025-02-01',
  },
  {
    appID: '3',
    appName: '应用3',
    appIcon: '/src/assets/images/icon3.png',
    package: 'com.package.ffsdsds',
    system: 'Android',
    addTime: '2025-03-01',
  },
  {
    appID: '4',
    appName: '应用4',
    appIcon: '/src/assets/images/icon4.png',
    package: 'com.package.bajbjhabj,sn',
    system: 'iOS',
    addTime: '2025-04-01',
  },
])// 表格数据

const OIDresponse = ref<OIDList[]>([
  {
    ID: '1',
    OID: 'wd_jajsja_aa',
    OIDname: 'OID1',
    adType: '广告1',
    creator: '张三',
    createTime: '2025-01-01',
    OIDauth: true,
  },
  {
    ID: '2',
    OID: 'wd_jajsja_aa',
    OIDname: 'OID2',
    adType: '广告2',
    creator: '李四',
    createTime: '2025-02-01',
    OIDauth: false,
  },
  {
    ID: '3',
    OID: 'wd_jajsja_aa',
    OIDname: 'OID3',
    adType: '广告3',
    creator: '王五',
    createTime: '2025-03-01',
    OIDauth: true,
  },
  {
    ID: '4',
    OID: 'wd_jajsja_aa',
    OIDname: 'OID3',
    adType: '广告3',
    creator: '王五',
    createTime: '2025-03-01',
    OIDauth: true,
  },
  {
    ID: '5',
    OID: 'wd_jajsja_aa',
    OIDname: 'OID3',
    adType: '广告3',
    creator: '王五',
    createTime: '2025-03-01',
    OIDauth: true,
  },
  {
    ID: '6',
    OID: 'wd_jajsja_aa',
    OIDname: 'OID3',
    adType: '广告3',
    creator: '王五',
    createTime: '2025-03-01',
    OIDauth: true,
  },
  {
    ID: '7',
    OID: 'wd_jajsja_aa',
    OIDname: 'OID3',
    adType: '广告3',
    creator: '王五',
    createTime: '2025-03-01',
    OIDauth: true,
  },
  {
    ID: '8',
    OID: 'wd_jajsja_aa',
    OIDname: 'OID3',
    adType: '广告3',
    creator: '王五',
    createTime: '2025-03-01',
    OIDauth: true,
  },
  {
    ID: '9',
    OID: 'wd_jajsja_aa',
    OIDname: 'OID3',
    adType: '广告3',
    creator: '王五',
    createTime: '2025-03-01',
    OIDauth: true,
  },
  {
    ID: '10',
    OID: 'wd_jajsja_aa',
    OIDname: 'OID3',
    adType: '广告3',
    creator: '王五',
    createTime: '2025-03-01',
    OIDauth: true,
  },
  {
    ID: '11',
    OID: 'wd_jajsja_aa',
    OIDname: 'OID3',
    adType: '广告3',
    creator: '王五',
    createTime: '2025-03-01',
    OIDauth: true,
  },
])// 表格数据

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: response.value.length,
})// 表格分页

const OIDpagination = ref({
  current: 1,
  pageSize: 10,
  total: OIDresponse.value.length,
})// OID表格分页

const formRef = ref()
const formState = reactive<FormState>({
  OIDname: '',
  creator: '',
})

const loading = ref(false)// 表格加载状态

const openAuth = ref(false)// 权限管理弹窗
const openOID = ref(false)// OID弹窗

function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变

function handleOIDTableChange(event: any) {
  OIDpagination.value = event
}// 表格分页改变

function handleAuthOk() {
  openAuth.value = false
}// 权限管理弹窗确认

function handleAuthCancel() {
  openAuth.value = false
}// 权限管理弹窗取消

function handleOIDOk() {
  openOID.value = false
}// 权限管理弹窗确认

function handleOIDCancel() {
  openOID.value = false
}// 权限管理弹窗取消

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

function searchOID() {
  console.log(formState)
}

function resetForm() {
  Object.assign(formState, {
    OIDname: '',
    creator: '',
  })
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
    <a-button type="primary" @click="() => emit('reset', current)">
      重新分配APP
    </a-button>
  </div>

  <a-table
    :columns="columns" :data-source="response" :loading="loading" :pagination="pagination" class="table-part"
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
    <template #footer>
      显示&nbsp;{{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }}&nbsp;到&nbsp;
      {{ pagination.current * pagination.pageSize > pagination.total ? pagination.total : pagination.current
        * pagination.pageSize }}&nbsp;条数据，共&nbsp;{{ pagination.total }}&nbsp;条数据
    </template>
  </a-table>

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
    v-model:open="openOID" title="OID管理" style="top:5vh;width:70vw;" :mask-closable="false" class="OID-modal"
    @ok="handleOIDOk" @cancel="handleOIDCancel"
  >
    <a-form ref="formRef" name="OIDForm" :model="formState" layout="inline">
      <a-form-item label="OID名称" name="OIDname">
        <a-input v-model:value="formState.OIDname" placeholder="请输入OID名称" />
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
        <template v-if="column.dataIndex === 'OIDauth'">
          <a-switch v-model:checked="record.OIDauth" />
        </template>
      </template>
      <template #footer>
        显示&nbsp;{{ OIDpagination.current * OIDpagination.pageSize - OIDpagination.pageSize + 1 }}&nbsp;到&nbsp;
        {{ OIDpagination.current * OIDpagination.pageSize > OIDpagination.total ? OIDpagination.total : OIDpagination.current
          * OIDpagination.pageSize }}&nbsp;条数据，共&nbsp;{{ OIDpagination.total }}&nbsp;条数据
      </template>
    </a-table>

    <template #footer>
      <a-button key="back" @click="handleOIDCancel">
        取消
      </a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOIDOk">
        确定
      </a-button>
    </template>
  </a-modal>
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
