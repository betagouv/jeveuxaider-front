<template>
  <component :is="as">
    <span
      class="wysiwyg-field read-more--content"
      v-html="formattedString"
    />

    <span v-if="text.length > maxChars">
      <span
        v-if="!isExpanded"
        :class="moreClass"
        @click="triggerReadMore($event, true)"
      >
        {{ moreStr }}
      </span>
      <span v-if="isExpanded" @click="triggerReadMore($event, false)">
        {{ lessStr }}
      </span>
    </span>
  </component>
</template>

<script>
import clip from 'text-clipper'

export default {
  props: {
    moreClass: {
      type: String,
      default: 'cursor-pointer uppercase font-bold text-sm text-[#242526]'
    },
    moreStr: {
      type: String,
      default: 'Lire plus'
    },
    lessStr: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      required: true
    },
    maxChars: {
      type: Number,
      default: 100
    },
    as: {
      type: String,
      default: 'div'
    }
  },
  data () {
    return {
      isExpanded: false
    }
  },
  computed: {
    formattedString () {
      let valContainer = this.text
      if (!this.isExpanded && this.text.length > this.maxChars) {
        valContainer = valContainer.substring(0, this.maxChars) + '...'
      }
      return valContainer
    }
  },
  methods: {
    triggerReadMore (e, b) {
      if (this.lessStr !== null || this.lessStr !== '') { this.isExpanded = b }
    }
  }
}
</script>

<style lang="postcss" scoped>
.read-more--content {
  ::v-deep p:last-child {
    display: inline;
  }
}
</style>
