<template>
  <div>
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb :links="[{ text: 'Support' }, { text: `Objectifs & Topitos` }]" />
      </Teleport>
    </ClientOnly>

    <div class="space-y-12 mb-24">
      <BaseSectionHeading
        title="En quoi puis-je vous aider ? 😉"
        secondary-title="SAV de la plateforme bonjour !"
      />

      <OverviewReferents ref="overviewReferents" />
      <OverviewResponsables ref="overviewResponsables" />
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import OverviewReferents from '@/components/numbers/OverviewReferents'
import OverviewResponsables from '@/components/numbers/OverviewResponsables'

export default defineNuxtComponent({
  components: {
    Breadcrumb,
    OverviewReferents,
    OverviewResponsables,
  },
  setup() {
    definePageMeta({
      layout: 'support',
      middleware: ['admin'],
    })
  },
  data() {
    return {}
  },
  methods: {},
})
</script>
