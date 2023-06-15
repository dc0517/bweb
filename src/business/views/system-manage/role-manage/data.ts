import { BasicColumn, FormSchema } from '@/components/table'

const RoleTypeObj = {
  '11': '省级管理员',
  '12': '市级管理员',
  '13': '县级管理员'
}

const roleTypeList = Object.keys(RoleTypeObj).map((item) => {
  return { label: RoleTypeObj[item], value: item }
})

// table 列
export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'name'
  },
  {
    title: '角色编号',
    dataIndex: 'code'
  },
  {
    title: '角色类型',
    dataIndex: 'type',
    customRender: ({ record }) => {
      return RoleTypeObj[record.roleType]
    }
  }
]

// 搜索表单
export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '',
    component: 'InputSearch',
    colProps: { span: 4 },
    componentProps: ({ formActionType }) => {
      return {
        placeholder: '请输入关键字',
        onSearch: async () => {
          const { submit } = formActionType
          submit()
        }
      }
    }
  }
]

// 新增/编辑 表单
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
    required: true
  },
  {
    field: 'code',
    label: '角色编号',
    component: 'Input',
    required: true
  },
  {
    field: 'type',
    label: '角色类型',
    component: 'Select',
    defaultValue: roleTypeList[0].value,
    componentProps: {
      options: roleTypeList
    }
  }
]
