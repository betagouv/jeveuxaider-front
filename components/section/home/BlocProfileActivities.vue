<template>
  <div>
    <BlocActivityMissions
      v-for="(activity, i) in profileActivities"
      :key="activity.key"
      :activity="activity"
      class="py-6 xl:py-12"
      :class="[i % 2 == 0 ? 'bg-[#F9F6F2]' : 'bg-white']"
    />
    <div class="container py-12">
      <div class="flex flex-col gap-16 pb-12">
        <div v-if="profileActivitiesRemaining.length > 0">
          <DsfrHeading as="h3" size="md" with-line>
            Parmi les autres thématiques qui vous touchent
          </DsfrHeading>
          <div class="flex flex-wrap gap-4 sm:gap-6 xl:gap-8 mt-12">
            <ClientOnly>
              <div v-for="(activity, i) in profileActivitiesRemaining" :key="activity.key">
                <nuxt-link
                  no-prefetch
                  :to="`/missions-benevolat?activities.name=${activity.name}`"
                  class="inline-flex p-4 lg:px-8 lg:py-5 bg-white shadow lg:shadow-xl text-xl lg:text-[22px] font-bold w-full sm:w-auto hover:bg-[#F6F6F6]"
                >
                  <span aria-hidden="true" class="flex-none">{{ activity.icon }}</span>
                  <span class="ml-3">{{ activity.name }}</span>
                </nuxt-link>
              </div>
            </ClientOnly>
          </div>
        </div>
        <div v-if="otherActivities.length > 0">
          <DsfrHeading as="h3" size="md" with-line>
            Ces sujets devraient également vous parler
          </DsfrHeading>
          <div class="flex flex-wrap gap-4 sm:gap-6 xl:gap-8 mt-12">
            <ClientOnly>
              <div
                v-for="activity in otherActivities"
                :key="activity.key"
                class="inline-flex border border-[#CECECE] text-lg xl:text-xl font-bold w-full sm:w-auto"
              >
                <div class="p-4 xl:px-8 xl:py-5 mr-auto">
                  <span aria-hidden="true" class="flex-none">{{ activity.icon }}</span>
                  <span class="ml-3">{{ activity.name }}</span>
                </div>
                <button
                  v-if="!attachedActivities.includes(activity.key)"
                  class="flex-none flex justify-center items-center border-l border-[#CECECE] w-[50px] sm:w-[72px] cursor-pointer hover:bg-[#F9F9F9]"
                  aria-label="Ajouter"
                  @click="attachActivityToProfile(activity)"
                >
                  <RiAddLine class="fill-current w-[20px] h-[20px]" />
                </button>
              </div>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import activities from '@/assets/activities.json'
import BlocActivityMissions from '@/components/section/home/BlocActivityMissions.vue'

export default defineNuxtComponent({
  components: {
    BlocActivityMissions,
  },
  data() {
    return {
      activities: activities.sort((a, b) => a.name.localeCompare(b.name)),
      chunkSize: 3,
      attachedActivities: [],
    }
  },
  computed: {
    profileActivitiesIds() {
      if (!this.$stores.auth.profile.activities) {
        return []
      }
      return this.$stores.auth.profile.activities.map((activity) => {
        return activity.id
      })
    },
    profileActivities() {
      return activities.filter((activity) =>
        this.profileActivitiesIds.slice(0, this.chunkSize).includes(activity.key)
      )
    },
    profileActivitiesRemaining() {
      if (
        !this.$stores.auth.profile.activities ||
        this.$stores.auth.profile.activities.length === 0
      ) {
        return []
      }
      const profileActivitiesIds = this.$stores.auth.profile.activities
        .slice(this.chunkSize, this.$stores.auth.profile.activities.length)
        .map((activity) => {
          return activity.id
        })
      return activities.filter((activity) => profileActivitiesIds.includes(activity.key))
    },
    otherActivities() {
      return activities.filter((activity) => !this.profileActivitiesIds.includes(activity.id))
    },
  },
  methods: {
    async attachActivityToProfile(activity) {
      await apiFetch(`/profiles/${this.$stores.auth.profile.id}/activity/${activity.id}/attach`, {
        method: 'PUT',
        body: this.mission,
      })
        .then(() => {
          // await this.$stores.auth.fetchUser()
          this.$toast.success(`${activity.label} a été ajouté à vos préférences`)
          this.attachedActivities.push(activity.key)
        })
        .catch(() => {})
    },
    async detachActivityToProfile(activity) {
      await apiFetch(`/profiles/${this.$stores.auth.profile.id}/activity/${activity.id}/detach`, {
        method: 'PUT',
        body: this.mission,
      })
        .then(() => {
          // await this.$stores.auth.fetchUser()
          this.$toast.success(`${activity.label} a été retiré de vos préférences`)
        })
        .catch(() => {})
    },
  },
})
</script>
