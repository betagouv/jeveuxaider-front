<template>
  <section
    v-if="missions.length > 0"
    class="overflow-hidden xl:mt-6 pb-16"
  >
    <div class="container mx-auto px-8 sm:px-4 ">
      <div class="mx-auto max-w-6xl">
        <div class="flex justify-between items-baseline mb-12">
          <Heading as="h2" size="2xl" class="text-center md:text-left">
            Les missions de bénévolat prioritaires
          </Heading>
          <span
            class="hidden lg:block ml-4 text-[32px] xl:text-[40px] text-[#A7A7B0]"
          >
            #{{ $dayjs(Date.now()).format('MMMM') }}
          </span>
        </div>

        <Slideshow
          :slides-are-links="true"
          :more-link="{
            link: '/missions-benevolat?toggle[is_priority]=true',
            label: 'Plus de missions ›',
          }"
          :slides-count="missions.length"
        >
          <div key="decembre" href="" class="card--mission--wrapper">
            <CardDecembreEnsemble class="!h-full" />
          </div>

          <nuxt-link
            v-for="mission in missions"
            :key="mission.id"
            class="card--mission--wrapper"
            :to="`/missions-benevolat/${mission.id}/${mission.slug}`"
          >
            <CardMission :mission="mission" class="!h-full" />
          </nuxt-link>
        </Slideshow>
      </div>
    </div>
  </section>
</template>

<script>
import CardMission from '@/components/card/CardMission'
import CardDecembreEnsemble from '@/components/card/CardDecembreEnsemble'
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    CardMission,
    CardDecembreEnsemble,
    Heading
  },
  data () {
    return {
      missions: []
    }
  },
  async fetch () {
    const { data: missions } = await this.$axios.get('/missions/prioritaires?filter[available]=true')
    this.missions = missions.data
  }
}
</script>

<style lang="postcss" scoped>
.card--mission--wrapper {
  @apply !flex flex-col h-full max-w-[323px] transition;
  width: calc(100vw - 64px) !important;
  @apply w-full;
}

:deep(.slick-slider) {
  .slick-arrow {
    &.slick-prev {
      @apply translate-x-[-104px];
    }
    &.slick-next {
      @apply translate-x-[104px];
    }
  }
}
</style>
