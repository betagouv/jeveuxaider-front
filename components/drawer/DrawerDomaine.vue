<template>
  <Drawer :is-open="Boolean(domaineId)" @close="$emit('close')">
    <AlertDialog
      v-if="domaine"
      theme="danger"
      title="Supprimer le domaine"
      :text="`Vous êtes sur le point de supprimer le domaine ${domaine.name}.`"
      :is-open="showAlert"
      @confirm="handleConfirmDelete()"
      @cancel="showAlert = false"
    />
    <template #title>
      <Heading v-if="domaine" :level="3" class="text-jva-blue-500">
        <nuxt-link :to="domaine.full_url" class="hover:underline" target="_blank">
          {{ domaine.name }}
        </nuxt-link>
      </Heading>
    </template>
    <template v-if="domaine">
      <nuxt-link class="inline-flex items-center space-x-2 mt-2" target="_blank" :to="domaine.full_url">
        <div
          :class="['h-3 w-3 rounded-full', domaine.published ? 'bg-jva-green-500' : 'bg-jva-red-500']"
        />
        <div class="underline text-sm">
          {{ domaine.published ? 'En ligne' : 'Hors ligne' }}
        </div>
        <ExternalLinkIcon class="h-4 w-4" />
      </nuxt-link>
      <div class="flex gap-2 mt-4">
        <nuxt-link :to="`/admin/contenus/domaines/${domaine.id}/edit`" class="inline-flex">
          <Button variant="white" size="sm" icon="PencilIcon">
            Modifier
          </Button>
        </nuxt-link>
        <Button variant="white" size="sm" icon="TrashIcon" @click.native="() => showAlert = true" />
      </div>

      <div class="border-t -mx-6 my-6" />
      <BoxInformations class="mb-8" :domaine="domaine" />
      <BoxMission class="mb-8" :domaine="domaine" :stats="stats" />
      <BoxParticipation class="mb-8" :domaine="domaine" :stats="stats" />
    </template>
  </Drawer>
</template>

<script>
import BoxInformations from '@/components/section/domaine/BoxInformations'
import BoxMission from '@/components/section/domaine/BoxMission'
import BoxParticipation from '@/components/section/domaine/BoxParticipation'

export default {
  components: {
    BoxInformations,
    BoxMission,
    BoxParticipation
  },
  props: {
    domaineId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      showAlert: false,
      domaine: null,
      stats: null
    }
  },
  async fetch () {
    if (!this.domaineId) {
      return null
    }
    const { data: domaine } = await this.$axios.get(`/domaines/${this.domaineId}`)
    this.domaine = domaine

    const { data: domaineStats } = await this.$axios.get(`/domaines/${this.domaineId}/statistics`)
    this.stats = domaineStats
    this.$emit('loaded', domaine)
  },
  watch: {
    domaineId: '$fetch'
  },
  methods: {
    async handleConfirmDelete () {
      await this.$axios.delete(`/domaines/${this.domaineId}/delete`).then((res) => {
        this.showAlert = false
        this.$emit('close')
        this.$emit('refetch')
      }).catch(() => {})
    }
  }
}
</script>
