<template>
  <div class="">
    <div class="p-4 text-[40px] font-bold mt-8 leading-10 text-center">
      <span class="relative"><img class="absolute left-[-26px] top-[-5px]" src="/images/home/sparkle-left.svg"> C’est votre première fois ? Suivez le guide</span>
    </div>
    <div class="flex justify-center">
      <div class="relative h-[78px] w-[78px] flex justify-center items-center bg-jva-orange-300 border-8 border-[#F9F6F2] rounded-full top-[31px]">
        <RiArrowDownLine class="text-[#F9F6F2] w-8 fill-current flex-none" />
      </div>
    </div>
    <div class="bg-jva-orange-300 px-4 py-12">
      <div class="text-[40px] font-bold mb-6 leading-10 text-[#4D312A]">
        Le bénévolat et plus si affinités
      </div>
      <div class="text-[#4D312A] text-xl">
        Contribuez à une cause qui vous touche au coeur
      </div>
      <div class="overflow-hidden mt-12">
        <Slideshow
          :slides-are-links="true"
          :slides-count="activities.length"
          :aria-labelledby="`label-activities-action-${_uid}`"
        >
          <div v-for="(group,i) in activitiesGroups" :key="i" class="w-full flex flex-col space-y-4">
            <div
              v-for="activity in group"
              :key="activity.key"
            >
              <nuxt-link
                :to="`/missions-benevolat?activity.name=${activity.name}`"
                class="inline-flex p-4 bg-white shadow text-lg font-bold"
              >
                <span class="">{{ activity.icon }}</span>
                <span class="ml-2">{{ activity.name }}</span>
              </nuxt-link>
            </div>
          </div>
        </Slideshow>
      </div>
    </div>
  </div>
</template>

<script>
import activities from '@/assets/activities.json'

export default {
  components: {

  },
  data () {
    return {
      activities
    }
  },
  computed: {
    activitiesGroups () {
      const [list, chunkSize] = [[...this.activities], 7]
      return [...Array(Math.ceil(list.length / chunkSize))].map(_ => list.splice(0, chunkSize))
    }
  },
  methods: {

  }
}
</script>
