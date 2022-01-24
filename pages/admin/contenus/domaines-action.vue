<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Domaines d\'action' }
      ]"
    />

    <div class="grid grid-cols-5 py-12 ">
      <aside class="relative col-span-1">
        <div class="sticky top-12">
          <MenuAdmin />
        </div>
      </aside>
      <div class="col-span-4">
        <div class="flex flex-col gap-12">
          <SectionHeading title="Domaines d'action" />
          <Input
            class="mt-8"
            name="search"
            placeholder="Recherche par mots clés..."
            icon="SearchIcon"
            variant="transparent"
            :value="$route.query['filter[search]']"
            @input="changeFilter('filter[search]', $event)"
          />

          <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

export default {
  components: {
    MenuAdmin,
    CardThematique
  },
  mixins: [QueryBuilder],
  layout: 'admin',
  middleware: 'admin',
  async asyncData ({ $axios }) {

  },
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
