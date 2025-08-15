<script setup lang="ts" name="Department">
import { ref } from 'vue'
import { PlusSquareOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'

// const data = [
//   {
//     id: '1',
//     icon: '/src/assets/images/icon1.png',
//     appName: '智慧生活助手',
//     system: 'iOS',
//     siteLocation: 'com.example.app1',
//     business: 'iOS矩阵组',
//     channel: [
//       {
//         name: '今日头条',
//         icon: '/src/assets/images/toutiao.svg',
//       },
//       {
//         name: '快手',
//         icon: '/src/assets/images/kuaishou.svg',
//       },
//       {
//         name: '抖音',
//         icon: '/src/assets/images/douyin.svg',
//       },
//       {
//         name: '推特',
//         icon: '/src/assets/images/X.svg',
//       },
//     ],
//   },
//   {
//     id: '2',
//     icon: '/src/assets/images/icon2.png',
//     appName: '智能办公助手',
//     system: 'Android',
//     siteLocation: 'com.example.app2',
//     business: 'Android矩阵组',
//     channel: [
//       {
//         name: '抖音',
//         icon: '/src/assets/images/douyin.svg',
//       },
//       {
//         name: '推特',
//         icon: '/src/assets/images/X.svg',
//       },
//       {
//         name: '今日头条',
//         icon: '/src/assets/images/toutiao.svg',
//       },
//       {
//         name: '快手',
//         icon: '/src/assets/images/kuaishou.svg',
//       },
//     ],
//   },
//   {
//     id: '3',
//     icon: '/src/assets/images/icon3.png',
//     appName: '健康管理应用',
//     system: 'iOS',
//     siteLocation: 'com.example.app3',
//     business: 'iOS矩阵组',
//     channel: [
//       {
//         name: '推特',
//         icon: '/src/assets/images/X.svg',
//       },
//       {
//         name: '抖音',
//         icon: '/src/assets/images/douyin.svg',
//       },
//       {
//         name: '快手',
//         icon: '/src/assets/images/kuaishou.svg',
//       },
//       {
//         name: '今日头条',
//         icon: '/src/assets/images/toutiao.svg',
//       },
//     ],
//   },
//   {
//     id: '4',
//     icon: '/src/assets/images/icon4.png',
//     appName: '旅行规划助手',
//     system: 'Android',
//     siteLocation: 'com.example.app4',
//     business: 'Android矩阵组',
//     channel: [
//       {
//         name: '快手',
//         icon: '/src/assets/images/kuaishou.svg',
//       },
//       {
//         name: '今日头条',
//         icon: '/src/assets/images/toutiao.svg',
//       },
//       {
//         name: '抖音',
//         icon: '/src/assets/images/douyin.svg',
//       },
//       {
//         name: '推特',
//         icon: '/src/assets/images/X.svg',
//       },
//     ],
//   },
// ]

const channel = [
  {
    name: '今日头条',
    icon: '/src/assets/images/toutiao.svg',
  },
  {
    name: '快手',
    icon: '/src/assets/images/kuaishou.svg',
  },
  {
    name: '抖音',
    icon: '/src/assets/images/douyin.svg',
  },
  {
    name: '推特',
    icon: '/src/assets/images/X.svg',
  },
]

const columns = [
  {
    title: ' APP',
    dataIndex: 'app',
    key: 'app',
    slots: { customRender: 'app' },
  },
  // {
  //   title: '发行端',
  //   dataIndex: 'system',
  //   key: 'system',
  // },
  // {
  //   title: ' 包名',
  //   dataIndex: 'package',
  //   key: 'package',
  // },
  // {
  //   title: '归属业务组',
  //   dataIndex: 'business',
  //   key: 'business',
  // },
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
    appName: '智慧生活助手',
    icon: '/src/assets/images/icon1.png',
    system: 'iOS',
    package: 'com.zhihuishenghuo',
    business: '电商生活组',
    creator: '张三',
    createTime: '2025-07-08',
    currentEditor: '李四',
    currentEditTime: '2025-08-08',
  },
  {
    id: '2',
    appName: '智能办公助手',
    icon: '/src/assets/images/icon2.png',
    system: 'Android',
    package: 'com.zhinengbanjing',
    business: '电商办公组',
    creator: '李四',
    createTime: '2025-07-09',
    currentEditor: '王五',
    currentEditTime: '2025-08-09',
  },
  {
    id: '3',
    appName: '健康管理应用',
    icon: '/src/assets/images/icon3.png',
    system: 'iOS',
    package: 'com.jiankangguanli',
    business: '电商健康组',
    creator: '王五',
    createTime: '2025-07-10',
    currentEditor: '赵六',
    currentEditTime: '2025-08-10',
  },
  {
    id: '4',
    appName: '旅行规划助手',
    icon: '/src/assets/images/icon4.png',
    system: 'Android',
    package: 'com.lvxingguihua',
    business: '电商旅行组',
    creator: '赵六',
    createTime: '2025-07-11',
    currentEditor: '张三',
    currentEditTime: '2025-08-11',
  },
  {
    id: '5',
    appName: '学习提升应用',
    icon: '/src/assets/images/icon1.png',
    system: 'iOS',
    package: 'com.xuexishenghua',
    business: '电商学习组',
    creator: '张三',
    createTime: '2025-07-12',
    currentEditor: '李四',
    currentEditTime: '2025-08-12',
  },
  {
    id: '6',
    appName: '美食推荐助手',
    icon: '/src/assets/images/icon2.png',
    system: 'Android',
    package: 'com.meishituojian',
    business: '电商美食组',
    creator: '李四',
    createTime: '2025-07-13',
    currentEditor: '王五',
    currentEditTime: '2025-08-13',
  },
  {
    id: '7',
    appName: '运动健身助手',
    icon: '/src/assets/images/icon3.png',
    system: 'iOS',
    package: 'com.yundongjiankang',
    business: '电商运动组',
    creator: '王五',
    createTime: '2025-07-14',
    currentEditor: '赵六',
    currentEditTime: '2025-08-14',
  },
  {
    id: '8',
    appName: '金融理财助手',
    icon: '/src/assets/images/icon4.png',
    system: 'Android',
    package: 'com.jinronglicai',
    business: '电商金融组',
    creator: '赵六',
    createTime: '2025-07-15',
    currentEditor: '张三',
    currentEditTime: '2025-08-15',
  },
  {
    id: '9',
    appName: '社交互动平台',
    icon: '/src/assets/images/icon1.png',
    system: 'iOS',
    package: 'com.shejiaohudong',
    business: '电商社交组',
    creator: '张三',
    createTime: '2025-07-16',
    currentEditor: '李四',
    currentEditTime: '2025-08-16',
  },
  {
    id: '10',
    appName: '阅读学习助手',
    icon: '/src/assets/images/icon2.png',
    system: 'Android',
    package: 'com.yueduxuexi',
    business: '电商阅读组',
    creator: '李四',
    createTime: '2025-07-17',
    currentEditor: '王五',
    currentEditTime: '2025-08-17',
  },
  {
    id: '11',
    appName: '智慧生活助手11',
    icon: '/src/assets/images/icon3.png',
    system: 'iOS',
    package: 'com.zhihuishenghuo11',
    business: '电商生活组',
    creator: '王五',
    createTime: '2025-07-18',
    currentEditor: '赵六',
    currentEditTime: '2025-08-18',
  },
  {
    id: '12',
    appName: '智能办公助手12',
    icon: '/src/assets/images/icon4.png',
    system: 'Android',
    package: 'com.zhinengbanjing12',
    business: '电商办公组',
    creator: '赵六',
    createTime: '2025-07-19',
    currentEditor: '张三',
    currentEditTime: '2025-08-19',
  },
  {
    id: '13',
    appName: '健康管理应用13',
    icon: '/src/assets/images/icon1.png',
    system: 'iOS',
    package: 'com.jiankangguanli13',
    business: '电商健康组',
    creator: '张三',
    createTime: '2025-07-20',
    currentEditor: '李四',
    currentEditTime: '2025-08-20',
  },
  {
    id: '14',
    appName: '旅行规划助手14',
    icon: '/src/assets/images/icon2.png',
    system: 'Android',
    package: 'com.lvxingguihua14',
    business: '电商旅行组',
    creator: '李四',
    createTime: '2025-07-21',
    currentEditor: '王五',
    currentEditTime: '2025-08-21',
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
  department: string
}
const formRef = ref()
const formState: FormState = reactive({
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
  department: [
    { required: true, message: '业务组名称不能为空', trigger: 'blur', type: 'string' },
  ],
}
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" @click="() => open = true">
        <template #icon>
          <PlusSquareOutlined />
        </template>
        新增APP
      </a-button>
    </template>
    <a-card>
      <!-- <a-list item-layout="horizontal" :data-source="data">
        <template #renderItem="{ item }">
          <a-list-item class="app-item">
            <div class="app">
              <div class="id">
                {{ item.id }}
              </div>
              <img :src="item.icon">
              <div class="describe">
                <div class="name">
                  {{ item.appName }}
                  <div class="tag">
                    {{ item.system }}
                  </div>
                </div>
                <div class="siteLocation">
                  {{ item.siteLocation }}
                </div>
                <div class="business">
                  {{ item.business }}
                </div>
              </div>
            </div>
            <div class="channel">
              <div v-for="(channelItem, index) in item.channel" :key="index" class="channel-item">
                <img :src="channelItem.icon">
                <span>{{ channelItem.name }}</span>
              </div>
            </div>
          </a-list-item>
        </template>
      </a-list> -->
      <a-table
        :columns="columns" :data-source="data" :loading="loading" :pagination="pagination" class="table-part"
        @change="handleTableChange($event)"
      >
        <template #app="{ record }">
          <div class="app">
            <img :src="record.icon">
            <div class="app-text">
              <div class="top">
                {{ record.appName }}
                <div class="tag">
                  {{ record.system }}
                </div>
                <div class="tag">
                  {{ record.business }}
                </div>
              </div>
              <div class="bottom">
                {{ record.package }}
              </div>
            </div>
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
      v-model:open="open" title="新增APP" style="top: 10vh" width="50vw" :mask-closable="false"
      :body-style="{ minHeight: '10vh' }" @ok="handleOk" @cancel="handleCancel"
    >
      <a-form ref="formRef" :model="formState" :rules="rules" :label-col="{ style: { width: '100px' } }">
        <a-form-item label="应用名称" name="department" style="width: 30vw;">
          <a-input v-model:value="formState.department" placeholder="请输入应用名称" />
        </a-form-item>

        <a-form-item label="包名" name="department" style="width: 30vw;">
          <a-input v-model:value="formState.department" placeholder="请输入应用包名" />
        </a-form-item>

        <a-form-item label="归属业务组" name="department" style="width: 20vw;">
          <a-select v-model:value="formState.department" placeholder="请选择业务组" :options="departmentList" />
        </a-form-item>

        <a-form-item label="发行端" style="width: 20vw;">
          <a-radio-group v-model:value="formState.department">
            <a-radio value="iOS">
              iOS
            </a-radio>
            <a-radio value="android">
              Android
            </a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="应用图标" name="department">
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

        <a-form-item style="width:45vw" class="channel-input">
          <div class="title">
            渠道投放信息&nbsp;<span>(若渠道有投放，需要填写该渠道的产品名，否则无法获取数据)</span>
          </div>
          <a-list item-layout="horizontal" :data-source="channel">
            <template #header>
              <div class="channel-header">
                <span>渠道</span>
                <span>投放产品名称</span>
                <span>操作</span>
              </div>
            </template>
            <template #renderItem="{ item }">
              <a-list-item class="channel-list">
                <div class="channel-name">
                  <img :src="item.icon">
                  <span>{{ item.name }}</span>
                </div>
                <div class="product-name">
                  <a-input v-model:value="formState.department" placeholder="请输入投放产品名称" />
                </div>
                <div class="operation">
                  <a-button type="primary">
                    保存
                  </a-button>
                </div>
              </a-list-item>
            </template>
          </a-list>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-container>
</template>

<style lang="scss" scoped>
.table-part {
  min-height: 50vh;

  .app {
    display: flex;
    align-items: center;

    img {
      height: 40px;
      width: 40px;
      object-fit: contain;
      margin-right: 10px;
    }

    .app-text {
      display: flex;
      flex-direction: column;

      .top {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: bolder;

        .tag {
          font-size: 12px;
          font-weight: 400;
          margin-left: 10px;
          padding: 6px 10px;
          color: #2563eb;
          border-radius: 20px;
          background-color: #eff6ff;

          &:last-of-type {
            color: #9333ea;
            background-color: #faf5ff;
          }
        }
      }
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

// .app-item {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   .app {
//     display: flex;
//     align-items: center;

//     .id {
//       font-size: 20px;
//       font-weight: bolder;
//     }

//     img {
//       width: 80px;
//       height: 80px;
//       object-fit: contain;
//       margin-right: 15px;
//       margin-left: 50px;
//     }

//     .describe {
//       display: flex;
//       flex-direction: column;

//       .name {
//         font-size: 17px;
//         font-weight: 600;
//         display: flex;
//         align-items: center;

//         .tag {
//           margin-left: 10px;
//           padding: 6px 10px;
//           font-size: 14px;
//           font-weight: 300;
//           color: #2563eb;
//           border-radius: 20px;
//           background-color: #eff6ff;
//         }
//       }

//       .siteLocation {
//         font-size: 13px;
//         color: grey;
//         margin: 5px 0;
//       }

//       .business {
//         padding: 5px 8px;
//         font-size: 14px;
//         color: #9333ea;
//         border-radius: 20px;
//         background-color: #faf5ff;
//         width: fit-content;
//       }
//     }
//   }

//   .channel {
//     display: flex;
//     align-items: center;
//     justify-content: space-evenly;
//     min-width: 50%;
//     max-width: 60%;

//     .channel-item {
//       img {
//         width: 20px;
//         height: 20px;
//         object-fit: contain;
//         margin-right: 20px;
//       }

//       span {
//         font-size: 15px;
//       }
//     }
//   }
// }

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

.channel-input {
  .title {
    font-size: 17px;
    font-weight: bolder;

    span {
      color: red;
    }
  }

  .channel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f9fafb;
    padding: 10px 20px;

    span {
      font-size: 15px;
      color: #9ca3af;
      display: block;

      &:first-of-type {
        width: 25%;
      }

      &:nth-of-type(2) {
        width: 40%;
      }

      &:last-of-type {
        width: 10%;
      }
    }
  }

  .channel-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;

    .channel-name {
      width: 25%;
      display: flex;
      align-items: center;

      img {
        width: 20px;
        height: 20px;
        object-fit: contain;
        margin-right: 10px;
      }

      span {
        font-size: 15px;
      }
    }

    .product-name {
      width: 40%;
    }

    .operation {
      width: 10%;
    }
  }
}
</style>
