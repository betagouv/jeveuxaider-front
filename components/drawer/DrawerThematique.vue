<template>
  <Drawer :is-open="Boolean(thematiqueId)" @close="$emit('close')">
    <template #title>
      <Heading v-if="thematique" :level="3" class="text-jva-blue-500">
        <nuxt-link :to="thematique.full_url" class="hover:underline" target="_blank">
          {{ thematique.name }}
        </nuxt-link>
      </Heading>
    </template>
    <template v-if="thematique">
      <nuxt-link class="inline-flex items-center space-x-2 mt-2" target="_blank" :to="thematique.full_url">
        <div
          :class="['h-3 w-3 rounded-full', thematique.published ? 'bg-jva-green-500' : 'bg-jva-red-500']"
        />
        <div class="underline text-sm">
          {{ thematique.published ? 'En ligne' : 'Hors ligne' }}
        </div>
        <ExternalLinkIcon class="h-4 w-4" />
      </nuxt-link>
      <div class="flex gap-2 mt-4">
        <nuxt-link :to="`/admin/contenus/thematiques/${thematique.id}/edit`" class="inline-flex">
          <Button variant="white" size="sm" icon="PencilIcon">
            Modifier
          </Button>
        </nuxt-link>
      </div>

      <div class="border-t -mx-6 my-6" />
      <BoxInformations class="mb-8" :thematique="thematique" />
    </template>
  </Drawer>
</template>

<script>
import BoxInformations from '@/components/section/thematique/BoxInformations'

export default {
  components: {
    BoxInformations
  },
  props: {
    thematiqueId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      thematique: null
    }
  },
  async fetch () {
    if (!this.thematiqueId) {
      return null
    }
    const { data } = await this.$axios.get(`/thematiques/${this.thematiqueId}`)
    this.thematique = data
  },
  watch: {
    thematiqueId: '$fetch'
  }
}
</script>
