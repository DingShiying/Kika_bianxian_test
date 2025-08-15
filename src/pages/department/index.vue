<script setup lang="ts" name="Department">
import { ref } from 'vue'
import { PlusSquareOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'

interface FormState {
  department: string
}// 表单类型

const response = {
  data: [
    {
      department: '安卓矩阵',
      creator: '张三',
      createTime: '2025-07-08',
      currentEditor: '李四',
      currentEditTime: '2025-08-08',
    },
    {
      department: 'iOS矩阵',
      creator: '李四',
      createTime: '2025-07-09',
      currentEditor: '王五',
      currentEditTime: '2025-08-09',
    },
    {
      department: 'Web矩阵',
      creator: '王五',
      createTime: '2025-07-10',
      currentEditor: '赵六',
      currentEditTime: '2025-08-10',
    },
    {
      department: '安卓矩阵',
      creator: '赵六',
      createTime: '2025-07-11',
      currentEditor: '张三',
      currentEditTime: '2025-08-11',
    },
    {
      department: 'iOS矩阵',
      creator: '张三',
      createTime: '2025-07-12',
      currentEditor: '李四',
      currentEditTime: '2025-08-12',
    },
    {
      department: 'Web矩阵',
      creator: '李四',
      createTime: '2025-07-13',
      currentEditor: '王五',
      currentEditTime: '2025-08-13',
    },
    {
      department: '安卓矩阵',
      creator: '王五',
      createTime: '2025-07-14',
      currentEditor: '赵六',
      currentEditTime: '2025-08-14',
    },
    {
      department: 'iOS矩阵',
      creator: '赵六',
      createTime: '2025-07-15',
      currentEditor: '张三',
      currentEditTime: '2025-08-15',
    },
    {
      department: 'Web矩阵',
      creator: '张三',
      createTime: '2025-07-16',
      currentEditor: '李四',
      currentEditTime: '2025-08-16',
    },
    {
      department: '安卓矩阵',
      creator: '李四',
      createTime: '2025-07-17',
      currentEditor: '王五',
      currentEditTime: '2025-08-17',
    },
    {
      department: 'iOS矩阵',
      creator: '王五',
      createTime: '2025-07-18',
      currentEditor: '赵六',
      currentEditTime: '2025-08-18',
    },
    {
      department: 'Web矩阵',
      creator: '赵六',
      createTime: '2025-07-19',
      currentEditor: '张三',
      currentEditTime: '2025-08-19',
    },
    {
      department: '安卓矩阵',
      creator: '张三',
      createTime: '2025-07-20',
      currentEditor: '李四',
      currentEditTime: '2025-08-20',
    },
    {
      department: 'iOS矩阵',
      creator: '李四',
      createTime: '2025-07-21',
      currentEditor: '王五',
      currentEditTime: '2025-08-21',
    },
    {
      department: 'Web矩阵',
      creator: '王五',
      createTime: '2025-07-22',
      currentEditor: '赵六',
      currentEditTime: '2025-08-22',
    },
    {
      department: '安卓矩阵',
      creator: '赵六',
      createTime: '2025-07-23',
      currentEditor: '张三',
      currentEditTime: '2025-08-23',
    },
    {
      department: 'iOS矩阵',
      creator: '张三',
      createTime: '2025-07-24',
      currentEditor: '李四',
      currentEditTime: '2025-08-24',
    },
    {
      department: 'Web矩阵',
      creator: '李四',
      createTime: '2025-07-25',
      currentEditor: '王五',
      currentEditTime: '2025-08-25',
    },
    {
      department: '安卓矩阵',
      creator: '王五',
      createTime: '2025-07-26',
      currentEditor: '赵六',
      currentEditTime: '2025-08-26',
    },
    {
      department: 'iOS矩阵',
      creator: '赵六',
      createTime: '2025-07-27',
      currentEditor: '张三',
      currentEditTime: '2025-08-27',
    },
    {
      department: 'Web矩阵',
      creator: '张三',
      createTime: '2025-07-28',
      currentEditor: '李四',
      currentEditTime: '2025-08-28',
    },
  ],
}

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

const data = ref(response.data)// 表格数据

const loading = ref(false) // 表格加载状态

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: data.value.length,
})// 表格分页

const open = ref(false)// 弹窗状态
const formRef = ref()// 表单实例
const formState: FormState = reactive({
  department: '',
})// 表单数据

const rules: any = {
  department: [
    { required: true, message: '部门名称不能为空', trigger: 'blur', type: 'string' },
  ],
}// 表单校验规则

function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变

function handleOk() {
  formRef.value.validate().then(() => {
    console.log(formState)
    open.value = false
    Modal.destroyAll()
    formRef.value.resetFields()
    message.success('业务组新建成功！')
  }).catch((error: FormState) => {
    console.log('error', error)
  })
}// 弹窗确认

function handleCancel() {
  open.value = false
  Modal.destroyAll()
  formRef.value.resetFields()
  formState.department = ''
}// 弹窗取消
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
      <a-input-search placeholder="请输入部门名称" enter-button="搜索" style="width: 350px;margin-bottom: 15px;" />
      <a-table
        :columns="columns" :data-source="data" :loading="loading" :pagination="pagination" class="table-part"
        @change="handleTableChange($event)"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.dataIndex === 'operation'">
            <div class="option">
              <span>编辑</span>
              <div class="link-app">
                <img src="@/assets/images/link.svg">
                <span>关联业务组</span>
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
