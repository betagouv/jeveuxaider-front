<template>
  <BaseDrawer :is-open="Boolean(activityId)" @close="$emit('close')">
    <BaseAlertDialog
      v-if="activity"
      icon="RiErrorWarningLine"
      title="Supprimer l'activité"
      :is-open="showAlert"
      @confirm="handleConfirmDelete()"
      @cancel="showAlert = false"
    >
      Vous êtes sur le point de supprimer l'actitivité {{ activity.name }}.
    </BaseAlertDialog>
    <template #title>
      <BaseHeading v-if="activity" :level="3" class="text-jva-blue-500">
        <nuxt-link
          no-prefetch
          :to="`/admin/contenus/activites/${activityId}`"
          class="hover:underline"
          target="_blank"
        >
          {{ activity.name }}
        </nuxt-link>
      </BaseHeading>
    </template>
    <template v-if="activity">
      <OnlineIndicator :published="activity.is_published" :link="activity.full_url" class="mt-2" />
      <div class="flex gap-2 mt-4">
        <nuxt-link no-prefetch :to="`/admin/contenus/activites/${activity.id}`" class="inline-flex">
          <BaseButton variant="white" size="sm" icon="RiEyeLine"> Détails </BaseButton>
        </nuxt-link>
        <nuxt-link
          no-prefetch
          :to="`/admin/contenus/activites/${activity.id}/edit`"
          class="inline-flex"
        >
          <BaseButton variant="white" size="sm" icon="RiPencilLine"> Modifier </BaseButton>
        </nuxt-link>
        <BaseButton
          variant="white"
          size="sm"
          icon="RiDeleteBinLine"
          @click.native="() => (showAlert = true)"
        />
      </div>

      <div class="border-t -mx-6 my-6" />
      <BoxInformations class="mb-8" :activity="activity" />
      <BoxMission class="mb-8" :activity="activity" :stats="stats" />
      <BoxParticipation class="mb-8" :activity="activity" :stats="stats" />

      <div class="flex justify-center mb-10">
        <BaseLink
          :to="`/admin/contenus/activites/${activity.id}`"
          class="uppercase font-semibold text-sm hover:underline"
        >
          Détails de l'activité
        </BaseLink>
      </div>
    </template>
  </BaseDrawer>
</template>

<script>
import BoxInformations from '@/components/section/activity/BoxInformations.vue'
import BoxMission from '@/components/section/activity/BoxMission.vue'
import BoxParticipation from '@/components/section/activity/BoxParticipation.vue'
import OnlineIndicator from '@/components/custom/OnlineIndicator.vue'

export default defineNuxtComponent({
  emits: ['loaded', 'close', 'refetch'],
  components: {
    OnlineIndicator,
    BoxInformations,
    BoxMission,
    BoxParticipation,
  },
  props: {
    activityId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      showAlert: false,
      activity: null,
      stats: null,
    }
  },
  watch: {
    activityId: 'fetch',
  },
  methods: {
    async fetch() {
      if (!this.activityId) {
        return null
      }
      const activity = await apiFetch(`/activities/${this.activityId}`)
      this.activity = activity
      const stats = await apiFetch(`/activities/${this.activityId}/statistics`)
      this.stats = stats
      this.$emit('loaded', activity)
    },
    async handleConfirmDelete() {
      await apiFetch(`/activities/${this.activityId}`, {
        method: 'DELETE',
      })
        .then((res) => {
          this.showAlert = false
          this.$emit('close')
          this.$emit('refetch')
        })
        .catch(() => {})
    },
  },
})
</script>
