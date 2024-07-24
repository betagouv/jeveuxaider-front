<template>
  <div class="container px-4 py-2 lg:px-12 lg:py-7">
    <div
      class="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b pt-6 pb-10 gap-4"
    >
      <DsfrHeading as="h1" size="xl">Gestion des modèles de messages</DsfrHeading>
      <DsfrButton icon="RiAddLine" to="/messages/modeles/add">Nouveau modèle</DsfrButton>
    </div>
    <div>
      <ListLoader v-if="queryLoading" class="py-12" />
      <template v-else>
        <div v-if="queryResult.total" class="grid grid-cols-1 divide-y my-12">
          <BaseDisclosure v-for="messageTemplate in queryResult.data" :key="messageTemplate.id">
            <template #button="{ isOpen }">
              <div class="flex items-center justify-between group py-6">
                <div class="font-semibold text-md text-jva-blue-500 group-hover:text-jva-blue-400">
                  {{ messageTemplate.name }}
                </div>
                <div class="flex items-center space-x-4">
                  <div
                    v-if="messageTemplate.is_shared"
                    class="flex items-center space-x-2 text-[#3A3A3A]"
                  >
                    <RiTeamLine class="h-4 w-4 fill-current" />
                    <span class="font-medium">Collaboratif</span>
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
              </div>
            </template>
            <FormMessageTemplate
              :ref="`form-${messageTemplate.id}`"
              class="pt-2 pb-10"
              :message-template="messageTemplate"
              @refetch="fetch()"
            />
          </BaseDisclosure>
        </div>
        <div v-else class="h-[300px] flex flex-col items-center justify-center">
          <div class="text-lg text-gray-400 font-semibold">
            Créer votre premier modèle de message
          </div>
          <div class="mt-6">
            <DsfrButton icon="RiAddLine" to="/messages/modeles/add" type="secondary"
              >Créer un modèle</DsfrButton
            >
          </div>
        </div>
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
        pagination: -1,
      },
    }
  },
  methods: {},
})
</script>
