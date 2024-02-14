<template>
  <BaseDrawer :is-open="Boolean(domaineId)" @close="$emit('close')">
    <BaseAlertDialog
      v-if="domaine"
      icon="RiErrorWarningLine"
      title="Supprimer le domaine"
      :is-open="showAlert"
      @confirm="handleConfirmDelete()"
      @cancel="showAlert = false"
    >
      Vous êtes sur le point de supprimer le domaine {{ domaine.name }}.
    </BaseAlertDialog>
    <template #title>
      <BaseHeading v-if="domaine" :level="3" class="text-jva-blue-500">
        <nuxt-link no-prefetch :to="domaine.full_url" class="hover:underline" target="_blank">
          {{ domaine.name }}
        </nuxt-link>
      </BaseHeading>
    </template>
    <template v-if="domaine">
      <nuxt-link
        no-prefetch
        class="inline-flex items-center space-x-2 mt-2"
        target="_blank"
        :to="domaine.full_url"
      >
        <div
          :class="[
            'h-3 w-3 rounded-full',
            domaine.published ? 'bg-jva-green-500' : 'bg-jva-red-500',
          ]"
        />
        <div class="underline text-sm">
          {{ domaine.published ? 'En ligne' : 'Hors ligne' }}
        </div>
        <RiExternalLinkLine class="h-4 w-4" />
      </nuxt-link>
      <div class="flex gap-2 mt-4">
        <nuxt-link
          no-prefetch
          :to="`/admin/contenus/domaines/${domaine.id}/edit`"
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
      <BoxInformations class="mb-8" :domaine="domaine" />
      <BoxMission class="mb-8" :domaine="domaine" :stats="stats" />
      <BoxParticipation class="mb-8" :domaine="domaine" :stats="stats" />
    </template>
  </BaseDrawer>
</template>

<script>
import BoxInformations from '@/components/section/domaine/BoxInformations.vue'
import BoxMission from '@/components/section/domaine/BoxMission.vue'
import BoxParticipation from '@/components/section/domaine/BoxParticipation.vue'

export default defineNuxtComponent({
  emits: ['loaded', 'close', 'refetch'],
  components: {
    BoxInformations,
    BoxMission,
    BoxParticipation,
  },
  props: {
    domaineId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      showAlert: false,
      domaine: null,
      stats: null,
    }
  },
  watch: {
    domaineId: 'fetch',
  },
  methods: {
    async fetch() {
      if (!this.domaineId) {
        return null
      }
      const domaine = await apiFetch(`/domaines/${this.domaineId}`)
      this.domaine = domaine

      const stats = await apiFetch(`/domaines/${this.domaineId}/statistics`)
      this.stats = stats
      this.$emit('loaded', domaine)
    },
    async handleConfirmDelete() {
      await apiFetch(`/domaines/${this.domaineId}`, {
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
