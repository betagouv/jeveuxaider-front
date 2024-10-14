<template>
  <DsfrButton
    type="tertiary-no-outline"
    :icon="icon"
    @click="onClick"
    :size="size"
    class="text-jva-blue-500 flex gap-2 items-center group"
  >
    {{ isMissionInUserFavorite ? 'Enregistrée' : 'Enregistrer' }}
  </DsfrButton>
</template>

<script>
export default defineNuxtComponent({
  props: {
    mission: {
      type: Object,
      required: true,
    },
    size: {
      type: String,
      default: 'md',
    },
  },
  computed: {
    icon() {
      return this.isMissionInUserFavorite ? 'RiHeartFill' : 'RiHeartLine'
    },
    isMissionInUserFavorite() {
      return this.$stores.auth.user?.favorite_missions?.some(
        (favoriteMission) => favoriteMission.id === this.mission.id
      )
    },
  },
  methods: {
    onClick() {
      if (this.disabled) {
        return
      }

      if (this.isMissionInUserFavorite) {
        this.removeFromFavorite()
      } else {
        this.addToFavorite()
      }
    },
    addToFavorite() {
      apiFetch(`/missions/${this.mission.id}/favorite`, {
        method: 'POST',
      })
        .then(async () => {
          this.$plausible.trackEvent('Click CTA - Mission - Favorite', {
            props: { isLogged: this.$stores.auth.isLogged },
          })
          this.$toast.success('La mission a été enregistrée dans vos favoris')
          await this.$stores.auth.fetchUser()
        })
        .finally(() => {
          this.loading = false
        })
    },
    removeFromFavorite() {
      apiFetch(`/missions/${this.mission.id}/favorite`, {
        method: 'DELETE',
      })
        .then(async () => {
          this.$toast.success('La mission a été retirée de vos favoris')
          await this.$stores.auth.fetchUser()
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
