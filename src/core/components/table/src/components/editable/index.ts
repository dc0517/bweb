import type { BasicColumn } from '@/components/table/src/types/table'
import { h, Ref } from 'vue'
import { isArray } from '@/utils/is'
import EditableCell from './editable-cell.vue'

interface Params {
  text: string
  record: Recordable
  index: number
}

export function renderEditCell(column: BasicColumn) {
  return ({ text: value, record, index }: Params) => {
    record.onValid = async () => {
      if (isArray(record?.validCbs)) {
        const validFns = (record?.validCbs || []).map((fn) => fn())
        const res = await Promise.all(validFns)
        return res.every((item) => !!item)
      } else {
        return false
      }
    }

    record.onEdit = async (edit: boolean, submit = false) => {
      if (!submit) {
        record.editable = edit
      }

      if (!edit && submit) {
        if (!(await record.onValid())) return false
        const res = await record.onSubmitEdit?.()
        if (res) {
          record.editable = false
          return true
        }
        return false
      }
      // cancel
      if (!edit && !submit) {
        record.onCancelEdit?.()
      }
      return true
    }

    return h(EditableCell, {
      value,
      record,
      column,
      index
    })
  }
}

export type EditRecordRow<T = Recordable> = Partial<
  {
    editable: boolean
    submitCbs: Fn[]
    cancelCbs: Fn[]
    validCbs: Fn[]
    editValueRefs: Recordable<Ref>
    onCancel: Fn
    onSubmit: Fn
    onEdit: (editable: boolean, submit?: boolean) => Promise<boolean>
    onValid: () => Promise<boolean>
  } & T
>
