<template>
  <input
    v-model="value"
    :class="[
      'inner-border border-none rounded-t',
      {'error': error},
      {'success': success}
    ]"
    placeholder="Votre adresse électronique (ex. : nom@domaine.fr)"
    @input="$emit('input', value)"
  >
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'md',
      validator: s => ['md', 'lg'].includes(s)
    },
    error: {
      type: Boolean,
      default: null
    },
    success: {
      type: Boolean,
      default: null
    }
  },
  data () {
    return {
      value: null
    }
  }
}
</script>

<style lang="postcss" scoped>
.inner-border {
  box-shadow: inset 0 -2px 0 0 #000091;
  &.error {
    box-shadow: inset 0 -2px 0 0 #CE0500;
  }
  &.success {
    box-shadow: inset 0 -2px 0 0 #18753C;
  }
}

input {
  outline: none;
  &:focus-visible {
    outline-style: solid;
    outline-color: #0a76f6;
    outline-width: 2px;
    outline-offset: 2px;
  }
}

</style>
