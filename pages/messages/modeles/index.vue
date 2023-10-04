<template>
  <div class="container px-4 py-2 lg:px-12 lg:py-7">
    <div class="flex items-center justify-between border-b pt-6 pb-10">
      <DsfrHeading as="h1" size="xl">Gestions des modèles de messages</DsfrHeading>
      <DsfrButton icon="RiAddLine" to="/messages/modeles/add">Nouveau modèle</DsfrButton>
    </div>
    <div>
      <ListLoader v-if="queryLoading" class="py-12" />
      <template v-else>
        <div v-if="queryResult.total" class="grid grid-cols-1 divide-y my-12">
          <BaseDisclosure v-for="messageTemplate in queryResult.data" :key="messageTemplate.id">
            <template #button="{ isOpen }">
              <div class="flex items-center justify-between group py-4">
                <div class="font-semibold text-md text-jva-blue-500 group-hover:text-jva-blue-400">
                  {{ messageTemplate.name }}
                </div>
                <RiArrowUpSLine
                  v-if="isOpen"
                  class="text-jva-blue-500 group-hover:text-jva-blue-400 fill-current h-5 w-5 flex-shrink-0 mt-0.5"
                />
                <RiArrowDownSLine
                  v-else
                  class="text-jva-blue-500 group-hover:text-jva-blue-400 fill-current h-5 w-5 flex-shrink-0 mt-0.5"
                />
              </div>
            </template>
            <FormMessageTemplate
              :ref="`form-${messageTemplate.id}`"
              class="my-8"
              :message-template="messageTemplate"
              @refetch="fetch()"
            />
          </BaseDisclosure>
        </div>
        <div v-else>No result</div>
      </template>
    </div>
  </div>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import { ListLoader } from 'vue-content-loader'

export default defineNuxtComponent({
  mixins: [QueryBuilder],
  setup() {
    definePageMeta({
      layout: 'messages-params',
      middleware: ['authenticated'],
    })
  },
  components: {
    ListLoader,
  },
  data() {
    return {
      endpoint: '/message-templates',
      queryParams: {
        include: 'user',
        pagination: 0,
      },
    }
  },
  methods: {},
})
</script>
