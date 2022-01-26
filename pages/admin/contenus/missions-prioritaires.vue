<template>
  <div class="container">
    <Drawer :is-open="Boolean(drawerMissionId)" @close="drawerMissionId = null">
      <template #title>
        <Heading v-if="drawerMission" :level="3" class="text-jva-blue-500">
          <nuxt-link :to="`/admin/missions/${drawerMissionId}`" class="hover:underline">
            {{ drawerMission.name }}
          </nuxt-link>
        </Heading>
      </template>
      <DrawerMission :mission-id="drawerMissionId" @loaded="drawerMission = $event" />
    </Drawer>

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
          <MenuAdmin />
        </div>
      </aside>
      <div class="col-span-4">
        <div class="flex flex-col gap-8">
          <SectionHeading title="Mission prioritaires">
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

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
import MenuAdmin from '@/components/section/admin/MenuAdmin'
import DrawerMission from '@/components/drawer/DrawerMission'
import CardMission from '@/components/card/CardMission'
import QueryBuilder from '@/mixins/query-builder'

export default {
  components: {
    MenuAdmin,
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
      drawerMissionId: null,
      drawerMission: null
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
