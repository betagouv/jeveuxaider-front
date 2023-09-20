<template>
  <div class="pb-12">
    <div class="container">
      <div class="max-w-4xl !mx-auto">
        <Breadcrumb :links="[{ text: 'Charte de bon fonctionnement' }, { text: 'Bénévoles' }]" />

        <Heading as="h1" size="2xl" class="mb-12"> Charte de bon fonctionnement </Heading>

        <TabsWithRouter
          name="tabs-charte-bon-fonctionnement"
          :tabs="[
            {
              key: 'responsables',
              content: 'Pour les responsables',
              contentMobile: 'Responsables',
              to: '/charte-bon-fonctionnement/responsables',
            },
            {
              key: 'benevoles',
              content: 'Pour les bénévoles',
              contentMobile: 'Bénévoles',
              to: '/charte-bon-fonctionnement/benevoles',
            },
          ]"
          selected-tab-key="benevoles"
        >
          <BaseBox class="p-8 md:p-12 xl:p-16" :padding="false" :variant="false">
            <template v-for="(component, i) in content.attributes.zone">
              <div
                v-if="component.__component === 'fields.rich-text'"
                :key="i"
                class="formatted-text"
                v-html="$filters.marked(component.body)"
              />
            </template>
          </BaseBox>
        </TabsWithRouter>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import TabsWithRouter from '@/components/dsfr/TabsWithRouter.vue'
import Heading from '@/components/dsfr/Heading.vue'

export default defineNuxtComponent({
  components: {
    Breadcrumb,
    Heading,
    TabsWithRouter,
  },
  async setup() {
    const { content, head } = await useStrapiFetch(
      'charte-de-bon-fonctionnement-pour-les-benevoles'
    )
    useHead(head)

    return {
      content,
    }
  },
})
</script>
