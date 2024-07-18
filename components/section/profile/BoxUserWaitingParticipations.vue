<template>
  <BaseBox>
    <BaseHeading :level="3" class="text-black">
      {{ $filters.pluralize(participations.length, 'participation') }} en cours
    </BaseHeading>
    <div class="flex flex-col gap-6 mt-8">
      <CardParticipationBenevole
        v-for="participation in participations"
        :key="participation.id"
        :participation="participation"
        display="responsable"
        @click.native="handleClickParticipation(participation)"
        @refetch="fetch()"
      />
    </div>
    <div class="mt-8">
      <nuxt-link to="/profile/missions">
        <DsfrButton type="secondary">Toutes mes missions</DsfrButton>
      </nuxt-link>
    </div>
  </BaseBox>
</template>

<script>
import CardParticipationBenevole from '@/components/card/CardParticipationBenevole.vue'

export default defineNuxtComponent({
  props: {},
  components: {
    CardParticipationBenevole,
  },
  data() {
    return {
      loading: false,
      participations: [],
    }
  },
  created() {
    this.fetch()
  },
  computed: {
    profile() {
      return this.$stores.auth?.user?.profile
    },
  },
  methods: {
    async fetch() {
      this.loading = true
      const response = await apiFetch('/user/participations', {
        params: {
          'filter[state]': 'En attente de validation,En cours de traitement',
          include:
            'conversation.latestMessage,mission.responsables.avatar,mission.structure,temoignage',
          pagination: 5,
        },
      })
      this.participations = response.data
      this.loading = false
    },
    handleClickParticipation(participation) {
      if (participation.conversation) {
        this.$router.push(`/messages/${participation.conversation.id}`)
      } else {
        this.$router.push(`${participation.mission.full_url}`)
      }
    },
  },
})
</script>
