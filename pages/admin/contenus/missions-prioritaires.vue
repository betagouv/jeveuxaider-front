<template>
  <div class="container">
    <DrawerMission :mission-id="drawerMissionId" @close="drawerMissionId = null" />
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Mission prioritaires' },
      ]"
    />

    <div class="grid grid-cols-5 py-12">
      <aside class="relative col-span-1">
        <div class="sticky top-12">
          <SecondaryMenuAdmin />
        </div>
      </aside>
      <div class="col-span-4">
        <div class="flex flex-col gap-8">
          <SectionHeading :title="`${$options.filters.formatNumber(queryResult.total)} missions prioritaires`">
            <template #action>
              <div class="hidden lg:block space-x-2 flex-shrink-0">
                <nuxt-link :to="`/admin/missions`">
                  <Button size="lg" :loading="loading" icon="PlusIcon">
                    Prioriser une mission
                  </Button>
                </nuxt-link>
              </div>
            </template>
          </Sectionheading>

          <Input
            name="search"
            placeholder="Recherche par mots clés..."
            icon="SearchIcon"
            variant="transparent"
            :value="$route.query['filter[search]']"
            clearable
            @input="changeFilter('filter[search]', $event)"
          />

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardMission
              v-for="mission in queryResult.data"
              :key="mission.id"
              class="cursor-pointer"
              :mission="mission"
              @click.native="drawerMissionId = mission.id"
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
import SecondaryMenuAdmin from '@/components/section/admin/SecondaryMenuAdmin'
import DrawerMission from '@/components/drawer/DrawerMission'
import CardMission from '@/components/card/CardMission'
import QueryBuilder from '@/mixins/query-builder'

export default {
  components: {
    SecondaryMenuAdmin,
    CardMission,
    DrawerMission
  },
  mixins: [QueryBuilder],
  layout: 'admin',
  middleware: 'admin',
  data () {
    return {
      loading: false,
      endpoint: '/missions/prioritaires',
      drawerMissionId: null
    }
  }
}
</script>
