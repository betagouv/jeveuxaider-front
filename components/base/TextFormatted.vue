<template>
  <div>
    <div
      class="break-word whitespace-pre-line overflow-hidden formatted-text leading-7"
      v-html="isExpanded ? text : textHtml"
    />
    <Link
      v-if="needClip && !isExpanded"
      class="text-jva-blue-500 mt-4"
      @click.stop.native="readMore()"
    >
      Lire plus
    </Link>
  </div>
</template>

<script>
import clip from 'text-clipper'
import Link from '@/components/dsfr/Link.vue'

export default {
  components: {
    Link
  },
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
