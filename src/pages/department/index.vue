<script setup lang="ts" name="Department">
import { onMounted, ref } from 'vue'
import { PlusSquareOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'
import linkChart from '@/components/linkChart/index.vue'
import { getDepartmentData } from '~@/api/department'

interface FormState {
  department: string
}// 表单类型

interface DepartmentItem {
  department: string
  creator: string
  createTime: string
  currentEditor: string
  currentEditTime: string
}// 接口响应数据类型

// const response = {
//   data: [
//     {
//       department: '安卓矩阵',
//       creator: '张三',
//       createTime: '2025-07-08',
//       currentEditor: '李四',
//       currentEditTime: '2025-08-08',
//     },
//     {
//       department: 'iOS矩阵',
//       creator: '李四',
//       createTime: '2025-07-09',
//       currentEditor: '王五',
//       currentEditTime: '2025-08-09',
//     },
//     {
//       department: 'Web矩阵',
//       creator: '王五',
//       createTime: '2025-07-10',
//       currentEditor: '赵六',
//       currentEditTime: '2025-08-10',
//     },
//     {
//       department: '安卓矩阵',
//       creator: '赵六',
//       createTime: '2025-07-11',
//       currentEditor: '张三',
//       currentEditTime: '2025-08-11',
//     },
//     {
//       department: 'iOS矩阵',
//       creator: '张三',
//       createTime: '2025-07-12',
//       currentEditor: '李四',
//       currentEditTime: '2025-08-12',
//     },
//     {
//       department: 'Web矩阵',
//       creator: '李四',
//       createTime: '2025-07-13',
//       currentEditor: '王五',
//       currentEditTime: '2025-08-13',
//     },
//     {
//       department: '安卓矩阵',
//       creator: '王五',
//       createTime: '2025-07-14',
//       currentEditor: '赵六',
//       currentEditTime: '2025-08-14',
//     },
//     {
//       department: 'iOS矩阵',
//       creator: '赵六',
//       createTime: '2025-07-15',
//       currentEditor: '张三',
//       currentEditTime: '2025-08-15',
//     },
//     {
//       department: 'Web矩阵',
//       creator: '张三',
//       createTime: '2025-07-16',
//       currentEditor: '李四',
//       currentEditTime: '2025-08-16',
//     },
//     {
//       department: '安卓矩阵',
//       creator: '李四',
//       createTime: '2025-07-17',
//       currentEditor: '王五',
//       currentEditTime: '2025-08-17',
//     },
//     {
//       department: 'iOS矩阵',
//       creator: '王五',
//       createTime: '2025-07-18',
//       currentEditor: '赵六',
//       currentEditTime: '2025-08-18',
//     },
//     {
//       department: 'Web矩阵',
//       creator: '赵六',
//       createTime: '2025-07-19',
//       currentEditor: '张三',
//       currentEditTime: '2025-08-19',
//     },
//     {
//       department: '安卓矩阵',
//       creator: '张三',
//       createTime: '2025-07-20',
//       currentEditor: '李四',
//       currentEditTime: '2025-08-20',
//     },
//     {
//       department: 'iOS矩阵',
//       creator: '李四',
//       createTime: '2025-07-21',
//       currentEditor: '王五',
//       currentEditTime: '2025-08-21',
//     },
//     {
//       department: 'Web矩阵',
//       creator: '王五',
//       createTime: '2025-07-22',
//       currentEditor: '赵六',
//       currentEditTime: '2025-08-22',
//     },
//     {
//       department: '安卓矩阵',
//       creator: '赵六',
//       createTime: '2025-07-23',
//       currentEditor: '张三',
//       currentEditTime: '2025-08-23',
//     },
//     {
//       department: 'iOS矩阵',
//       creator: '张三',
//       createTime: '2025-07-24',
//       currentEditor: '李四',
//       currentEditTime: '2025-08-24',
//     },
//     {
//       department: 'Web矩阵',
//       creator: '李四',
//       createTime: '2025-07-25',
//       currentEditor: '王五',
//       currentEditTime: '2025-08-25',
//     },
//     {
//       department: '安卓矩阵',
//       creator: '王五',
//       createTime: '2025-07-26',
//       currentEditor: '赵六',
//       currentEditTime: '2025-08-26',
//     },
//     {
//       department: 'iOS矩阵',
//       creator: '赵六',
//       createTime: '2025-07-27',
//       currentEditor: '张三',
//       currentEditTime: '2025-08-27',
//     },
//     {
//       department: 'Web矩阵',
//       creator: '张三',
//       createTime: '2025-07-28',
//       currentEditor: '李四',
//       currentEditTime: '2025-08-28',
//     },
//   ],
// }

const columns = [
  {
    title: '部门名称',
    dataIndex: 'department',
    key: 'department',
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
    title: '最近修改人',
    dataIndex: 'currentEditor',
    key: 'currentEditor',
  },
  {
    title: '最近修改时间',
    dataIndex: 'currentEditTime',
    key: 'currentEditTime',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
  },
]// 表格列头

const departmentData = ref<DepartmentItem[]>([])// 表格数据

const loading = ref(false) // 表格加载状态

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: departmentData.value.length,
})

