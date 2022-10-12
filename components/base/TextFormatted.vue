<template>
  <div class="overflow-hidden">
    <div
      class="break-word whitespace-pre-line"
      v-html="isExpanded ? text : textHtml"
    />
    <div
      v-if="needClip && !isExpanded"
      class="uppercase text-black text-sm font-semibold cursor-pointer"
      @click="readMore()"
    >
      Lire plus
    </div>
  </div>
</template>

<script>
import clip from 'text-clipper'

export default {
  props: {
    text: {
      type: String,
      default: null
    },
    maxLines: {
      type: [Number, Boolean],
      default: false
    }
  },
  data () {
    return {
      isExpanded: false
    }
  },
  computed: {
    textHtml () {
      return this.maxLines ? clip(this.text, undefined, { html: true, maxLines: this.maxLines }) : this.text
    },
    needClip () {
      return this.textHtml && this.textHtml !== this.text
    }
  },
  methods: {
    readMore () {
      this.isExpanded = true
    }
  }
}
</script>

<style lang="postcss" scoped>
:deep(p:not(:last-child)) {
  @apply mb-4
}
:deep(ol) {
    list-style: decimal;
    @apply mb-4 pl-4
}
:deep(ul) {
    list-style: disc;
    @apply mb-4 pl-4 space-y-4
}
</style>
