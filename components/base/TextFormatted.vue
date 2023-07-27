<template>
  <div v-if="text">
    <div
      v-snip="{ lines, onSnipped }"
      class="break-word whitespace-pre-line overflow-hidden formatted-text"
    >
      <div v-html="text" />
    </div>
    <Link
      v-if="hasEllipsis"
      class="text-jva-blue-500 mt-4"
      @click.stop.native="readMore()"
    >
      {{ readMoreLabel }}
    </Link>
  </div>
</template>

<script>
// import clip from 'text-clipper'
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
    },
    readMoreLabel: {
      type: String,
      default: 'En lire plus'
    }
  },
  data () {
    return {
      hasEllipsis: false,
      showAll: false
    }
  },
  computed: {
    lines () {
      return this.showAll ? 0 : this.maxLines
    }
  },
  methods: {
    onSnipped (newState) {
      this.hasEllipsis = newState.hasEllipsis
    },
    readMore () {
      this.showAll = true
    }
  }
}
</script>
