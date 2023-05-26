<template>
  <div>
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Support' },
          { text: `Objectifs & Topitos` },
        ]"
      />
    </portal>

    <div class="space-y-12 mb-24">
      <SectionHeading title="En quoi puis-je vous aider ? 😉" secondary-title="SAV de la plateforme bonjour !" />

      <OverviewReferents ref="overviewReferents" />
      <OverviewResponsables ref="overviewResponsables" />
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import OverviewReferents from '@/components/numbers/OverviewReferents'
import OverviewResponsables from '@/components/numbers/OverviewResponsables'

export default {
  components: {
    Breadcrumb,
    OverviewReferents,
    OverviewResponsables
  },
  layout: 'support',
  data () {
    return {
    }
  },
  methods: {

  }

}
</script>
