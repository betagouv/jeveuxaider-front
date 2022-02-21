<template>
  <div class="wrapper">
    <ckeditor
      :editor="editor"
      :value="value"
      :config="editorConfig"
      :disabled="disabled"
      @input="(ev) => $emit('input', ev)"
    />
  </div>
</template>

<script>
let ClassicEditor
let CKEditor

if (process.client) {
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
  CKEditor = require('@ckeditor/ckeditor5-vue2')
} else {
  CKEditor = { component: { template: '<div></div>' } }
}

export default {
  name: 'RichEditor',
  components: {
    ckeditor: CKEditor.component
  },
  props: {
    value: {
      type: String,
      default: null
    },
    withHeading: {
      type: Boolean,
      default: false
    },
    toolbar: {
      type: Array,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      editor: ClassicEditor,
      editorConfig: {
        placeholder: this.placeholder,
        mediaEmbed: {
          isEnabled: false,
          removeProviders: [
            'youtube',
            'dailymotion',
            'vimeo',
            'spotify',
            'twitter',
            'googleMaps',
            'flickr',
            'facebook'
          ]
        },
        toolbar: this.toolbar ?? [
          this.withHeading ? 'heading' : false,
          'bold',
          'italic',
          '|',
          'link',
          'bulletedList',
          'numberedList'
        ],
        link: {
          decorators: {
            addTargetToExternalLinks: {
              mode: 'automatic',
              callback: url => /^(https?:)?\/\//.test(url),
              attributes: {
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            }
          }
        },
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph'
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2'
            },
            {
              model: 'heading3',
              view: 'h3',
              title: 'Heading 3',
              class: 'ck-heading_heading3'
            }
          ]
        }
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.wrapper {
  ::v-deep .ck-content {
    padding: 6px 1.5rem !important;
    @apply text-sm;
    a {
        @apply underline
    }
    ul,
    ol {
        @apply pb-6 pl-6;
        li {
        @apply leading-6
        }
    }
    ul {
        list-style: disc;
    }
    ol {
        list-style: decimal;
    }
    &.ck-read-only {
        background-color: #f5f5f5 !important;
        @apply cursor-not-allowed;
    }
    p:not(:last-child) {
      @apply mb-4
    }
  }
}
</style>
