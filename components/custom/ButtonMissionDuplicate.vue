<template>
  <div>
    <Button variant="white" icon="DuplicateIcon" :loading="loading" @click.native="showDialog = true">
      <slot />
    </Button>
    <AlertDialog
      theme="warning"
      title="Dupliquer la mission"
      :text="`Vous êtes sur le point de dupliquer la mission <strong>${mission.name}</strong> qui sera enregistrée en « <strong>Brouillon</strong> »`"
      :is-open="showDialog"
      @confirm="handleConfirm()"
      @cancel="showDialog = false"
    />
  </div>
</template>

<script>
export default {
  props: {
    missionId: {
      type: Number,
      required: true
    },
    mission: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      showDialog: false
    }
  },
  methods: {
    async handleConfirm () {
      this.loading = true
      await this.$axios.post(`/missions/${this.missionId}/duplicate`)
        .then((response) => {
          this.$toast.success('La mission a été dupliquée')
          this.$emit('duplicated', response.data)
        })
        .catch(() => {})
        .finally(() => {
          this.showDialog = false
          this.loading = false
        })
    }
  }
}
</script>
