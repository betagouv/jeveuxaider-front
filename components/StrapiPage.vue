<template>
  <div class="pb-12">
    <div class="container">
      <DsfrBreadcrumb class="max-w-4xl !mx-auto" :links="[{ text: page.attributes.name }]" />
    </div>

    <div v-if="page" class="container">
      <div class="max-w-4xl !mx-auto">
        <DsfrHeading as="h1" size="2xl">
          {{ page.attributes.name }}
        </DsfrHeading>

        <div class="text-lg mt-12">
          {{ page.attributes.subtitle }}
        </div>

        <BaseBox class="mt-12 md:mt-16 p-8 md:p-12 xl:p-16" :padding="false">
          <template v-for="(component, i) in page.attributes.zone">
            <div
              v-if="component.__component === 'fields.rich-text'"
              :key="i"
              class="formatted-text"
              v-html="$filters.marked(component.body)"
            />
          </template>
        </BaseBox>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    page: {
      type: Object,
      required: true,
    },
  },
})
</script>
