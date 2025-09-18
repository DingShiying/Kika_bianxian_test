<script setup lang='ts' name='addUser'>
import { reactive, ref } from 'vue'
import { notification } from 'ant-design-vue'
import { RollbackOutlined } from '@ant-design/icons-vue'
import Shuttle from './ShuttleBox.vue'
import Select from '~@/components/form/Select.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'
import { addUser } from '~@/api/user/useradd'

// 父组件传值
const { current } = defineProps(['current'])
const emit = defineEmits(['close'])

// 数据类型定义
interface FormState {
  userName: string
  userEmail: string
  business: []
  role: string | undefined
  apps: Array<{
    business: string
    appName: string
    system: string
    package: string
    icon: string
  }>
}// 表单数据类型
interface BusinessList {
  business: string
  apps: Array<{
    appName: string
    system: string
    package: string
    icon: string
  }>
}//

// 请求接口数据
const roleList = ['人事经理', '系统管理员', '系统管理员', '开发工程师', '市场经理']
const businessList: BusinessList[] = [
  {
    'business': '电商业务组',
    'apps': [
      {
        'appName': '哈哈哈',
        'system': 'iOS',
        'package': 'com.jiankangguanli.mall',
        'icon': '/src/assets/images/icon1.png',
      },
      {
        'appName': '哦哦哦',
        'system': 'android',
        'package': 'com.aabjhsba.mall',
        'icon': '/src/assets/images/icon2.png',
      },
      {
        'appName': '点点滴滴',
        'system': 'iOS',
        'package': 'com.sasasas.mall',
        'icon': '/src/assets/images/icon3.png',
      },
      {
        'appName': '呃呃呃呃',
        'system': 'android',
        'package': 'com.sasasasai.mall',
        'icon': '/src/assets/images/icon4.png',
      },
    ],
  },
  {
    'business': '电商健康组',
    'apps': [
      {
        'appName': '哈哈哈1',
        'system': 'iOS',
        'package': 'com.jiankangguanli.mall',
        'icon': '/src/assets/images/icon1.png',
      },
      {
        'appName': '哦哦哦1',
        'system': 'android',
        'package': 'com.aabjhsba.mall',
        'icon': '/src/assets/images/icon2.png',
      },
      {
        'appName': '点点滴滴1',
        'system': 'iOS',
        'package': 'com.sasasas.mall',
        'icon': '/src/assets/images/icon3.png',
      },
      {
        'appName': '呃呃呃呃1',
        'system': 'android',
        'package': 'com.sasasasai.mall',
        'icon': '/src/assets/images/icon4.png',
      },
    ],
  },
  {
    'business': '电商哈哈组',
    'apps': [
      {
        'appName': '哈哈哈2',
        'system': 'iOS',
        'package': 'com.jiankangguanli.mall',
        'icon': '/src/assets/images/icon1.png',
      },
      {
        'appName': '哦哦哦2',
        'system': 'android',
        'package': 'com.aabjhsba.mall',
        'icon': '/src/assets/images/icon2.png',
      },
      {
        'appName': '点点滴滴2',
        'system': 'iOS',
        'package': 'com.sasasas.mall',
        'icon': '/src/assets/images/icon3.png',
      },
      {
        'appName': '呃呃呃呃2',
        'system': 'android',
        'package': 'com.sasasasai.mall',
        'icon': '/src/assets/images/icon4.png',
      },
    ],
  },
  {
    'business': '电商呼呼组',
    'apps': [
      {
        'appName': '哈哈哈3',
        'system': 'iOS',
        'package': 'com.jiankangguanli.mall',
        'icon': '/src/assets/images/icon1.png',
      },
      {
        'appName': '哦哦哦3',
        'system': 'android',
        'package': 'com.aabjhsba.mall',
        'icon': '/src/assets/images/icon2.png',
      },
      {
        'appName': '点点滴滴3',
        'system': 'iOS',
        'package': 'com.sasasas.mall',
        'icon': '/src/assets/images/icon3.png',
      },
      {
        'appName': '呃呃呃呃3',
        'system': 'android',
        'package': 'com.sasasasai.mall',
        'icon': '/src/assets/images/icon4.png',
      },
    ],
  },
]

// 表单相关属性
const formRef = ref()// 表单引用
const formState: FormState = reactive(current || {
  userName: '',
  userEmail: '',
  business: [],
  role: undefined,
  apps: [],
})// 表单数据
const rules: any = {
  userName: [{ required: true, message: '用户名不能为空', trigger: 'blur', type: 'string' }],
  userEmail: [{ required: true, message: '用户邮箱不能为空', trigger: 'blur', type: 'string' }, { validator: validateEmail, trigger: 'blur' },
  ],
  business: [{ required: true, message: '请至少选择一个业务组', trigger: 'change', type: 'array' }],
  role: [{ required: true, message: '请选择一个角色', trigger: 'blur', type: 'string' }],
  apps: [{ required: true, message: '请至少选择一个APP', trigger: 'blur', type: 'array' }],
}// 表单验证规则

// 事件反馈相关变量
const operationNo = ref(false) // 操作失败

