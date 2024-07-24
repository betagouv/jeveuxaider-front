<template>
  <textarea
    ref="textareaRef"
    v-model="value"
    :style="computedStyles"
    @focus="resize"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  nextTick,
  CSSProperties,
  onMounted,
  PropType,
  onUpdated,
} from 'vue'

type CssAttribs = 'resize' | 'overflow' | 'height'

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    autosize: {
      type: Boolean,
      default: true,
    },
    minHeight: {
      type: [Number],
      required: false,
    },
    maxHeight: {
      type: [Number],
      required: false,
    },
    important: {
      type: [Boolean, Array] as PropType<CssAttribs[] | boolean>,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    const height = ref('0')
    const textareaRef = ref()
    const maxHeightScroll = ref(false)
    const value = ref(props.modelValue)

    const isImportantAttr = (attr: CssAttribs) => {
      return (
        props.important === true ||
        (Array.isArray(props.important) && props.important.includes(attr))
      )
    }

    const computedStyles = computed<CSSProperties | undefined>(() => {
      if (!props.autosize) {
        return undefined
      }

      return {
        resize: !isImportantAttr('resize') ? 'none' : 'none !important',
        height: height.value,
        overflow: maxHeightScroll.value
          ? 'auto'
          : !isImportantAttr('overflow')
          ? 'hidden'
          : 'hidden !important',
      } as CSSProperties // !important is not always allowed for `CSSProperties`
    })

    const resize = () => {
      const important = isImportantAttr('height') ? 'important' : ''
      height.value = `auto${important ? ' !important' : ''}`

      nextTick(() => {
        let contentHeight = textareaRef.value.scrollHeight + 1
        if (props.minHeight) {
          contentHeight =
            contentHeight < props.minHeight ? props.minHeight : contentHeight
        }
        if (props.maxHeight) {
          if (contentHeight > props.maxHeight) {
            contentHeight = props.maxHeight
            maxHeightScroll.value = true
          } else {
            maxHeightScroll.value = false
          }
        }
        const heightVal = `${contentHeight}px`
        height.value = `${heightVal}${important ? ' !important' : ''}`
      })
    }

    onMounted(() => {
      resize()
    })

    return {
      textareaRef,
      resize,
      computedStyles,
      value,
      maxHeightScroll: false,
      height: 'auto',
    }
  },
  watch: {
    modelValue(val) {
      this.value = val
      this.$nextTick(this.resize)
      this.$emit('update:modelValue', val)
    },
    value(val) {
      this.$nextTick(this.resize)
      this.$emit('update:modelValue', val)
    },
    minHeight() {
      this.$nextTick(this.resize)
    },
    maxHeight() {
      this.$nextTick(this.resize)
    },
    autosize(val) {
      if (val) this.resize()
    },
  },
})
</script>
