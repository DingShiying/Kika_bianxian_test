<script setup lang='ts' name='addOID'>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { RollbackOutlined } from '@ant-design/icons-vue'

interface FormState {
  oid: string
  desc: string
  format: number | undefined
}// 表单数据类型

const { current } = defineProps(['current'])
const emit = defineEmits(['close'])

const response = ref({
  format: [
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
  ],
})// 请求接口数据

const formRef = ref()// 表单引用
const formState: FormState = reactive(current || {
  oid: '',
  desc: '',
  format: undefined,
})// 表单数据

const rules: any = {
  oid: [{ required: true, message: 'OID不能为空', trigger: 'blur', type: 'string' }],
  format: [{ required: true, message: '请选择一个广告样式', trigger: 'blur', type: 'number' }],
}// 表单验证规则

function handleOk() {
  formRef.value.validate().then(() => {
    console.log(formState)
    // message.success('新建广告单元成功！')
    emit('close', true)
  }).catch((err: any) => {
    message.warning('请按要求填写表单！')
    console.error(err)
  })
}// 表单提交
function handleCancel() {
  emit('close', false)
}
</script>

<template>
  <div class="add-businerss">
    <div class="header">
      <a-button type="primary" @click="handleCancel">
        <template #icon>
          <RollbackOutlined />
        </template>
        返回
      </a-button>
      <span>{{ current ? '编辑OID' : '新增OID' }}</span>
    </div>
    <a-form
      ref="formRef" :model="formState" :rules="rules" layout="vertical"
      class="form-part" :label-col="{ style: { width: '150px' } }"
    >
      <a-form-item label="OID" name="oid">
        <a-input v-model:value="formState.oid" placeholder="请输入OID" style="width:30vw;" />
      </a-form-item>
      <a-form-item label="描述" name="desc">
        <a-input v-model:value="formState.desc" placeholder="请输入描述" style="width:30vw;" />
      </a-form-item>
      <a-form-item label="广告样式" name="format">
        <a-select
          v-model:value="formState.format" placeholder="请选择广告样式"
          :options="response.format" style="width:30vw;"
        />
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

.form-part{
  min-height: 55vh;
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
