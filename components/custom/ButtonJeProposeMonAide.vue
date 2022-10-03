<template>
  <div class="relative">
    <!-- <nuxt-link
        v-if="$store.getters.isLogged && isAlreadyRegistered"
        to="/profile/missions"
      >
        Vous êtes inscrit(e)
      </nuxt-link> -->

    <Button
      :size="size"
      :variant="variant"
      :full="full"
      :rounded="rounded"
      :disabled="disabled"
      @click.native="onClick"
    >
      Je propose mon aide
    </Button>
  </div>
</template>

<script>
export default {
  name: 'ButtonJeProposeMonAide',
  props: {
    mission: {
      type: Object,
      required: true
    },
    variant: {
      type: String,
      default: 'green'
    },
    rounded: {
      type: Boolean,
      default: true
    },
    full: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'xl'
    }
  },
  data () {
    return {}
  },
  computed: {
    // btnClasses () {
    //   const classes =
    //     'max-w-sm mx-auto w-full flex items-center justify-center border border-transparent rounded-full text-white bg-jva-green hover:scale-105 !outline-none focus:scale-105 transition font-extrabold text-xl px-5 py-3 pb-4 transform will-change-transform'
    //   return [classes, this.additionalBtnClasses].join(' ')
    // },
    // hasParticipation () {
    //   return this.$store.getters.isLogged && this.$store.getters.profile
    //     ? this.$store.getters.profile.participations.filter(
    //       participation =>
    //         participation.mission_id == this.mission.id &&
    //           participation.state != 'Annulée'
    //     )
    //     : []
    // },
    // isResponsableOfMission () {
    //   return this.$store.getters.isLogged && this.$store.getters.profile
    //     ? this.$store.getters.profile.id == this.mission.responsable_id
    //     : false
    // },
    // isAlreadyRegistered () {
    //   return false
    //   // return this.hasParticipation.length > 0
    // }
  },
  methods: {
    onClick () {
      window.plausible &&
        window.plausible('Click CTA - Mission', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$store.commit('softGate/showOverlay')
      this.$store.commit('softGate/setSelectedMission', this.mission)
    }
  }
}
</script>
