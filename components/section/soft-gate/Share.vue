<template>
  <div>
    <div class="text-center mb-6">
      <div
        class="text-gray-900 font-extrabold text-2xl lg:text-3xl leading-8 mb-2 lg:mb-3"
      >
        Votre candidature est enregistrée
      </div>
      <div
        class="text-gray-500 font-semibold text-lg lg:text-xl max-w-md mx-auto"
      >
        Et si vous invitiez vos proches à participer eux aussi à cette mission ?
      </div>
    </div>
    <div class="">
      <div class="text-xl font-semibold text-center">
        Partagez la mission autour de vous
      </div>
      <div class="flex justify-center space-x-3 my-10">
        <ShareFacebook />
        <ShareTwitter :message="message" />
        <ShareLinkedin :message="message" />
        <ShareMail
          :subject="$store.getters.missionSelected.name"
          :message="message"
        />
      </div>
      <el-button
        class="!font-bold !text-gray-500 !max-w-sm !mx-auto !w-full !flex !items-center !justify-center !px-5 !py-3 !border !border-transparent !text-xl !leading-6 !rounded-full !bg-white focus:!outline-none focus:!ring !shadow-lg hover:!scale-105 !transform !transition !will-change-transform hover:!text-[#070191]"
        @click.prevent="onSkip"
      >
        Passer
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SoftGateShare',
  data () {
    return {
      message:
        "J'ai trouvé ma future mission de bénévolat sur JeVeuxAider. Rejoignez le mouvement %23ChacunPourTous ",
      baseUrl: this.$config.appUrl
    }
  },
  methods: {
    onSkip () {
      this.$emit('next')
    }
  }
}
</script>
