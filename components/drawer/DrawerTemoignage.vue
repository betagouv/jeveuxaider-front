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
      <div v-if="['admin'].includes($store.getters.contextRole)" class="flex gap-2 mt-4">
        <nuxt-link :to="`/admin/contenus/testimonials/${temoignage.id}/edit`" class="inline-flex">
          <Button variant="white" size="sm" icon="PencilIcon">
            Modifier
          </Button>
        </nuxt-link>
        <Button v-if="!temoignage.is_published && temoignage.grade >= 4" variant="white" size="sm" icon="CheckIcon" @click.native="handlePublishing">
          Publier
        </Button>
        <Button v-if="temoignage.is_published" variant="white" size="sm" icon="XIcon" @click.native="handleUnpublishing">
          Dépublier
        </Button>
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
        <BoxResponsable :responsable="temoignage.participation.mission.responsable" />
      </div>
    </div>
  </Drawer>
</template>

<script>
import BoxInformationsProfile from '@/components/section/profile/BoxInformations'
import BoxInformationsMission from '@/components/section/mission/BoxInformations'
import BoxResponsable from '@/components/section/BoxResponsable'
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
    async handlePublishing () {
      await this.$axios.put(`/temoignages/${this.temoignageId}/publish`, this.temoignage)
      this.$emit('close')
      this.$emit('refetch')
    },
    async handleUnpublishing () {
      await this.$axios.put(`/temoignages/${this.temoignageId}/unpublish`, this.temoignage)
      this.$emit('close')
      this.$emit('refetch')
    }
  }
}
</script>
