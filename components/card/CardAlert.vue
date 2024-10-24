<template>
  <div class="bg-white shadow-lg">
    <div class="p-6">
      <div class="flex justify-between gap-8">
        <div class="mb-4 font-medium text-xl">{{ title }}</div>
        <div>
          <BaseToggle
            :modelValue="alert.is_email_notification_active"
            button-label-class="!m-0"
            button-wrapper-class="!flex-row-reverse items-center justify-center !w-[175px] gap-2"
            :button-labels="{ on: 'Être averti par e-mail', off: 'Être averti par e-mail' }"
            @update:modelValue="onToggleClick"
            position="left"
          />
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        <DsfrTag v-if="!isDistance" size="sm"
          >{{ alert.conditions.city }} ({{ alert.conditions.zip }})</DsfrTag
        >
        <DsfrTag v-if="!isDistance" size="sm">À moins de {{ alert.conditions.radius }} kms</DsfrTag>
        <DsfrTag size="sm">{{ $filters.label(alert.conditions.commitment, 'commitment') }}</DsfrTag>
        <DsfrTag v-for="activityId in alert.conditions.activities" :key="activityId" size="sm">
          {{ $filters.activities(activityId) }}
        </DsfrTag>
      </div>
    </div>
    <div class="p-6 border-t">
      <div class="flex justify-end gap-2">
        <DsfrButton
          type="tertiary"
          size="sm"
          icon-only
          icon="RiDeleteBinLine"
          class="!text-[#CE0500]"
          @click="showDeleteDialog = true"
        ></DsfrButton>
        <DsfrButton
          type="tertiary"
          size="sm"
          icon-only
          icon="RiPencilLine"
          @click="onEditClick"
        ></DsfrButton>
        <DsfrButton type="primary" size="sm">Voir les missions</DsfrButton>

        <BaseAlertDialog
          icon="RiErrorWarningLine"
          title="Êtes-vous sûrs ?"
          :is-open="showDeleteDialog"
          button-label="Oui, je confirme"
          @confirm="handleConfirmDelete()"
          @cancel="showDeleteDialog = false"
        >
          Vous êtes sur le point de supprimer votre alerte.
        </BaseAlertDialog>
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
      showDeleteDialog: false,
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
      if (this.alert.conditions.type_missions === 'distance') {
        return `Missions à distance`
      }
      return 'Missions en présentiel et à distance'
    },
    isDistance() {
      return this.alert.conditions.type_missions === 'distance'
    },
  },
  methods: {
    async handleConfirmDelete() {
      this.showDeleteDialog = false
      await apiFetch(`/user/alerts/${this.alert.id}`, {
        method: 'DELETE',
      })
      await this.$stores.auth.fetchUser()
      this.$toast.success('Votre alerte a été supprimée')
    },
    onEditClick() {
      this.$stores.userAlert.showOverlay = true
      this.$stores.userAlert.selectedAlert = this.alert
    },
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
      this.alert.is_email_notification_active = true
      this.$toast.success('Votre alerte est activée')
    },
    async deactivateAlert() {
      await apiFetch(`/user/alerts/${this.alert.id}/deactivate`, {
        method: 'POST',
      })
      this.alert.is_email_notification_active = false
      this.$toast.success('Votre alerte est désactivée')
    },
  },
})
</script>
