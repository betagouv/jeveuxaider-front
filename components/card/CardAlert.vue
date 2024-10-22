<template>
  <div class="bg-white shadow-lg">
    <div class="p-4">
      <div class="flex justify-between gap-8">
        <div class="flex flex-wrap gap-2">
          <DsfrTag>{{ type }}</DsfrTag>
          <DsfrTag v-for="activity in activities" :key="activity">
            {{ activity }}
          </DsfrTag>
          <DsfrTag>{{ commitment }}</DsfrTag>
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
    <div class="p-4 border-t">BTNS</div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    alert: {
      type: Object,
      default: null,
    },
  },
  computed: {
    type() {
      return this.alert.conditions.type_missions
    },
    activities() {
      return this.alert.conditions.activities
    },
    commitment() {
      return this.alert.conditions.commitment
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
