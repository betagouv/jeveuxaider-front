<template>
  <Container2Cols>
    <template #breadcrumb>
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Ressources' },
        ]"
      />
    </template>
    <template #header>
      <SectionHeading :title="`Ressources à votre disposition`" :secondary-title="`Bonjour ${$store.state.auth.user.profile.first_name }`" />
    </template>
    <template #left>
      <Box>
        <Heading as="h2" :level="2" class="mb-8 font-extrabold">
          Guides, webinaires, etc.
        </Heading>
        <Input
          name="search"
          placeholder="Recherche par mots clés..."
          icon="SearchIcon"
          variant="transparent"
          :value="$route.query['filter[search]']"
          clearable
          @input="changeFilter('filter[search]', $event)"
        />
        <StackedList class="mt-8">
          <template v-if="queryResult.data && queryResult.data.length">
            <StackedListItem
              v-for="ressource,i in queryResult.data"
              :key="i"
              arrow
              @click.native="handleClickRessource(ressource)"
            >
              <div class="cursor-pointer">
                <div class="font-bold">
                  {{ ressource.title }}
                </div>
                <div class="text-gray-500 text-sm hover:text-gray-700">
                  <template v-if="ressource.type === 'link'">
                    Lien externe <ExternalLinkIcon class="h-3 w-3 inline-block" />
                  </template>
                  <template v-if="ressource.type === 'file' && ressource.file">
                    {{ ressource.file.file_name }}
                  </template>
                </div>
              </div>
            </StackedListItem>
          </template>
          <template v-else>
            <div class="text-gray-700 text-base">
              Aucun résultat
            </div>
          </template>
        </StackedList>

        <Pagination
          class="mt-8"
          :current-page="queryResult.current_page"
          :total-rows="queryResult.total"
          :per-page="queryResult.per_page"
          @page-change="changePage"
        />
      </Box>
    </template>
    <template #right>
      <MoreNumbers v-if="['admin','referent'].includes($store.getters.contextRole)" />
      <GuideLinks />
      <HelpCenter />
    </template>
  </Container2Cols>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import HelpCenter from '@/components/section/dashboard/HelpCenter'
import GuideLinks from '@/components/section/dashboard/GuideLinks'
import MoreNumbers from '@/components/section/dashboard/MoreNumbers'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    HelpCenter,
    GuideLinks,
    MoreNumbers,
    Pagination,
    Breadcrumb
  },
  mixins: [QueryBuilder],
  middleware: 'authenticated',
  data () {
    return {
      loading: false,
      endpoint: '/documents',
      queryParams: {
        include: 'file'
      },
      drawerRessourceId: null
    }
  },
  methods: {
    handleClickRessource (ressource) {
      if (ressource.type === 'file') {
        if (ressource.file.urls) {
          window.open(ressource.file.urls.original, '_blank').focus()
        }
      }
      if (ressource.type === 'link') {
        window.open(ressource.link, '_blank').focus()
      }
    }
  }
}
</script>
