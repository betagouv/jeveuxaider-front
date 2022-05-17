<template>
  <Drawer :is-open="Boolean(temoignageId)" @close="$emit('close')">
    <template #title>
      <div v-if="temoignage" class="text-xl">
        Participation de <br>
        <span class="font-extrabold">{{ temoignage.participation.profile.full_name }}</span>
      </div>
    </template>
    <div v-if="temoignage">
      <OnlineIndicator :published="temoignage.is_published" class="mt-2" />
      <div class="flex gap-2 mt-4">
        <nuxt-link :to="`/admin/contenus/testimonials/${temoignage.id}/edit`" class="inline-flex">
          <Button variant="white" size="sm" icon="PencilIcon">
            Modifier
          </Button>
        </nuxt-link>
      </div>
      <div class="border-t -mx-6 mt-8" />
      <div v-if="temoignage" class="flex flex-col gap-8 mt-8">
        <BoxInformations :temoignage="temoignage" />
        <BoxInformationsProfile :profile="temoignage.participation.profile" title="Bénévole" :show-action="false" />
        <BoxInformationsMission :mission="temoignage.participation.mission" title="Mission">
          <template #action>
            <Link :to="`/admin/missions/${temoignage.participation.mission.id}`" icon="ChevronRightIcon">
              Consulter
            </Link>
          </template>
        </BoxInformationsMission>
        <BoxOrganisation :organisation="temoignage.participation.mission.structure" />
        <BoxResponsable :profile="temoignage.participation.mission.responsable" />
      </div>
    </div>
  </Drawer>
</template>

<script>
import BoxInformationsProfile from '@/components/section/profile/BoxInformations'
import BoxInformationsMission from '@/components/section/mission/BoxInformations'
import BoxResponsable from '@/components/section/mission/BoxResponsable'
import BoxOrganisation from '@/components/section/mission/BoxOrganisation'
import BoxInformations from '@/components/section/temoignage/BoxInformations'
import OnlineIndicator from '@/components/custom/OnlineIndicator'

export default {
  components: {
    OnlineIndicator,
    BoxInformationsProfile,
    BoxInformationsMission,
    BoxResponsable,
    BoxOrganisation,
    BoxInformations
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
