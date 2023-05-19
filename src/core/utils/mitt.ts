// 事件类型
export type EventType = string | symbol
// 事件处理程序可选的事件参数
export type Handler<T = any> = (event?: T) => void
// 通配符处理
export type WildcardHandler = (type: EventType, event?: any) => void
// 当前注册事件处理程序的数组
export type EventHandlerList = Array<Handler>
// 通配符事件处理程序列表
export type WildCardEventHandlerList = Array<WildcardHandler>
// 事件类型及其对应的事件处理程序的映射
export type EventHandlerMap = Map<EventType, EventHandlerList | WildCardEventHandlerList>

export interface Emitter {
  all: EventHandlerMap
  on<T = any>(type: EventType, handler: Handler<T>): void
  on(type: '*', handler: WildcardHandler): void
  off<T = any>(type: EventType, handler: Handler<T>): void
  off(type: '*', handler: WildcardHandler): void
  emit<T = any>(type: EventType, event?: T): void
  emit(type: '*', event?: any): void
  clear(): void
}

/**
 * Mitt: Tiny (~200b) functional event emitter / pubsub.
 * @name mitt
 * @returns {Mitt}
 */
export default function mitt(all?: EventHandlerMap): Emitter {
  all = all || new Map()

  return {
    /**
     * 事件名称到已注册处理程序函数的映射.
     */
    all,
    /**
     * 为给定类型注册一个事件处理程序
     * @param {string|symbol} type 要监听的事件类型，“*”表示所有事件
     * @param {Function} handler 函数调用以响应给定事件
     * @memberOf mitt
     */
    on<T = any>(type: EventType, handler: Handler<T>) {
      const handlers = all?.get(type)
      const added = handlers && handlers.push(handler)
      if (!added) {
        all?.set(type, [handler])
      }
    },
    /**
     * 删除给定类型的事件处理程序
     * @param {string|symbol} type 要移除的事件类型，“*”表示所有事件
     * @param {Function} handler 移除程序函数
     * @memberOf mitt
     */
    off<T = any>(type: EventType, handler: Handler<T>) {
      const handlers = all?.get(type)
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1)
      }
    },
    /**
     * 调用给定类型的所有处理程序
     * 如果存在，则在类型匹配的处理程序之后调用"*"处理程序
     * 注意:不支持手动触发"*"处理程序.
     *
     * @param {string|symbol} type 事件类型
     * @param {Any} [evt] 传递给每个处理程序
     * @memberOf mitt
     */
    emit<T = any>(type: EventType, evt: T) {
      ;((all?.get(type) || []) as EventHandlerList).slice().map((handler) => {
        handler(evt)
      })
      ;((all?.get('*') || []) as WildCardEventHandlerList).slice().map((handler) => {
        handler(type, evt)
      })
    },
    /**
     * 清除所有
     */
    clear() {
      this.all.clear()
    }
  }
}
