<template>
  <div class="space-y-12">
    <Heading as="h2" :level="1" class="mb-8">
      Cards
    </Heading>
    <Heading as="h2" :level="3" class="mb-8">
      Card Statistic
    </Heading>
    <div class="max-w-lg space-y-4">
      <CardStatistic value="2 309" title="Bénévoles recherchés" />
      <CardStatistic value="2 309" title="Bénévoles recherchés" subtitle="En 2021" />
      <CardStatistic value="730" title="Associations" link-label="Organisations" link="https://www.jeveuxaider.gouv.fr" />
      <CardStatistic value="730" title="Associations" gauge-percentage="80" />
    </div>
  </div>
</template>

<script>
import CardStatistic from '@/components/card/CardStatistic'

export default {

  components: {
    CardStatistic
  },
  layout: 'design-system',
  data () {
    return {
      form: {}
    }
  }
}
</script>
