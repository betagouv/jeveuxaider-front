<template>
  <Drawer :is-open="Boolean(termId)" @close="$emit('close')">
    <template #title>
      <Heading v-if="term" :level="3" class="text-jva-blue-500">
        <nuxt-link :to="`/admin/taxonomies/${$route.params.slug}/${termId}/edit?redirect=/admin/taxonomies/${$route.params.slug}`" class="hover:underline">
          {{ term.name }}
        </nuxt-link>
      </Heading>
    </template>
    <template v-if="term">
      <OnlineIndicator :published="term.is_published" class="mt-2" />
      <div class="flex gap-2 mt-4">
        <nuxt-link :to="`/admin/taxonomies/${$route.params.slug}/${term.id}/edit?redirect=/admin/taxonomies/${$route.params.slug}`" class="inline-flex">
          <Button variant="white" size="sm" icon="PencilIcon">
            Modifier
          </Button>
        </nuxt-link>
        <div
          v-tooltip="{
            content:
              term.related_count > 0
                ? `Ce tag a ${term.related_count} liaison(s) . Il ne peut pas être supprimé.`
                : false,
            classes: 'theme-white',
            placement: 'bottom',
            offset: 8
          }"
        >
          <Button
            variant="white-red"
            size="sm"
            icon="TrashIcon"
            :disabled="term.related_count > 0 ? true : false"
            @click.native="handleDelete()"
          >
            Supprimer
          </Button>
        </div>
      </div>

      <div class="border-t -mx-6 my-6" />
      <BoxInformations class="mb-8" :term="term" />
      <!-- <BoxLiaisons class="mb-8" :term="term" /> -->
    </template>
  </Drawer>
</template>

<script>
import BoxInformations from '@/components/section/term/BoxInformations'
// import BoxLiaisons from '@/components/section/term/BoxLiaisons'
import OnlineIndicator from '@/components/custom/OnlineIndicator'

export default {
  components: {
    BoxInformations,
    // BoxLiaisons,
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
      term: null
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
    async handleDelete () {
      await this.$axios.delete(`/terms/${this.termId}`).catch(err => console.log(err))
      this.$router.go()
    }
  }
}
</script>
