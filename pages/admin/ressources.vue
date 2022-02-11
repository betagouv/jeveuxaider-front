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
                {{ ressource.title }}  {{ ressource.roles }}
              </div>
              <div class="text-gray-500">
                <template v-if="ressource.type === 'link'">
                  Lien externe <ExternalLinkIcon class="h-4 w-4 inline-block" />
                </template>
                <template v-else>
                  Fichier de XXX ko
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
  layout: 'admin',
  data () {
    return {
      loading: false,
      endpoint: '/documents',
      queryParams: {
        append: 'file',
        role: 'responsable'
      },
      drawerRessourceId: null
    }
  },
  methods: {
    handleClickRessource (ressource) {
      if (ressource.type === 'link') {
        window.open(ressource.link, '_blank').focus()
      }
      if (ressource.type === 'file') {
        alert('@TODO')
      }
    }
  }
}
</script>
