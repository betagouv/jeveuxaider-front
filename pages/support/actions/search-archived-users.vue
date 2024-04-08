<template>
  <div>
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Support', to: '/support' },
            { text: 'Actions' },
            { text: 'Rechercher un utilisateur archivé' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <div class="flex flex-col gap-8">
      <BaseSectionHeading
        title="Rechercher un utilisateur archivé"
        secondary-title-bottom="Permet de rechercher un profil parmi les utilisateurs archivés"
      />

      <BaseBox>
        <div class="space-y-10">
          <DsfrInput
            type="search"
            size="lg"
            placeholder="User ID ou email"
            icon="RiSearchLine"
            :modelValue="$route.query['filter[search]']"
            @update:modelValue="onSearchQueryChange"
          />

          <div class="p-6 bg-gray-50 mt-10 divide-y [&>*:first-child]:pt-0 [&>*:last-child]:mb-0">
            <div v-for="archivedUser in results" :key="archivedUser.id" class="mb-4 pt-4">
              <div class="grid grid-cols-2">
                <div><strong class="text-sm">User ID:</strong> {{ archivedUser.user_id }}</div>
                <div><strong class="text-sm">Email:</strong> {{ archivedUser.email }}</div>
                <div>
                  <strong class="text-sm">Nom:</strong>
                  {{ archivedUser.unserializedDatas.last_name }}
                </div>
                <div>
                  <strong class="text-sm">Prenom:</strong>
                  {{ archivedUser.unserializedDatas.first_name }}
                </div>
              </div>
            </div>

            <div v-if="!results?.length" class="text-center">Pas de résultats.</div>
          </div>
        </div>
      </BaseBox>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    Breadcrumb,
  },
  setup() {
    definePageMeta({
      layout: 'support',
      middleware: ['admin'],
    })
  },
  data() {
    return {
      endpoint: '/archived-users',
      queryParams: {
        include: 'user',
        append: 'unserializedDatas',
      },
      results: [],
    }
  },
  methods: {
    onSearchQueryChange(payload) {
      const search = payload.trim()
      if (search.length === 0) {
        this.reset()
        return
      }

      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = _debounce(() => {
        this.$router.push({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            'filter[search]': search,
            page: undefined,
          },
        })
      }, 275)
      this.timeout()
    },
    async fetch() {
      const response = await apiFetch(this.endpoint, {
        params: { ...this.queryParams, ...this.$route.query },
      })
      this.results = response.data
    },
    reset() {
      this.results = []
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          'filter[search]': undefined,
          page: undefined,
        },
      })
    },
  },
  created() {
    if (this.$route.query['filter[search]']?.length > 0) {
      this.fetch()
    }
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal.name !== oldVal.name) {
        return
      }
      if (this.$route.query['filter[search]']?.length > 0) {
        this.fetch()
      } else {
        this.reset()
      }
    },
  },
})
</script>
