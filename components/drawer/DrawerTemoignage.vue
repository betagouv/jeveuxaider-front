<template>
  <BaseDrawer :is-open="Boolean(temoignageId)" @close="$emit('close')">
    <template #title>
      <div v-if="temoignage" class="text-xl">
        Participation de <br />
        <span class="font-extrabold">{{ temoignage.participation.profile.full_name }}</span>
      </div>
    </template>
    <div v-if="temoignage">
      <OnlineIndicator :published="temoignage.is_published" class="mt-2" />
      <div v-if="['admin'].includes($stores.auth.contextRole)" class="flex gap-2 mt-4">
        <nuxt-link
          no-prefetch
          :to="`/admin/contenus/testimonials/${temoignage.id}/edit`"
          class="inline-flex"
        >
          <BaseButton variant="white" size="sm" icon="RiPencilLine"> Modifier </BaseButton>
        </nuxt-link>
        <BaseButton
          v-if="!temoignage.is_published && temoignage.grade >= 4"
          variant="white"
          size="sm"
          icon="RiCheckLine"
          @click.native="handlePublishing"
        >
          Publier
        </BaseButton>
        <BaseButton
          v-if="temoignage.is_published"
          variant="white"
          size="sm"
          icon="RiCloseLine"
          @click.native="handleUnpublishing"
        >
          Dépublier
        </BaseButton>
      </div>
      <div class="border-t -mx-6 mt-8" />
      <div v-if="temoignage" class="flex flex-col gap-8 mt-8">
        <BoxInformations :temoignage="temoignage" />
        <BoxInformationsProfile
          :profile="temoignage.participation.profile"
          title="Bénévole"
          :show-action="false"
        />
        <BoxInformationsMission :mission="temoignage.participation.mission" title="Mission">
          <template #action>
            <BaseLink
              :to="`/admin/missions/${temoignage.participation.mission.id}`"
              icon="RiArrowRightSLine"
            >
              Consulter
            </BaseLink>
          </template>
        </BoxInformationsMission>
        <BoxOrganisation :organisation="temoignage.participation.mission.structure" />
        <BoxResponsable :responsable="temoignage.participation.mission.responsable" />
      </div>
    </div>
  </BaseDrawer>
</template>

<script>
import BoxInformationsProfile from '@/components/section/profile/BoxInformations.vue'
import BoxInformationsMission from '@/components/section/mission/BoxInformations.vue'
import BoxResponsable from '@/components/section/BoxResponsable.vue'
import BoxOrganisation from '@/components/section/mission/BoxOrganisation.vue'
import BoxInformations from '@/components/section/temoignage/BoxInformations.vue'
import OnlineIndicator from '@/components/custom/OnlineIndicator.vue'

export default defineNuxtComponent({
  components: {
    OnlineIndicator,
    BoxInformationsProfile,
    BoxInformationsMission,
    BoxResponsable,
    BoxOrganisation,
    BoxInformations,
  },
  props: {
    temoignageId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      temoignage: null,
    }
  },
  watch: {
    temoignageId: 'fetch',
  },
  methods: {
    async fetch() {
      if (!this.temoignageId) {
        return null
      }
      const temoignage = await apiFetch(`/temoignages/${this.temoignageId}`)
      this.temoignage = temoignage
      this.$emit('loaded', temoignage)
    },
    async handlePublishing() {
      await apiFetch(`/temoignages/${this.temoignageId}/publish`, {
        method: 'PUT',
        body: this.temoignage,
      })
      this.$emit('close')
      this.$emit('refetch')
    },
    async handleUnpublishing() {
      await apiFetch(`/temoignages/${this.temoignageId}/unpublish`, {
        method: 'PUT',
        body: this.temoignage,
      })
      this.$emit('close')
      this.$emit('refetch')
    },
  },
})
</script>
