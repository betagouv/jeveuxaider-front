<template>
  <div>
    <Heading as="h2" :level="3">
      {{ title }}
    </Heading>
    <div v-if="subtitle || showPeriod" class="text-gray-400 font-semibold">
      <template v-if="showPeriod">
        {{ $store.state.statistics.params.period | label('statistics_period') }}
      </template>
      <template v-else>
        {{ subtitle }}
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: null
    },
    showPeriod: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>
