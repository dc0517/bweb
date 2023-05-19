<script lang="tsx">
  import { ref, unref, defineComponent, type PropType, type ExtractPropTypes } from 'vue'
  import { isNil } from 'lodash-es'
  import { Skeleton } from 'ant-design-vue'
  import { CollapseTransition } from '@/components/transition'
  import { useTimeoutFn } from '@/hooks/core/use-timeout'
  import { useDesign } from '@/hooks/web/use-design'
  import { triggerWindowResize } from '@/utils/event'
  import CollapseHeader from './collapse-header.vue'

  const collapseContainerProps = {
    title: { type: String, default: '' },
    loading: { type: Boolean },
    canExpan: { type: Boolean, default: true },
    helpMessage: {
      type: [Array, String] as PropType<string[] | string>,
      default: ''
    },
    triggerWindowResize: { type: Boolean },
    lazyTime: { type: Number, default: 0 }
  }

  export type CollapseContainerProps = ExtractPropTypes<typeof collapseContainerProps>

  export default defineComponent({
    name: 'CollapseContainer',
    props: collapseContainerProps,
    setup(props, { expose, slots }) {
      const { prefixCls } = useDesign('collapse-container')

      const show = ref(true)

      const handleExpand = (val: boolean) => {
        show.value = isNil(val) ? !show.value : val
        if (props.triggerWindowResize) {
          useTimeoutFn(triggerWindowResize, 200)
        }
      }

      expose({ handleExpand })

      return () => (
        <div class={unref(prefixCls)}>
          <CollapseHeader
            {...props}
            prefixCls={unref(prefixCls)}
            onExpand={handleExpand}
            show={show.value}
            v-slots={{
              title: slots.title,
              action: slots.action
            }}
          />

          <div class="p-2">
            <CollapseTransition enable={props.canExpan}>
              {props.loading ? (
                <Skeleton active={props.loading} />
              ) : (
                <div class={`${prefixCls}__body`} v-show={show.value}>
                  {slots.default?.()}
                </div>
              )}
            </CollapseTransition>
          </div>
          {slots.footer && <div class={`${prefixCls}__footer`}>{slots.footer()}</div>}
        </div>
      )
    }
  })
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-collapse-container';

  .@{prefix-cls} {
    background-color: @component-background;
    border-radius: 2px;
    transition: all 0.3s ease-in-out;

    &__header {
      display: flex;
      height: 32px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid @border-color-light;
    }

    &__footer {
      border-top: 1px solid @border-color-light;
    }

    &__action {
      display: flex;
      text-align: right;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
    }
  }
</style>
