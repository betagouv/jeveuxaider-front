<template>
  <div>
    <div class="text-center mb-8">
      <Heading as="div" size="lg" class="mb-2 lg:mb-4">
        Êtes-vous sûr de <br class="hidden sm:block">
        vouloir participer&nbsp;?
      </Heading>
      <div class="text-cool-gray-500 max-w-md mx-auto">
        Vous vous êtes déjà inscrit à
        <strong>{{ $store.state.auth.user.statistics.new_participations_today }} missions</strong>
        aujourd'hui&nbsp;: c'est beaucoup&nbsp;! Nous vous recommandons d'attendre que les organisations valident vos inscriptions avant de
        candidater à d'autres missions.
      </div>
    </div>

    <div class="max-w-md mx-auto flex flex-col gap-4">
      <Button
        size="lg"
        @click.native="$emit('close')"
      >
        J'attends la validation de mes inscriptions
      </Button>

      <Button
        size="lg"
        type="secondary"
        @click.native="$emit('next')"
      >
        Je m'inscris quand même
      </Button>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  name: 'SoftGateAntiFlood',
  components: {
    Heading,
    Button
  },
  data () {
    return {}
  }
}
</script>
