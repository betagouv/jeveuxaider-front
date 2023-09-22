<template>
  <BaseContainer2Cols>
    <template #breadcrumb>
      <Breadcrumb
        :links="[{ text: 'Tableau de bord', to: '/dashboard' }, { text: 'Ressources' }]"
      />
    </template>
    <template #header>
      <BaseSectionHeading
        :title="`Ressources à votre disposition`"
        :secondary-title="`Bonjour ${$stores.auth.user.profile.first_name}`"
        :loading="queryLoading"
      />
    </template>
    <template #left>
      <BaseBox>
        <Heading as="h2" :level="2" class="mb-8 font-extrabold"> Guides, webinaires, etc. </Heading>
        <BaseInput
          name="search"
          placeholder="Recherche par mots clés..."
          icon="RiSearchLine"
          variant="transparent"
          :modelValue="$route.query['filter[search]']"
          clearable
          @update:modelValue="changeFilter('filter[search]', $event)"
        />
        <BaseStackedList class="mt-8">
          <template v-if="queryResult.data && queryResult.data.length">
            <BaseStackedListItem
              v-for="(ressource, i) in queryResult.data"
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
                    Lien externe
                    <RiExternalLinkLine class="h-3 w-3 inline-block" />
                  </template>
                  <template v-if="ressource.type === 'file' && ressource.file">
                    {{ ressource.file.file_name }}
                  </template>
                </div>
              </div>
            </BaseStackedListItem>
          </template>
          <template v-else>
            <div class="text-gray-700 text-base">Aucun résultat</div>
          </template>
        </BaseStackedList>

        <Pagination
          class="mt-8"
          :current-page="queryResult.current_page"
          :total-rows="queryResult.total"
          :per-page="queryResult.per_page"
          @page-change="changePage"
        />
      </BaseBox>
    </template>
    <template #right>
      <MoreNumbers v-if="['admin', 'referent'].includes($stores.auth.contextRole)" />
      <GuideLinks />
      <HelpCenter />
    </template>
  </BaseContainer2Cols>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import HelpCenter from '@/components/section/dashboard/HelpCenter.vue'
import GuideLinks from '@/components/section/dashboard/GuideLinks.vue'
import MoreNumbers from '@/components/section/dashboard/MoreNumbers.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    HelpCenter,
    GuideLinks,
    MoreNumbers,
    Pagination,
    Breadcrumb,
  },
  mixins: [QueryBuilder],
  middleware: ['authenticated', 'agreedResponsableTerms'],
  data() {
    return {
      loading: false,
      endpoint: '/documents',
      queryParams: {
        include: 'file',
      },
      drawerRessourceId: null,
    }
  },
  methods: {
    handleClickRessource(ressource) {
      if (ressource.type === 'file') {
        if (ressource.file.urls) {
          window.open(ressource.file.urls.original, '_blank').focus()
        }
      }
      if (ressource.type === 'link') {
        window.open(ressource.link, '_blank').focus()
      }
    },
  },
})
</script>
