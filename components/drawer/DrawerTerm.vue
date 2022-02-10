<template>
  <Drawer :is-open="Boolean(termId)" @close="$emit('close')">
    <template #title>
      <Heading v-if="term" :level="3" class="text-jva-blue-500">
        <nuxt-link :to="`/admin/taxonomies/competences/${termId}/edit`" class="hover:underline">
          {{ term.name }}
        </nuxt-link>
      </Heading>
    </template>
    <template v-if="term">
      <OnlineIndicator :published="term.is_published" class="mt-2" />
      <div class="flex gap-2 mt-4">
        <nuxt-link :to="`/admin/taxonomies/competences/${term.id}/edit`" class="inline-flex">
          <Button variant="white" size="sm" icon="PencilIcon">
            Modifier
          </Button>
        </nuxt-link>
      </div>

      <div class="border-t -mx-6 my-6" />
      <BoxInformations class="mb-8" :term="term" />
    </template>
  </Drawer>
</template>

<script>
import BoxInformations from '@/components/section/term/BoxInformations'
import OnlineIndicator from '@/components/custom/OnlineIndicator'

export default {
  components: {
    BoxInformations,
    OnlineIndicator
  },
  props: {
    termId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      term: null,
      stats: null
    }
  },
  async fetch () {
    if (!this.termId) {
      return null
    }
    const { data: term } = await this.$axios.get(`/terms/${this.termId}`)
    this.term = term
    this.$emit('loaded', term)
  },
  watch: {
    termId: '$fetch'
  },
  methods: {

  }
}
</script>
