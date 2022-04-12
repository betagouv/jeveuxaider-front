<template>
  <Drawer :is-open="Boolean(activityId)" @close="$emit('close')">
    <AlertDialog
      v-if="activity"
      theme="danger"
      title="Supprimer l'activité"
      :text="`Vous êtes sur le point de supprimer l'actitivité ${activity.name}.`"
      :is-open="showAlert"
      @confirm="handleConfirmDelete()"
      @cancel="showAlert = false"
    />
    <template #title>
      <Heading v-if="activity" :level="3" class="text-jva-blue-500">
        <nuxt-link :to="`/admin/contenus/activites/${activityId}`" class="hover:underline" target="_blank">
          {{ activity.name }}
        </nuxt-link>
      </Heading>
    </template>
    <template v-if="activity">
      <OnlineIndicator :published="activity.is_published" :link="activity.full_url" class="mt-2" />
      <div class="flex gap-2 mt-4">
        <nuxt-link :to="`/admin/contenus/activites/${activity.id}`" class="inline-flex">
          <Button variant="white" size="sm" icon="EyeIcon">
            Détails
          </Button>
        </nuxt-link>
        <nuxt-link :to="`/admin/contenus/activites/${activity.id}/edit`" class="inline-flex">
          <Button variant="white" size="sm" icon="PencilIcon">
            Modifier
          </Button>
        </nuxt-link>
        <Button variant="white" size="sm" icon="TrashIcon" @click.native="() => showAlert = true" />
      </div>

      <div class="border-t -mx-6 my-6" />
      <BoxInformations class="mb-8" :activity="activity" />
      <BoxMission class="mb-8" :activity="activity" :stats="stats" />
      <BoxParticipation class="mb-8" :activity="activity" :stats="stats" />

      <div class="flex justify-center mb-10">
        <Link :to="`/admin/contenus/activites/${activity.id}`" class="uppercase font-semibold text-sm hover:underline">
          Détails de l'activité
        </Link>
      </div>
    </template>
  </Drawer>
</template>

<script>
import BoxInformations from '@/components/section/activity/BoxInformations'
import BoxMission from '@/components/section/activity/BoxMission'
import BoxParticipation from '@/components/section/activity/BoxParticipation'
import OnlineIndicator from '@/components/custom/OnlineIndicator'

export default {
  components: {
    OnlineIndicator,
    BoxInformations,
    BoxMission,
    BoxParticipation
  },
  props: {
    activityId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      showAlert: false,
      activity: null,
      stats: null
    }
  },
  async fetch () {
    if (!this.activityId) {
      return null
    }
    const { data: activity } = await this.$axios.get(`/activities/${this.activityId}`)
    this.activity = activity
    const { data: activityStats } = await this.$axios.get(`/activities/${this.activityId}/statistics`)
    this.stats = activityStats
    this.$emit('loaded', activity)
  },
  watch: {
    activityId: '$fetch'
  },
  methods: {
    async handleConfirmDelete () {
      await this.$axios.delete(`/activities/${this.activityId}/delete`).then((res) => {
        this.showAlert = false
        this.$emit('close')
        this.$emit('refetch')
      }).catch(() => {})
    }
  }
}
</script>
