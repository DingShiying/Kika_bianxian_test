<script setup lang='ts' name='addRole'>
import { onMounted, reactive, ref } from 'vue'
import { RollbackOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

interface FormState {
  strategyName: string
  load_strategy: number | undefined
  status: boolean
} // 表单数据类型

const { current } = defineProps(['current'])
const emit = defineEmits(['close'])

const formRef = ref()// 表单引用
const formState: FormState = reactive(current || {
  strategyName: '',
  load_strategy: undefined,
  status: true,
})// 表单数据
const rules: any = {
  strategyName: [{ required: true, message: '加载策略值名称不能为空', trigger: 'blur', type: 'string' }],
  load_strategy: [{ required: true, message: '加载策略值不能为空', trigger: 'blur', type: 'number' }],
}// 表单验证规则

function handleOk() {
  formRef.value.validate().then(() => {
    console.log(formState)
    message.success('新建加载策略成功！')
    emit('close', false)
  }).catch((err: any) => {
    message.warning('请按要求填写表单！')
    console.error(err)
  })
}// 表单提交
function handleCancel() {
  emit('close', false)
}// 表单取消
</script>

<template>
  <div class="add-role">
    <div class="header">
      <a-button type="primary" @click="handleCancel">
        <template #icon>
          <RollbackOutlined />
        </template>
        返回
      </a-button>
      <span>{{ current ? '编辑分散加载策略' : '新增分散加载策略' }}</span>
    </div>
    <a-form
      ref="formRef" :model="formState" :rules="rules" layout="vertical"
      class="form-part"
    >
      <a-form-item label="加载策略名称" name="strategyName" style="width: 35vw;">
        <a-input v-model:value="formState.strategyName" placeholder="请输入加载策略名称" />
      </a-form-item>

      <a-form-item label="加载策略值" name="load_strategy" style="width: 35vw;">
        <a-input
          v-model:value="formState.load_strategy" placeholder="请输入加载策略值" type="number"
        />
      </a-form-item>

      <a-form-item label="开启状态" name="status">
        <a-switch v-model:checked="formState.status" />
      </a-form-item>
    </a-form>
  </div>
  <div class="footer">
    <a-button type="primary" @click="handleOk">
      确认创建
    </a-button>
    <a-button @click="handleCancel">
      取消
    </a-button>
  </div>
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
