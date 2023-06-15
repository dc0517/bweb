<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Button type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record)
            },
            {
              color: 'error',
              label: '删除',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record)
              }
            }
          ]"
        />
      </template>
    </BasicTable>
    <UpdateRole @register="registerDrawer" @success="reload" />
  </div>
</template>

<script lang="ts" setup name="RoleManage">
  import { Button } from 'ant-design-vue'
  import { useDrawer } from '@/components/drawer'
  import { BasicTable, useTable, TableAction } from '@/components/table'
  import { columns, searchFormSchema } from './data'
  import { getRoleList, deleteRoleById } from '@b/services/system-manage/role-manage'
  import UpdateRole from './children/update-role.vue'

  // 注册 role drawer
  const [registerDrawer, { openDrawer: openFormDrawer }] = useDrawer()

  // 注册 role table
  const [registerTable, { reload }] = useTable({
    api: getRoleList,
    columns,
    rowKey: 'id',
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema
    },
    useSearchForm: true,
    pagination: false,
    actionColumn: {
      width: 300,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' }
    }
  })

  // 新增
  const handleCreate = () => {
    openFormDrawer(true, {
      isUpdate: false
    })
  }

  // 编辑
  const handleEdit = (row) => {
    openFormDrawer(true, {
      row,
      isUpdate: true
    })
  }

  // 删除
  const handleDelete = async (row) => {
    await deleteRoleById({ id: row.id })
    reload()
  }
</script>
