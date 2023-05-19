<template>
  <BasicTable @register="registerTable" />
</template>

<script lang="ts" setup name="LogManage">
  import { BasicTable, useTable } from '@/components/table'
  import { columns, searchFormSchema } from './data'
  // import { getLogList } from '/@/api/request/system-manage'

  const [registerTable] = useTable({
    rowKey: 'id',
    columns,
    useSearchForm: true,
    showTableSetting: false,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true
    },
    dataSource: [
      { id: '1', title: '下发撤回', operUrl: '/api/ssp/dcyd/xf/ch', operIp: '139.224.75.139', errorMsg: '', operTime: '2023-02-28' },
      { id: '2', title: '用户-新增+授权', operUrl: '/api/ssp/dcyd/xf/ch', operIp: '139.224.75.139', errorMsg: '', operTime: '2023-02-28' }
    ]
  })
</script>
