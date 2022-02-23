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
          $store.getters.user.nbTodayParticipationsOnPendingValidation
        }}
          missions</strong>
        aujourd'hui&nbsp;: c'est beaucoup&nbsp;! Nous vous recommandons
        d'attendre que les organisations valident vos inscriptions avant de
        candidater à d'autres missions.
      </div>
    </div>

    <div class="max-w-md mx-auto">
      <el-button
        class="!font-bold !w-full !flex !items-center !justify-center !px-5 !py-4 !border !border-transparent !text-lg !leading-6 !rounded-full !text-white !bg-jva-green hover:!bg-[#0e9f6e] focus:!outline-none focus:!ring !transition !whitespace-normal"
        @click.prevent="$emit('close')"
      >
        J'attends la validation de mes inscriptions
      </el-button>

      <el-button
        class="!mt-4 !mx-0 !font-bold !w-full !flex !items-center !justify-center !px-5 !py-4 !border !border-transparent !text-lg !leading-6 !rounded-full !text-gray-500 !bg-white hover:!bg-gray-200 focus:!outline-none focus:!ring !transition !shadow-md"
        @click.prevent="$emit('next')"
      >
        Je m'inscris quand même
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SoftGateTooManyParticipations',
  data () {
    return {}
  }
}
</script>
