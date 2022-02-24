<template>
  <div>
    <div class="text-center mb-6">
      <div
        class="text-gray-900 font-extrabold text-2xl lg:text-3xl leading-8 mb-2 lg:mb-3"
      >
        Êtes-vous sûr de <br class="hidden sm:block">
        vouloir participer&nbsp;?
      </div>
      <div class="text-gray-500 text-lg lg:text-xl max-w-md mx-auto">
        Vous vous êtes déjà inscrit à
        <strong>{{
          $store.state.auth.user.statistics.new_participations_today
        }}
          missions</strong>
        aujourd'hui&nbsp;: c'est beaucoup&nbsp;! Nous vous recommandons
        d'attendre que les organisations valident vos inscriptions avant de
        candidater à d'autres missions.
      </div>
    </div>

    <div class="max-w-md mx-auto flex flex-col gap-4">
      <Button
        size="xl"
        variant="green"
        rounded
        full
        @click.native="$emit('close')"
      >
        J'attends la validation de mes inscriptions
      </Button>

      <Button
        size="xl"
        variant="white"
        rounded
        full
        @click.native="$emit('next')"
      >
        Je m'inscris quand même
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SoftGateAntiFlood',
  data () {
    return {}
  }
}
</script>
