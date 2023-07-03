<template>
  <div>
    <div class="text-xl text-[#ED7A5A] font-bold uppercase mb-4">
      Le bénévolat et vous
    </div>
    <div class="text-[56px] text-black font-bold mb-12 leading-tight">
      Trouvez en quelques clics votre prochaine mission de bénévolat
    </div>
    <div class="flex items-center gap-8">
      <Button
        size="lg"
        icon="RiArrowRightLine"
        icon-position="right"
        @click.native="$store.commit('quiz/nextStep')"
      >
        Suivez le guide
      </Button>
      <div class="text-[#666666] text-xl">
        Plus de <span class="font-bold">15 000 missions disponibles</span>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Button
  },
  props: {

  },
  created () {
    // console.log('route', this.$route)
  }
}
</script>

<style>

</style>
