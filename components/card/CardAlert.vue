<template>
  <div class="bg-white shadow-lg">
    <div class="p-6">
      <div class="flex justify-between gap-8">
        <div>
          <div class="mb-4 font-medium text-xl">{{ title }}</div>
          <div class="flex flex-wrap gap-2">
            <DsfrTag v-if="!isDistance" size="sm">{{ alert.conditions.zip }}</DsfrTag>
            <DsfrTag v-if="!isDistance" size="sm"
              >À moins de {{ alert.conditions.radius }} kms</DsfrTag
            >
            <DsfrTag v-for="activityId in alert.conditions.activities" :key="activityId" size="sm">
              {{ $filters.activities(activityId) }}
            </DsfrTag>
            <DsfrTag size="sm">{{
              $filters.label(alert.conditions.commitment, 'commitment')
            }}</DsfrTag>
          </div>
        </div>
        <div>
          <BaseToggle
            :modelValue="alert.is_active"
            button-label-class="text-right"
            button-wrapper-class="items-end mt-1 sm:mt-0"
            :button-labels="{ on: 'Oui', off: 'Non' }"
            @update:modelValue="onToggleClick"
          />
        </div>
      </div>
    </div>
    <div class="p-6 border-t">
      <div class="flex justify-end gap-2">
        <DsfrButton type="tertiary" size="sm" icon-only icon="RiDeleteBinLine"></DsfrButton>
        <DsfrButton type="tertiary" size="sm" icon-only icon="RiPencilLine"></DsfrButton>
        <DsfrButton type="primary" size="sm">Voir les missions</DsfrButton>
      </div>
    </div>
  </div>
</template>

<script>
import activitiesJson from '@/assets/activities.json'

export default defineNuxtComponent({
  data() {
    return {
      activitiesJson: activitiesJson,
    }
  },
  props: {
    alert: {
      type: Object,
      default: null,
    },
  },
  computed: {
    title() {
      if (this.alert.conditions.type_missions === 'presentiel') {
        return `Missions en présentiel • ${this.alert.conditions.city}`
      }
      if (this.alert.conditions.type_missions === 'presentiel') {
        return `Missions à distance`
      }
      return 'Missions en présentiel et à distance'
    },
    isDistance() {
      return this.alert.conditions.type_missions === 'distance'
    },
  },
  methods: {
    onToggleClick(value) {
      if (value) {
        this.activateAlert()
      } else {
        this.deactivateAlert()
      }
    },
    async activateAlert() {
      await apiFetch(`/user/alerts/${this.alert.id}/activate`, {
        method: 'POST',
      })
      this.alert.is_active = true
      this.$toast.success('Votre alerte est activée')
    },
    async deactivateAlert() {
      await apiFetch(`/user/alerts/${this.alert.id}/deactivate`, {
        method: 'POST',
      })
      this.alert.is_active = false
      this.$toast.success('Votre alerte est désactivée')
    },
  },
})
</script>
