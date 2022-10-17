<template>
  <div class="pb-12">
    <div class="container">
      <Breadcrumb class="max-w-4xl !mx-auto" :links="[{text: page.attributes.name}]" />
    </div>

    <div v-if="page" class="container">
      <div class="max-w-4xl !mx-auto">
        <Heading as="h1" size="2xl">
          {{ page.attributes.name }}
        </Heading>

        <div class="text-lg mt-12">
          {{ page.attributes.subtitle }}
        </div>

        <Box class="mt-12 md:mt-16 p-8 md:p-12 xl:p-16" :padding="false">
          <template v-for="(component, i) in page.attributes.zone">
            <div
              v-if="component.__component === 'fields.rich-text'"
              :key="i"
              class="formatted-text"
              v-html="$options.filters.marked(component.body)"
            />
          </template>
        </Box>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    Heading,
    Breadcrumb
  },
  props: {
    page: {
      type: Object,
      required: true
    }
  }
}
</script>
