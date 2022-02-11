<template>
  <Drawer :is-open="Boolean(ressourceId)" @close="$emit('close')">
    <template #title>
      <Heading v-if="ressource" :level="3" class="text-jva-blue-500">
        {{ ressource.title }}
      </Heading>
    </template>
    <template v-if="ressource">
      <OnlineIndicator :published="ressource.is_published" class="mt-2" />
      <div class="flex gap-2 mt-4">
        <nuxt-link :to="`/admin/contenus/ressources/${ressource.id}/edit`" class="inline-flex">
          <Button variant="white" size="sm" icon="PencilIcon">
            Modifier
          </Button>
        </nuxt-link>
      </div>
      <div class="border-t -mx-6 my-6" />
      <BoxInformations class="mb-8" :ressource="ressource" />
    </template>
  </Drawer>
</template>

<script>
import BoxInformations from '@/components/section/ressource/BoxInformations'
import OnlineIndicator from '@/components/custom/OnlineIndicator'

export default {
  components: {
    BoxInformations,
    OnlineIndicator
  },
  props: {
    ressourceId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      ressource: null
    }
  },
  async fetch () {
    if (!this.ressourceId) {
      return null
    }
    const { data: ressource } = await this.$axios.get(`/documents/${this.ressourceId}`)
    this.ressource = ressource
    this.$emit('loaded', ressource)
  },
  watch: {
    ressourceId: '$fetch'
  },
  methods: {

  }
}
</script>
