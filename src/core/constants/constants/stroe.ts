import { ErrorTypeEnum } from '@/constants/enums/exception-enum'

// 异常日志信息
export interface ErrorLogInfo {
  // 异常类型
  type: ErrorTypeEnum
  // 异常文件
  file: string
  // 异常名称
  name?: string
  // 异常信息
  message: string
  // 异常堆栈
  stack?: string
  // 异常详情
  detail: string
  // 异常路径
  url: string
  // 异常时间
  time?: string
}
