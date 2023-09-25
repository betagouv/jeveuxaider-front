<template>
  <BaseDrawer :is-open="Boolean(reseauId)" @close="$emit('close')">
    <BaseAlertDialog
      v-if="reseau"
      theme="danger"
      title="Supprimer le réseau"
      :text="`Vous êtes sur le point de supprimer le réseau ${reseau.name}.`"
      :is-open="showAlert"
      @confirm="handleConfirmDelete()"
      @cancel="showAlert = false"
    />
    <template #title>
      <BaseHeading v-if="reseau" :level="3" class="text-jva-blue-500">
        <nuxt-link
          no-prefetch
          :to="`/admin/contenus/reseaux/${reseauId}`"
          class="hover:underline"
          target="_blank"
        >
          {{ reseau.name }}
        </nuxt-link>
      </BaseHeading>
    </template>
    <template v-if="reseau">
      <OnlineIndicator :published="reseau.is_published" :link="reseau.full_url" class="mt-2" />
      <div class="flex gap-2 mt-4">
        <nuxt-link no-prefetch :to="`/admin/contenus/reseaux/${reseau.id}`" class="inline-flex">
          <BaseButton variant="white" size="sm" icon="RiEyeLine"> Détails </BaseButton>
        </nuxt-link>
        <nuxt-link
          no-prefetch
          :to="`/admin/contenus/reseaux/${reseau.id}/edit`"
          class="inline-flex"
        >
          <BaseButton variant="white" size="sm" icon="RiPencilLine"> Modifier </BaseButton>
        </nuxt-link>
        <BaseButton
          variant="white"
          size="sm"
          icon="RiDeleteBinLine"
          @click.native="() => (showAlert = true)"
        />
      </div>

      <div class="border-t -mx-6 my-6" />
      <BoxInformations class="mb-8" :reseau="reseau" />
      <BoxAntenne class="mb-8" :reseau="reseau" :stats="stats" />
      <BoxMission class="mb-8" :reseau="reseau" :stats="stats" />
      <BoxParticipation class="mb-8" :reseau="reseau" :stats="stats" />
      <BoxResponsable
        v-for="responsable in reseau.responsables"
        :key="responsable.id"
        class="mb-8"
        :responsable="responsable.profile"
      />

      <div class="flex justify-center mb-10">
        <BaseLink
          :to="`/admin/contenus/reseaux/${reseau.id}`"
          class="uppercase font-semibold text-sm hover:underline"
        >
          Détails du réseau
        </BaseLink>
      </div>
    </template>
  </BaseDrawer>
</template>

<script>
import BoxInformations from '@/components/section/reseau/BoxInformations.vue'
import BoxMission from '@/components/section/reseau/BoxMission.vue'
import BoxAntenne from '@/components/section/reseau/BoxAntenne.vue'
import BoxParticipation from '@/components/section/reseau/BoxParticipation.vue'
import BoxResponsable from '@/components/section/BoxResponsable.vue'
import OnlineIndicator from '@/components/custom/OnlineIndicator.vue'

export default defineNuxtComponent({
  components: {
    BoxInformations,
    BoxMission,
    BoxAntenne,
    BoxParticipation,
    BoxResponsable,
    OnlineIndicator,
  },
  props: {
    reseauId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      showAlert: false,
      reseau: null,
      stats: null,
    }
  },

  watch: {
    reseauId: 'fetch',
  },
  methods: {
    async fetch() {
      if (!this.reseauId) {
        return null
      }
      const reseau = await apiFetch(`/reseaux/${this.reseauId}`)
      this.reseau = reseau
      const stats = await apiFetch(`/statistics/reseaux/${this.reseauId}`)
      this.stats = stats
      this.$emit('loaded', reseau)
    },
    async handleConfirmDelete() {
      await apiFetch(`/reseaux/${this.reseauId}`, {
        method: 'DELETE',
      })
        .then((res) => {
          this.showAlert = false
          this.$emit('close')
          this.$emit('refetch')
        })
        .catch(() => {})
    },
  },
})
</script>