// 表单相关函数
function submitForm() {
  formRef.value
    .validate()
    .then(() => {
      const form = { ...formState }
      form.apps = formState.apps.map((item: any) => item.appName)
      // @ts-expect-error:...
      addUser(form).then((res) => {
        emit('close', true)
      })
    })
    .catch((error: any) => {
      operationNo.value = true
      console.log('error', error)
      notification.open({
        message: '操作失败',
        description: '请正确填写信息',
        duration: 3,
      })
    })
}
function validateEmail(_: any, value: any) {
  if (!value) {
    return Promise.reject(new Error('请输入邮箱'))
  }
  const emailRegex = /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
  if (!emailRegex.test(value)) {
    return Promise.reject(new Error('请输入有效的邮箱地址'))
  }
  return Promise.resolve()
}// 邮箱验证

watch(() => formState.apps, (nes) => {
  console.log('watch', nes)
}, { deep: true })
</script>

<template>
  <div class="add-user">
    <div class="header">
      <a-button type="primary" @click="() => emit('close', false)">
        <template #icon>
          <RollbackOutlined />
        </template>
        返回
      </a-button>
      <span>{{ current ? '编辑用户' : '新增用户' }}</span>
    </div>
    <a-form ref="formRef" :model="formState" :rules="rules" layout="vertical">
      <a-form-item label="用户名" name="userName" style="width: 35vw;">
        <a-input v-model:value="formState.userName" placeholder="请输入用户名" />
      </a-form-item>

      <a-form-item label="用户邮箱" name="userEmail" style="width: 35vw;">
        <a-input v-model:value="formState.userEmail" placeholder="请输入用户邮箱" />
      </a-form-item>

      <a-form-item label="所属业务组" name="business" style="width: 35vw;">
        <div class="select">
          <Select v-model="formState.business" :options="businessList.map(item => item.business)" />
        </div>
        <span v-if="current" style="font-size:12px;color:grey;">更改业务组不会影响人员APP权限</span>
      </a-form-item>

      <a-form-item label="所属角色" name="role" style="width: 35vw;">
        <a-select v-model:value="formState.role" placeholder="请选择所属角色">
          <a-select-option v-for="item in roleList" :key="item" :value="item">
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="分配APP" name="apps">
        <Shuttle v-model:checked="formState.apps" />
      </a-form-item>
    </a-form>
  </div>
  <div class="footer">
    <a-button type="primary" @click="submitForm">
      确认
    </a-button>
    <a-button @click="() => emit('close', false)">
      取消
    </a-button>
  </div>

  <operateFalse v-model="operationNo" />
</template>

<style scoped lang='scss'>
.header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;

  span {
    font-size: 18px;
    font-weight: bold;
  }

  .ant-btn {
    position: absolute;
    left: 0px;
  }
}

.select {
  width: 100%;
  border: 1px solid #d9d9d9;
  padding: 5px 11px;
  border-radius: 6px;
  height: 32px;
  display: flex;
  align-items: center;

  &:hover {
    border-color: #40a9ff;
  }
}

.select_app {
  width: 100%;
  padding: 0 10px;
  display: flex;

  .left {
    width: 50%;
    max-height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    overflow-x: hidden;

    /* 设置滚动条的宽度 */
    &::-webkit-scrollbar {
      width: 3px;
      /* 水平滚动条的宽度 */
      height: 3px;
      /* 垂直滚动条的高度 */
    }

    /* 设置滚动条轨道的样式 */
    &::-webkit-scrollbar-track {
      background: transparent;
      /* 轨道背景颜色 */
      border-radius: 10px;
      /* 轨道的圆角 */
    }

    /* 设置滚动条滑块的样式 */
    &::-webkit-scrollbar-thumb {
      background: #888;
      /* 滑块颜色 */
      border-radius: 10px;
      /* 滑块的圆角 */
    }

    /* 设置滚动条滑块在悬停时的样式 */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
      /* 悬停时的滑块颜色 */
    }

    .business-apps {
      width: 100%;
      margin-bottom: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;

      .checkbox {
        width: 20vw;
        display: flex;
        align-items: center;
        margin-bottom: 10px;

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

      .extend {
        margin-right: 20px;
        padding-left: 10px;
        border-left: 1px solid #ccc;
        color: #4689d4;
        cursor: pointer;
      }

      .inner-apps {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding-left: 30px;

        .inner-app-details {
          width: 20vw;
          display: flex;
          align-items: center;
          margin-bottom: 10px;

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
      }
    }
  }

  .right {
    width: 50%;
    max-height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    overflow-x: hidden;

    /* 设置滚动条的宽度 */
    &::-webkit-scrollbar {
      width: 3px;
      /* 水平滚动条的宽度 */
      height: 3px;
      /* 垂直滚动条的高度 */
    }

    /* 设置滚动条轨道的样式 */
    &::-webkit-scrollbar-track {
      background: transparent;
      /* 轨道背景颜色 */
      border-radius: 10px;
      /* 轨道的圆角 */
    }

    /* 设置滚动条滑块的样式 */
    &::-webkit-scrollbar-thumb {
      background: #888;
      /* 滑块颜色 */
      border-radius: 10px;
      /* 滑块的圆角 */
    }

    /* 设置滚动条滑块在悬停时的样式 */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
      /* 悬停时的滑块颜色 */
    }

    .title {
      color: grey;
      margin-bottom: 10px;
    }

    .check-app {
      width: 20vw;
      display: flex;
      align-items: center;
      margin-bottom: 10px;

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
  }
}

.footer {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  left: 0px;
  bottom: 0px;
  margin: 0;
  background-color: #fff;
  border-top: 1px solid #e8e8e8;

  .ant-btn {
    &:nth-of-type(2) {
      margin: 0 20px;
    }

    &:last-of-type {
      margin-right: 50px;
    }
  }
}
</style>
