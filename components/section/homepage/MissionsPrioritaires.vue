<template>
  <section
    v-if="missions.length > 0"
    class="overflow-hidden xl:mt-6 pb-16"
  >
    <div class="container mx-auto px-8 sm:px-4 xl:max-w-[1412px]">
      <div class="mx-auto max-w-6xl">
        <div class="flex justify-between items-baseline mb-6">
          <h2
            class="text-4xl lg:text-[40px] lg:leading-[42px] tracking-tight text-center md:text-left"
          >
            Les missions de bénévolat
            <strong class="font-extrabold">prioritaires</strong>
          </h2>
          <span
            class="hidden lg:block ml-4 text-[32px] xl:text-[40px] text-[#A7A7B0] font-light"
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
import Slideshow from '@/components/advanced/Slideshow'
import CardMission from '@/components/card/Mission'

export default {
  components: {
    Slideshow,
    CardMission
  },
  data () {
    return {
      missions: []
    }
  },
  async fetch () {
    const { data } = await this.$axios.get('/missions/promoted')
    this.missions = data
  }
}
</script>

<style lang="postcss" scoped>
.card--mission--wrapper {
  @apply !flex flex-col h-full max-w-[323px] rounded-[10px] transition;
  width: calc(100vw - 64px) !important;
  @apply w-full;
}

::v-deep .slick-slider {
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
