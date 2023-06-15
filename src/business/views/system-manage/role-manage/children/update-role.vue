<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" showFooter :title="getTitle" width="500px" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>

<script lang="ts" setup name="UpdateRole">
  import { reactive, ref, computed, unref } from 'vue'
  import { BasicForm, useForm } from '@/components/form/index'
  import { BasicDrawer, useDrawerInner } from '@/components/drawer'
  import { updateRole } from '@b/services/system-manage/role-manage'
  import { formSchema } from '../data'

  const emit = defineEmits(['success'])

  const isUpdate = ref(true)
  var formData = reactive({})

  // 1.创建表单
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false
  })

  // 2.表单内容配置
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    // 2.1加载状态提示...
    setDrawerProps({ confirmLoading: false })
    // 2.2表单重置
    resetFields()
    // 2.3表单数据填充
    formData = { ...data.row }
    // 2.4是否编辑
    isUpdate.value = !!data?.isUpdate
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.row
      })
    }
  })
  // 标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'))
  // 提交
  async function handleSubmit() {
    try {
      const values = await validate()
      setDrawerProps({ confirmLoading: true })
      const saveData = { ...{ id: formData.id }, ...values }
      await updateRole(saveData)
      closeDrawer()
      emit('success')
    } finally {
      setDrawerProps({ confirmLoading: false })
    }
  }
</script>
