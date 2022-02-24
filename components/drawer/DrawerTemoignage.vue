<template>
  <Drawer :is-open="Boolean(temoignageId)" @close="$emit('close')">
    <template #title>
      <div v-if="temoignage" class="text-xl">
        Participation de <br>
        <span class="font-extrabold">{{ temoignage.participation.profile.full_name }}</span>
      </div>
    </template>
    <div v-if="temoignage" class="flex flex-col gap-8 mt-8">
      <div class="border-t -mx-6" />
      <BoxInformationsProfile :profile="temoignage.participation.profile" title="Bénévole" :show-action="false" />
      <BoxInformationsMission :mission="temoignage.participation.mission" title="Mission">
        <template #action>
          <Link :to="`/admin/missions/${temoignage.participation.mission.id}`" icon="ChevronRightIcon">
            Consulter
          </Link>
        </template>
      </BoxInformationsMission>
      <BoxResponsable :profile="temoignage.participation.mission.responsable" />
    </div>
  </Drawer>
</template>

<script>
// import BoxInformationsProfile from '@/components/section/profile/BoxInformations'
// import BoxInformationsMission from '@/components/section/mission/BoxInformations'
// import BoxResponsable from '@/components/section/mission/BoxResponsable'
import BoxInformationsProfile from '@/components/section/profile/BoxInformations'
import BoxInformationsMission from '@/components/section/mission/BoxInformations'
import BoxResponsable from '@/components/section/mission/BoxResponsable'

export default {
  components: {
    BoxInformationsProfile,
    BoxInformationsMission,
    BoxResponsable
  },
  props: {
    temoignageId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      temoignage: null
    }
  },
  async fetch () {
    if (!this.temoignageId) {
      return null
    }
    const { data: temoignage } = await this.$axios.get(`/temoignages/${this.temoignageId}`)
    this.temoignage = temoignage
    this.$emit('loaded', temoignage)
  },
  watch: {
    temoignageId: '$fetch'
  },
  methods: {

  }
}
</script>
