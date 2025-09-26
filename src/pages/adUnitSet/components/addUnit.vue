<script setup lang='ts' name='addUnit'>
import { computed, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { RollbackOutlined } from '@ant-design/icons-vue'
import { getUnitDataById } from '~@/api/adUnit/getunitbyid'
import operateFalse from '~@/components/base-loading/operateFalse.vue'
import { addUnit } from '~@/api/adUnit/addunit'
import { updateUnit } from '~@/api/adUnit/updateunit'

// 类型声明
interface FormState {
  id?: number
  unitName: string
  json: {
    value: string
    format: number | undefined
    source: string | undefined
  }
}// 表单数据类型

// 父组件传参
const { current, update } = defineProps(['current', 'update'])
const emit = defineEmits(['close'])

// 表单相关属性
const formRef = ref()// 表单引用
const formState = reactive<FormState>({
  unitName: '',
  json: {
    value: '',
    format: undefined,
    source: undefined,
  },
})// 表单数据
const rules: any = {
  unitName: [{ required: true, message: '广告单元name不能为空', trigger: 'blur', type: 'string' }],
  // value: [{ required: true, message: '广告单元value不能为空', trigger: 'blur', type: 'string' }],
  // format: [{ required: true, message: '请选择广告源', trigger: 'blur', type: 'string' }],
  // source: [{ required: true, message: '请选择广告样式', trigger: 'blur', type: 'number' }],
}// 表单验证规则

// 事件反馈相关变量
const operationNo = ref(false) // 操作失败

// 广告类型和来源数据
const { formats, sources } = useUserStore()
const filter_formats = computed(() => {
  if (formState.json.source === 'AdMob') {
    return formats.filter(item => item.value !== 7)
  }
  else if (formState.json.source === 'MAX') {
    return formats
  }
  else {
    return formats.filter(item => item.value !== 6 && item.value !== 7 && item.value !== 8 && item.value !== 11)
  }
})

// 表单相关函数
function handleOk() {
  formRef.value.validate().then(async () => {
    if (!update) {
      await addUnit(formState)
      emit('close', { state: true, id: formState.json.value })
    }
    else {
      // @ts-expect-error:...
      await updateUnit(formState)
      emit('close', { state: true, id: formState.json.value })
    }
  }).catch((err: any) => {
    console.log('err', err)
    if (err.name !== 'AxiosError') {
      message.warning('请按照要求填写表单！')
    }
    else {
      operationNo.value = true
    }
  })
}// 表单提交
function handleCancel() {
  emit('close', { state: false })
}// 取消

function getUnitData() {
  getUnitDataById({ id: current }).then((res: any) => {
    const data = res.data
    for (const key in formState) {
      if (key !== 'json') {
        // @ts-expect-error:...
        formState[key] = data[key]
      }
      else {
        for (const key1 in formState.json) {
          // @ts-expect-error:...
          formState.json[key1] = data.json[key1]
        }
      }
    }
    if (update) {
      formState.id = current
    }
  })
}
if (current) {
  getUnitData()
}

watch(() => formState.json.source, () => {
  formState.json.format = undefined
})
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
      <span>{{ current ? '编辑广告单元' : '新增广告单元' }}</span>
    </div>
    <a-form
      ref="formRef" :model="formState" :rules="rules"
      class="form-part" :label-col="{ style: { width: '150px' } }"
    >
      <a-form-item label="广告单元name" name="unitName">
        <a-input v-model:value="formState.unitName" placeholder="请输入广告单元name" style="width:30vw;" />
      </a-form-item>
      <a-form-item label="广告单元value" name="value">
        <a-input v-model:value="formState.json.value" placeholder="请输入广告单元value" style="width:30vw;" />
      </a-form-item>
      <a-form-item label="广告源" name="source">
        <a-select
          v-model:value="formState.json.source" placeholder="请选择广告源"
          :options="sources" style="width:30vw;"
        />
      </a-form-item>
      <a-form-item label="广告样式" name="format">
        <a-select
          v-model:value="formState.json.format" placeholder="请选择广告样式"
          :options="filter_formats" style="width:30vw;"
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
