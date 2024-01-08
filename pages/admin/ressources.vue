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
        <BaseHeading as="h2" :level="2" class="mb-8 font-extrabold">
          Guides, webinaires, etc.
        </BaseHeading>

        <SearchFilters class="my-8">
          <BaseInput
            name="search"
            placeholder="Recherche par mots clés..."
            icon="RiSearchLine"
            variant="transparent"
            :modelValue="$route.query['filter[search]']"
            clearable
            @update:modelValue="changeFilter('filter[search]', $event)"
          />

          <template #prefilters>
            <DsfrTag
              :key="`toutes-${$route.fullPath}`"
              as="button"
              size="md"
              context="selectable"
              :is-selected="!hasActiveFilters"
              is-selected-class="border-gray-50 bg-gray-50"
              @click.native="deleteAllFilters"
            >
              Toutes
            </DsfrTag>
            <DsfrTag
              :key="`type-file-${$route.fullPath}`"
              as="button"
              size="md"
              context="selectable"
              :is-selected="$route.query['filter[type]'] && $route.query['filter[type]'] == 'file'"
              is-selected-class="border-gray-50 bg-gray-50"
              @click.native="changeFilter('filter[type]', 'file')"
            >
              Fichiers
            </DsfrTag>
            <DsfrTag
              :key="`type-link-${$route.fullPath}`"
              as="button"
              size="md"
              context="selectable"
              :is-selected="$route.query['filter[type]'] && $route.query['filter[type]'] == 'link'"
              is-selected-class="border-gray-50 bg-gray-50"
              @click.native="changeFilter('filter[type]', 'link')"
            >
              Liens
            </DsfrTag>
          </template>
        </SearchFilters>

        <div class="mt-8">
          <ListLoader v-if="queryLoading" class="py-12" />
          <template v-else>
            <div
              v-if="queryResult.data && queryResult.data.length"
              class="grid grid-cols-1 divide-y"
            >
              <div
                v-for="(ressource, i) in queryResult.data"
                :key="i"
                class="flex items-center px-4 py-8 gap-12"
              >
                <div class="flex-1">
                  <div class="font-bold text-lg leading-6">
                    {{ ressource.title }}
                  </div>
                  <BaseTextFormatted
                    :max-lines="2"
                    :text="ressource.description"
                    class="text-[#808191] mt-4 leading-6"
                    read-more-label="Plus de détails"
                  />
                </div>
                <div class="">
                  <template v-if="ressource.type === 'link'">
                    <DsfrButton
                      icon="RiExternalLinkLine"
                      type="secondary"
                      icon-only
                      @click="handleClickRessource(ressource)"
                    />
                  </template>
                  <template v-if="ressource.type === 'file' && ressource.file">
                    <DsfrButton
                      icon="RiFileDownloadLine"
                      type="secondary"
                      icon-only
                      @click="handleClickRessource(ressource)"
                    />
                  </template>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="h-[300px] flex flex-col items-center justify-center">
                <div class="text-lg text-gray-400 font-semibold">Aucune ressource disponible</div>
              </div>
            </div>
          </template>
        </div>

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
import SearchFilters from '@/components/custom/SearchFilters.vue'
import { ListLoader } from 'vue-content-loader'

export default defineNuxtComponent({
  components: {
    HelpCenter,
    GuideLinks,
    MoreNumbers,
    Pagination,
    Breadcrumb,
    SearchFilters,
    ListLoader,
  },
  mixins: [QueryBuilder],
  middleware: ['authenticated', 'agreedResponsableTerms'],
  data() {
    return {
      loading: false,
      endpoint: '/documents',
      queryParams: {
        'filter[is_published]': true,
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
