<template>
  <div class="container">
    <DrawerMissionTemplate :mission-template-id="drawerMissionTemplateId" @close="drawerMissionTemplateId = null" />
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Modèles de mission' }
      ]"
    />

    <div class="grid grid-cols-5 py-12">
      <aside class="relative col-span-1">
        <div class="sticky top-12">
          <MenuAdmin />
        </div>
      </aside>
      <div class="col-span-4">
        <div class="flex flex-col gap-8">
          <SectionHeading title="Modèles de mission">
            <template #action>
              <div class="hidden lg:block space-x-2 flex-shrink-0">
                <nuxt-link :to="`/admin/contenus/modeles-mission/add`">
                  <Button size="lg" :loading="loading" icon="PlusIcon">
                    Modèle de mission
                  </Button>
                </nuxt-link>
              </div>
            </template>
          </SectionHeading>
          <div>
            <Input
              name="search"
              placeholder="Recherche par mots clés..."
              icon="SearchIcon"
              variant="transparent"
              :value="$route.query['filter[search]']"
              clearable
              @input="changeFilter('filter[search]', $event)"
            />
            <div class="hidden lg:flex gap-x-4 gap-y-4 mt-2 text-sm flex-wrap">
              <Checkbox
                :key="`toutes-${$route.fullPath}`"
                :option="{key: 'toutes', label:'Toutes'}"
                :is-checked="hasActiveFilters()"
                variant="button"
                size="xs"
                transparent
                @change="deleteAllFilters()"
              />
              <Checkbox
                :key="`state-en-attente-validation-${$route.fullPath}`"
                :option="{key: 'en-attente-validation', label:'En attente de validation'}"
                :is-checked="$route.query['filter[state]'] && $route.query['filter[state]'] == 'waiting'"
                variant="button"
                size="xs"
                transparent
                @change="changeFilter('filter[state]', 'waiting')"
              />
              <Checkbox
                :key="`state-validated-${$route.fullPath}`"
                :option="{key: 'validated', label:'Validé'}"
                :is-checked="$route.query['filter[state]'] && $route.query['filter[state]'] == 'validated'"
                variant="button"
                size="xs"
                transparent
                @change="changeFilter('filter[state]', 'validated')"
              />
              <Checkbox
                :key="`published-${$route.fullPath}`"
                :option="{key: true, label:'En ligne'}"
                :is-checked="$route.query['filter[published]'] && $route.query['filter[published]'] == 1"
                variant="button"
                size="xs"
                transparent
                @change="changeFilter('filter[published]', 1)"
              />
            </div>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardMissionTemplate
              v-for="missionTemplate in queryResult.data"
              :key="missionTemplate.id"
              :title="missionTemplate.title"
              :state-style="missionTemplate.state"
              :state-text="$options.filters.label(missionTemplate.state, 'mission_template_workflow_states')"
              :description="missionTemplate.subtitle"
              :image-url="missionTemplate.photo && missionTemplate.photo.large"
              @click.native="drawerMissionTemplateId = missionTemplate.id"
            />
          </div>

          <Pagination
            :current-page="queryResult.current_page"
            :total-rows="queryResult.total"
            :per-page="queryResult.per_page"
            @page-change="changePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuAdmin from '@/components/section/admin/MenuAdmin'
import QueryBuilder from '@/mixins/query-builder'
import CardMissionTemplate from '@/components/card/CardMissionTemplate'
import DrawerMissionTemplate from '@/components/drawer/DrawerMissionTemplate'

export default {
  components: {
    MenuAdmin,
    CardMissionTemplate,
    DrawerMissionTemplate
  },
  mixins: [QueryBuilder],
  layout: 'admin',
  middleware: 'admin',
  data () {
    return {
      loading: false,
      endpoint: '/mission-templates',
      drawerMissionTemplateId: null
    }
  }
}
</script>
