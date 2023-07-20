<template>
  <Nuxt class="min-h-screen bg-white" />
</template>

<script>
import MixinPlausible from '@/mixins/plausible.js'

export default {
  name: 'QuizLayout',
  mixins: [MixinPlausible]
}
</script>
