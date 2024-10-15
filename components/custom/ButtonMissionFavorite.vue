<template>
  <div v-if="showButton" class="group cursor-pointer">
    <template v-if="variant === 'button'">
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
    <template v-if="variant === 'icon'">
      <template v-if="isMissionInUserFavorite">
        <RiHeartFill
          class="text-[#F93F42] drop-shadow h-7 stroke-white stroke-2 group-hover:scale-110 transition"
          @click.prevent="onClick"
        />
      </template>
      <template v-else>
        <RiHeartFill
          class="text-black stroke-white stroke-2 text-opacity-75 drop-shadow h-7 group-hover:scale-110 transition"
          @click.prevent="onClick"
        />
      </template>
    </template>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    variant: {
      type: String,
      default: 'button',
      validator: (v) => ['button', 'icon'].includes(v),
    },
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
    showButton() {
      if (!this.mission.provider) {
        return true
      }
      if (this.mission?.provider === 'reserve_civique') {
        return true
      }
      return false
    },
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
          // this.$toast.success('La mission a été enregistrée dans vos favoris')
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
          // this.$toast.success('La mission a été retirée de vos favoris')
          await this.$stores.auth.fetchUser()
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