const open = ref(false)// 表单弹窗状态
const linkOpen = ref(false)// 关联部门弹窗状态
const formRef = ref()// 表单实例
const formState: FormState = reactive({
  department: '',
})// 表单数据

const searchParams = ref<FormState>({
  department: '',
})// 搜索参数

const rules: any = {
  department: [
    { required: true, message: '部门名称不能为空', trigger: 'blur', type: 'string' },
  ],
}// 表单校验规则

async function getData(searchParams: FormState) {
  try {
    const res = await getDepartmentData(searchParams)
    if (res.code === 200) {
      // @ts-expect-error:忽略
      departmentData.value = res.data
      pagination.value.total = departmentData.value.length
    }
    else {
      message.error(res.msg)
    }
  }
  catch (err: any) {
    message.error(err.message)
  }
  finally {
    loading.value = false
  }
}

function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变

function handleOk() {
  formRef.value.validate().then(async () => {
    try {
      const res = await getDepartmentData(searchParams.value)
      if (res.code === 200) {
        message.success('业务组新建成功！')
        getData(searchParams.value)
      }
      else {
        message.error(res.msg)
      }
    }
    catch (err: any) {
      message.error(err.message)
    }
    finally {
      loading.value = false
      open.value = false
      Modal.destroyAll()
      formRef.value.resetFields()
    }
  }).catch((error: FormState) => {
    console.log('error', error)
  })
}// 表单弹窗确认

function handleCancel() {
  open.value = false
  Modal.destroyAll()
  formRef.value.resetFields()
  formState.department = ''
}// 表单弹窗取消

function openLinkModal() {
  linkOpen.value = true
}// 打开关联弹窗

function editDepartment(department: string) {
  open.value = true
  formState.department = department
}

onMounted(() => {
  getData(searchParams.value)
})
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" @click="() => open = true">
        <template #icon>
          <PlusSquareOutlined />
        </template>
        新增部门
      </a-button>
    </template>

    <a-card>
      <a-input-search
        v-model:value="searchParams.department" placeholder="请输入部门名称" enter-button="搜索"
        style="width: 350px;margin-bottom: 15px;" @search="getData(searchParams)"
      />
      <a-table
        :columns="columns" :data-source="departmentData" :loading="loading" :pagination="pagination"
        class="table-part" @change="handleTableChange($event)"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <div class="option">
              <span @click="editDepartment(record.department)">编辑</span>
              <div class="link-app">
                <img src="@/assets/images/link.svg">
                <span @click="openLinkModal">关联业务组</span>
              </div>
              <span>删除</span>
            </div>
          </template>
        </template>
        <template #footer>
          显示&nbsp;{{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }}&nbsp;到&nbsp;
          {{ pagination.current * pagination.pageSize > pagination.total ? pagination.total : pagination.current
            * pagination.pageSize }}&nbsp;条数据，共&nbsp;{{ pagination.total }}&nbsp;条数据
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:open="open" title="新增部门" style="top: 30vh" width="40vw" :mask-closable="false"
      :body-style="{ minHeight: '10vh' }" @ok="handleOk" @cancel="handleCancel"
    >
      <a-form ref="formRef" :model="formState" :rules="rules" :label-col="{ style: { width: '100px' } }">
        <a-form-item label="部门名称" name="department">
          <a-input v-model:value="formState.department" placeholder="请输入部门名称" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:open="linkOpen" title="关系结构图" style="top: 10vh"
      width="70vw" :mask-closable="false" :body-style="{ minHeight: '10vh' }"
      :footer="null"
    >
      <linkChart />
    </a-modal>
  </page-container>
</template>

<style lang="scss" scoped>
.table-part {
  min-height: 50vh;
}

.option {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 14px;

  span {
    cursor: pointer;

    &:first-of-type {
      color: #4e46e5;
    }

    &:last-of-type {
      color: #e35150;
    }
  }

  .link-app {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    span {
      font-size: 14px;
      color: #4e46e5;
    }

    img {
      height: 14px;
      object-fit: contain;
      margin-right: 5px;
    }
  }
}
</style>
