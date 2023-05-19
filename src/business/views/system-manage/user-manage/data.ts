import { BasicColumn, FormSchema } from '@/components/table'

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'title'
  },
  {
    title: '接口',
    dataIndex: 'operUrl'
  },
  {
    title: 'IP',
    dataIndex: 'operIp'
  },
  {
    title: '错误信息',
    dataIndex: 'errorMsg'
  },
  {
    title: '操作时间',
    dataIndex: 'operTime'
  }
]

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
