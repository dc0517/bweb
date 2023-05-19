import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

/**
 * 日期格式化 【YYYY-MM-DD HH:mm:ss】
 * @param date
 * @param format
 * @returns
 */
export function formatToDateTime(date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format)
}
/**
 * 日期格式化 【YYYY-MM-DD】
 * @param date
 * @param format
 * @returns
 */
export function formatToDate(date?: dayjs.ConfigType, format = DATE_FORMAT): string {
  return dayjs(date).format(format)
}

export const dateUtil = dayjs
