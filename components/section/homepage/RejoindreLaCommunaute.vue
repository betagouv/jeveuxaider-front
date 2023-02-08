<template>
  <div
    class="px-6 pt-10 pb-12 lg:px-8 lg:py-12 xl:px-14 xl:py-12 bg-white shadow-xl relative overflow-hidden"
  >
    <img
      src="/images/homepage/rejoindre_communaute.svg"
      alt=""
      class="flex absolute bottom-0 right-0 transform w-[152px] sm:w-[243px] md:w-[350px] xl:w-auto"
    >

    <div class="relative">
      <Heading as="h2" size="2xl" class="mb-8">
        Rejoignez la communauté
      </Heading>

      <p class="max-w-md lg:max-w-xl xl:max-w-[700px] text-lg sm:text-xl text-[#696974]">
        Devenez ambassadeur de l’engagement près de chez vous&nbsp;! <br class="hidden xl:block">Rejoignez notre groupe de bénévoles engagés et motivés pour partager, s'inspirer, mobiliser et agir chacun pour tous.&nbsp;💪
      </p>

      <nuxt-link
        to="/missions-benevolat/13190/benevolat-jeveuxaidergouvfr-paris"
        class="xl:absolute right-[19.75%] bottom-0"
      >
        <!-- @click="$router.push('/missions-benevolat/13190/benevolat-jeveuxaidergouvfr-paris')" -->
        <Button class="mt-10 xl:mt-0" size="lg">
          Rejoindre le groupe
        </Button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Heading,
    Button
  },
  data () {
    return {}
  }
}
</script>
