<template>
  <Container2Cols>
    <template #breadcrumb>
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Ressources' },
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
        </StackedList>

        <Pagination
          :current-page="queryResult.current_page"
          :total-rows="queryResult.total"
          :per-page="queryResult.per_page"
          @page-change="changePage"
        />
      </Box>
    </template>
    <template #right>
      <HelpCenter />
    </template>
  </Container2Cols>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import HelpCenter from '@/components/section/dashboard/HelpCenter'

export default {
  components: {
    HelpCenter
  },
  mixins: [QueryBuilder],
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
