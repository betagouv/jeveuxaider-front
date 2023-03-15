<template>
  <div>
    <BlocActivityMissions
      v-for="(activity,i) in profileActivities"
      :key="activity.key"
      :activity="activity"
      class="py-6 xl:py-12"
      :class="[
        i % 2 == 0 ? 'bg-[#F9F6F2]' : 'bg-white'
      ]"
    />
    <div class="container pb-24">
      <div class="flex flex-col gap-16">
        <div v-if="profileActivitiesRemaining.length > 0">
          <Heading as="h3" size="md" class="">
            Parmi les autres thématiques qui vous touchent
          </Heading>
          <div class="flex flex-wrap gap-4 sm:gap-6 xl:gap-8 mt-12">
            <div
              v-for="activity in profileActivitiesRemaining"
              :key="activity.key"
            >
              <nuxt-link
                :to="`/missions-benevolat?activity.name=${activity.name}`"
                class="inline-flex p-4 lg:px-8 lg:py-5 bg-white shadow-xl text-lg lg:text-xl font-bold w-full sm:w-auto hover:bg-[#F9F9F9]"
              >
                <span aria-hidden="true" class="flex-none">{{ activity.icon }}</span>
                <span class="ml-3">{{ activity.name }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div v-if="profileActivitiesRemaining.length > 0">
          <Heading as="h3" size="md" class="">
            Ces sujets devraient également vous parler
          </Heading>
          <div class="flex flex-wrap gap-4 sm:gap-6 xl:gap-8 mt-12">
            <div
              v-for="activity in otherActivities"
              :key="activity.key"
            >
              <nuxt-link
                :to="`/missions-benevolat?activity.name=${activity.name}`"
                class="inline-flex p-4 lg:px-8 lg:py-5 bg-white shadow-xl text-lg lg:text-xl font-bold w-full sm:w-auto hover:bg-[#F9F9F9]"
              >
                <span aria-hidden="true" class="flex-none">{{ activity.icon }}</span>
                <span class="ml-3">{{ activity.name }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import activities from '@/assets/activities.json'
import BlocActivityMissions from '@/components/section/home/BlocActivityMissions.vue'
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    BlocActivityMissions,
    Heading
  },
  data () {
    return {
      activities
    }
  },
  computed: {
    profileActivities () {
      if (!this.$store.getters.profile.activities) {
        return []
      }
      const profileActivitiesIds = this.$store.getters.profile.activities.slice(0, 3).map((activity) => { return activity.id })
      return activities.filter(activity => profileActivitiesIds.includes(activity.key))
    },
    profileActivitiesRemaining () {
      if (!this.$store.getters.profile.activities) {
        return []
      }
      const profileActivitiesIds = this.$store.getters.profile.activities.slice(3, this.$store.getters.profile.activities.length).map((activity) => { return activity.id })
      return activities.filter(activity => profileActivitiesIds.includes(activity.key))
    },
    otherActivities () {
      if (!this.$store.getters.profile.activities) {
        return this.activities
      }
      const profileActivitiesIds = this.$store.getters.profile.activities.map((activity) => { return activity.id })
      return activities.filter(activity => !profileActivitiesIds.includes(activity.key))
    }
  }
}
</script>

<style>

</style>
