<template>
  <div>
    <BlocActivityMissions
      v-for="(activity,i) in profileActivities"
      :key="activity.key"
      :activity="activity"
      :class="[
        i % 2 == 0 ? 'bg-[#F9F6F2]' : 'bg-white'
      ]"
    />
  </div>
</template>

<script>
import activities from '@/assets/activities.json'
import BlocActivityMissions from '@/components/section/home/BlocActivityMissions'

export default {
  components: {
    BlocActivityMissions
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
      const profileActivitiesIds = this.$store.getters.profile.activities.map((activity) => { return activity.id })
      return activities.filter(activity => profileActivitiesIds.includes(activity.key))
    }
  }
}
</script>

<style>

</style>
