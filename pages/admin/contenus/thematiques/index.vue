<template>
  <div class="container">
    <Drawer :is-open="Boolean(drawerThematiqueId)" @close="drawerThematiqueId = null">
      <template #title>
        <Heading v-if="drawerThematique" :level="3" class="text-jva-blue-500">
          <nuxt-link :to="drawerThematique.full_url" class="hover:underline" target="_blank">
            {{ drawerThematique.name }}
          </nuxt-link>
        </Heading>
      </template>
      <DrawerThematique :thematique-id="drawerThematiqueId" @loaded="drawerThematique = $event" />
    </Drawer>

    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Thématiques' }
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
          <SectionHeading title="Thématiques">
            <template #action>
              <div class="hidden lg:block space-x-2 flex-shrink-0">
                <nuxt-link :to="`/admin/contenus/thematiques/add`">
                  <Button size="lg" :loading="loading" icon="PlusIcon">
                    Nouvelle thématique
                  </Button>
                </nuxt-link>
              </div>
            </template>
          </SectionHeading>
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
            <CardThematique
              v-for="thematique in queryResult.data"
              :key="thematique.id"
              class="cursor-pointer"
              :thematique="thematique"
              @click.native="drawerThematiqueId = thematique.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuAdmin from '@/components/section/admin/MenuAdmin'
import QueryBuilder from '@/mixins/query-builder'
import CardThematique from '@/components/card/CardThematique'
import DrawerThematique from '@/components/drawer/DrawerThematique'

export default {
  components: {
    MenuAdmin,
    CardThematique,
    DrawerThematique
  },
  mixins: [QueryBuilder],
  layout: 'admin',
  middleware: 'admin',
  data () {
    return {
      loading: false,
      endpoint: '/thematiques',
      drawerThematiqueId: null,
      drawerThematique: null
    }
  },
  methods: {
    onSubmit () {
      //
    }
  }
}
</script>

<style>

</style>
