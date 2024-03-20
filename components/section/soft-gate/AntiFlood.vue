<template>
  <div>
    <div class="text-center mb-8">
      <DsfrHeading as="div" size="xl" class="mb-2 lg:mb-4">
        Êtes-vous sûr de vouloir participer&nbsp;?
      </DsfrHeading>
      <div class="text-cool-gray-500 max-w-md mx-auto">
        Vous vous êtes déjà inscrit à
        <strong>{{ $stores.auth.user.statistics.new_participations_today }} missions</strong>
        aujourd'hui&nbsp;: c'est beaucoup&nbsp;! Nous vous recommandons d'attendre que les
        organisations valident vos inscriptions avant de candidater à d'autres missions.
      </div>
    </div>

    <div class="text-center mt-8">
      <div>
        <DsfrButton class="w-full" size="lg" @click.native="$emit('close')">
          J'attends la validation de mes inscriptions
        </DsfrButton>
      </div>
      <div class="mt-4">
        <DsfrLink @click.native="$emit('next')" class="text-jva-blue-500">
          Je m'inscris quand même
        </DsfrLink>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  name: 'SoftGateAntiFlood',
})
</script>
