
<template>
  <div class="flex flex-col gap-8">
    <DrawerMissionTemplate :mission-template-id="drawerMissionTemplateId" @close="drawerMissionTemplateId = null" />
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Contenus' },
          { label: 'Modèles de mission' }
        ]"
      />
    </portal>
    <SectionHeading
      :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(
        queryResult.total,
        'modèle de mission',
        'modèles de mission',
        false
      )}`"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <nuxt-link :to="`/admin/contenus/modeles-mission/add`">
            <Button size="lg" icon="PlusIcon">
              Nouveau
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

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="missionTemplate in queryResult.data"
        :key="missionTemplate.id"
        :title="missionTemplate.title"
        :state-style="missionTemplate.state"
        :state-text="$options.filters.label(missionTemplate.state, 'mission_template_workflow_states')"
        :description="missionTemplate.subtitle"
        :image-url="missionTemplate.photo ? missionTemplate.photo.urls.card : undefined"
        @click.native="drawerMissionTemplateId = missionTemplate.id"
      >
        <template #badges>
          <div class="mb-2">
            <Badge class="" :color="missionTemplate.reseau ? 'gray' : 'gray-light'">
              {{ missionTemplate.reseau ? missionTemplate.reseau.name : 'Disponible pour tous' }}
            </Badge>
          </div>
        </template>
        <template #footer>
          <div
            class="border-t text-gray-900 font-semibold  text-sm text-center py-4"
          >
            {{ $options.filters.formatNumber(missionTemplate.missions_count) }} {{ $options.filters.pluralize(missionTemplate.missions_count, 'mission', 'missions', false) }}
          </div>
        </template>
      </Card>
    </div>

    <Pagination
      :current-page="queryResult.current_page"
      :total-rows="queryResult.total"
      :per-page="queryResult.per_page"
      @page-change="changePage"
    />
  </div>
</template>

<script>

import QueryBuilder from '@/mixins/query-builder'
import Card from '@/components/card/Card'
import DrawerMissionTemplate from '@/components/drawer/DrawerMissionTemplate'

export default {
  components: {
    Card,
    DrawerMissionTemplate
  },
  mixins: [QueryBuilder],
  layout: 'admin-with-sidebar-menu',
  middleware: 'authenticated',
  asyncData ({ $axios, params, error, store }) {
    if (!['admin', 'tete_de_reseau'].includes(store.getters.contextRole)) {
      return error({ statusCode: 403 })
    }
    return {
    }
  },
  data () {
    return {
      loading: false,
      endpoint: '/mission-templates',
      queryParams: {
        include: 'photo'
      },
      drawerMissionTemplateId: null
    }
  }
}
</script>
