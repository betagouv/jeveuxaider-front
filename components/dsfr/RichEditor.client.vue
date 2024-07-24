<template>
  <div :class="['wrapper', { 'border-[#E5E5E5]': disabled }, { 'border-[#3A3A3A]': !disabled }]">
    <template v-if="disabled">
      <div class="ck-content ck-read-only" v-html="modelValue" />
    </template>
    <ckeditor.component
      v-else
      :disabled="disabled"
      :editor="ClassicEditor"
      :config="editorConfig"
      :modelValue="modelValue"
      @update:modelValue="(ev) => $emit('update:modelValue', ev)"
    />
  </div>
</template>

<script setup>
import ckeditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import List from '@ckeditor/ckeditor5-list/src/list'
import Link from '@ckeditor/ckeditor5-link/src/link'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'

const props = defineProps({
  modelValue: String,
  disabled: Boolean,
  name: String,
  toolbar: Array,
  placeholder: String,
})
const { modelValue, disabled, toolbar, placeholder } = toRefs(props)

const editorConfig = {
  placeholder: placeholder.value ?? '',
  plugins: [Essentials, Paragraph, Bold, Italic, List, Link, Autoformat],
  toolbar: toolbar.value?.length
    ? toolbar.value
    : ['bold', 'italic', '|', 'bulletedList', 'numberedList'],
  link: {
    decorators: {
      addTargetToExternalLinks: {
        mode: 'automatic',
        callback: (url) => /^(https?:)?\/\//.test(url),
        attributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      },
    },
  },
  heading: {
    options: [
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: 'ck-heading_paragraph',
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2',
      },
      {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3',
      },
    ],
  },
}
</script>

<style lang="postcss" scoped>
.wrapper {
  @apply border-b-2;
  :deep(.ck-content) {
    background: #eeeeee;
    @apply text-sm border-0;
    a {
      @apply underline;
    }
    ul,
    ol {
      @apply pb-6 pl-6;
      li {
        @apply leading-6;
      }
    }
    ul {
      list-style: disc;
    }
    ol {
      list-style: decimal;
    }
    &:not(.ck-read-only) {
      padding: 6px 1.5rem !important;
    }
    &.ck-read-only {
      @apply rounded-t p-6 text-[#666666] cursor-not-allowed;
    }
    p:not(:last-child) {
      @apply mb-4;
    }
    &.ck-focused {
      margin: -2px;
    }
  }
  :deep(.ck-sticky-panel) {
    @apply rounded-t overflow-hidden;
  }
  :deep(.ck-toolbar) {
    background: #f6f6f6;
    @apply border-0;
  }
}
</style>
