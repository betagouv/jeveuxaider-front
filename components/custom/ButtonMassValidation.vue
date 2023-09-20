<template>
  <div>
    <BaseButton size="lg" icon="RiCheckLine" :loading="loading" @click.native="showDialog = true">
      Validation en masse ({{ count }})
    </BaseButton>
    <BaseAlertDialog
      theme="warning"
      title="Validation en masse"
      :text="`Vous êtes sur le point de valider ${count} participation(s) actuellement en attente de validation.`"
      :is-open="showDialog"
      @confirm="handleConfirm()"
      @cancel="showDialog = false"
    />
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    structureId: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showDialog: false,
      loading: false,
    }
  },
  methods: {
    async handleConfirm() {
      this.loading = true
      const res = await apiFetch(
        `/structures/${this.structureId}/validate-waiting-participations`,
        {
          method: 'POST',
        }
      ).catch(() => {})
      if (res) {
        this.$emit('mass-validated')
        this.$toast.success(`Les ${this.count} participation(s) en attente ont été validée(s)`)
      }
      this.showDialog = false
      this.loading = false
    },
  },
})
</script>
