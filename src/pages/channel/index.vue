<script setup lang="ts" name="Channel">
import { ref } from 'vue'
import { PlusSquareOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'

const columns = [
  {
    title: '渠道名称',
    dataIndex: 'channel',
    key: 'channel',
    slots: { customRender: 'channel' },
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
    slots: { customRender: 'operation' },
  },
]
const data = [
  {
    id: '1',
    channel: '今日头条',
    icon: '/src/assets/images/toutiao.svg',
    creator: '张三',
    createTime: '2025-07-08',
    currentEditor: '李四',
    currentEditTime: '2025-08-08',
  },
  {
    id: '2',
    channel: '抖音',
    icon: '/src/assets/images/douyin.svg',
    creator: '张三',
    createTime: '2025-07-08',
    currentEditor: '李四',
    currentEditTime: '2025-08-08',
  },
  {
    id: '3',
    channel: '推特',
    icon: '/src/assets/images/X.svg',
    creator: '张三',
    createTime: '2025-07-08',
    currentEditor: '李四',
    currentEditTime: '2025-08-08',
  },
  {
    id: '4',
    channel: '快手',
    icon: '/src/assets/images/kuaishou.svg',
    creator: '张三',
    createTime: '2025-07-08',
    currentEditor: '李四',
    currentEditTime: '2025-08-08',
  },
]

const loading = ref(false)
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: data.length,
})

function handleTableChange(event: any) {
  pagination.value = event
}

const open = ref(false)

interface FormState {
  businessName: string
  department: string
}
const formRef = ref()
const formState: FormState = reactive({
  businessName: '',
  department: '',
})
const departmentList = ref([
  {
    value: '安卓矩阵',
    label: '安卓矩阵',
  },
  {
    value: 'iOS矩阵',
    label: 'iOS矩阵',
  },
  {
    value: 'Web矩阵',
    label: 'Web矩阵',
  },
  {
    value: '后端矩阵',
    label: '后端矩阵',
  },
  {
    value: '前端矩阵',
    label: '前端矩阵',
  },
  {
    value: '测试矩阵',
    label: '测试矩阵',
  },
  {
    value: '产品矩阵',
    label: '产品矩阵',
  },
  {
    value: '设计矩阵',
    label: '设计矩阵',
  },
  {
    value: '运营矩阵',
    label: '运营矩阵',
  },
  {
    value: '市场矩阵',
    label: '市场矩阵',
  },
])

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
}

function handleCancel() {
  open.value = false
  Modal.destroyAll()
  formRef.value.resetFields()
}
const rules = {
  businessName: [
    { required: true, message: '业务组名称不能为空', trigger: 'blur', type: 'string' },
  ],
  department: [{ required: true, message: '请选择一个部门', trigger: 'change', type: 'string' }],
}
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" @click="() => open = true">
        <template #icon>
          <PlusSquareOutlined />
        </template>
        新增渠道
      </a-button>
    </template>

    <a-card>
      <a-input-search placeholder="请输入渠道名称" enter-button="搜索" style="width: 350px;margin-bottom: 15px;" />
      <a-table
        :columns="columns" :data-source="data" :loading="loading" :pagination="pagination" class="table-part"
        @change="handleTableChange($event)"
      >
        <template #channel="{ record }">
          <div class="channel">
            <img :src="record.icon">
            <span>{{ record.channel }}</span>
          </div>
        </template>
        <template #operation>
          <div class="option">
            <span>编辑</span>
            <span>删除</span>
          </div>
        </template>
        <template #footer>
          显示&nbsp;{{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }}&nbsp;到&nbsp;
          {{ pagination.current * pagination.pageSize > pagination.total ? pagination.total : pagination.current
            * pagination.pageSize }}&nbsp;条数据，共&nbsp;{{ pagination.total }}&nbsp;条数据
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:open="open" title="新增渠道" style="top: 15vh" width="40vw" :mask-closable="false"
      :body-style="{ minHeight: '25vh' }" @ok="handleOk" @cancel="handleCancel"
    >
      <a-form ref="formRef" :model="formState" :rules="rules" :label-col="{ style: { width: '100px' } }">
        <a-form-item label="渠道名称" name="businessName">
          <a-input v-model:value="formState.businessName" placeholder="请输入业务组名称" />
        </a-form-item>
        <a-form-item label="应用图标" name="businessName">
          <div class="upload-img">
            <div class="upload">
              <img src="@/assets/images/upload.svg">
              <span>上传icon</span>
            </div>
            <div class="alert-text">
              <span>支持jpg、png格式</span>
              <span>建议尺寸&nbsp;512&nbsp;&times;&nbsp;512&nbsp;</span>
              <span>大小不超过2M</span>
            </div>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-container>
</template>

<style lang="scss" scoped>
.table-part {
  min-height: 50vh;

  .channel {
    display: flex;
    align-items: center;

    img {
      height: 20px;
      width: 20px;
      object-fit: contain;
      margin-right: 10px;
    }

    span {
      font-size: 14px
    }
  }
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
}

.upload-img {
  display: flex;
  align-items: center;

  .upload {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    border: 1px dashed #d1d5db;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 50px;
      height: 50px;
      object-fit: contain;
    }

    span {
      font-size: 12px;
      color: #9ca3af;
    }
  }

  .alert-text {
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin-left: 10px;

    span {
      font-size: 10px;
      color: grey;
      font-weight: 400;

      &:nth-of-type(2) {
        display: block;
        margin: 5px 0;
      }
    }
  }
}
</style>
