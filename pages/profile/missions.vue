<template>
  <Container2Cols>
    <template #breadcrumb>
      <Breadcrumb
        :links="[
          { text: 'Mon profil', to: '/profile' },
          { text: 'Mes missions' },
        ]"
      />
    </template>
    <template #header>
      <SectionHeading
        :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(queryResult.total, 'participation', 'participations', false)}`"
        :secondary-title="`Bonjour ${$store.state.auth.user.profile.first_name }`"
      >
        <template #action>
          <div>
            <nuxt-link to="/missions-benevolat">
              <Button size="xl" icon="SearchIcon">
                Trouver une mission
              </Button>
            </nuxt-link>
          </div>
        </template>
      </SectionHeading>
    </template>
    <template #left>
      <div>
        <Input
          name="search"
          placeholder="Recherche par mots clés"
          icon="SearchIcon"
          variant="transparent"
          :value="$route.query['filter[search]']"
          clearable
          @input="changeFilter('filter[search]', $event)"
        />
        <div class="hidden lg:flex gap-x-4 gap-y-4 mt-2 text-sm flex-wrap">
          <Checkbox
            :key="`tous-${$route.fullPath}`"
            :option="{key: 'tous', label:'Toutes'}"
            :is-checked="hasActiveFilters()"
            variant="button"
            size="xs"
            transparent
            @change="deleteAllFilters()"
          />
          <Checkbox
            :key="`state-validee-${$route.fullPath}`"
            :option="{key: 'Validée', label:'Validées'}"
            :is-checked="$route.query['filter[state]'] == 'Validée'"
            variant="button"
            size="xs"
            transparent
            @change="changeFilter('filter[state]', 'Validée')"
          />
        </div>
        <div class="my-6 space-y-4">
          <CardParticipation
            v-for="participation in queryResult.data"
            :key="participation.id"
            :participation="participation"
            display="responsable"
            @click.native="handleClickParticipation(participation)"
          />
        </div>

        <Pagination
          class="mt-8"
          :current-page="queryResult.current_page"
          :total-rows="queryResult.total"
          :per-page="queryResult.per_page"
          @page-change="changePage"
        />
      </div>
    </template>
    <template #right>
      <HelpCenter />
    </template>
  </Container2Cols>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import HelpCenter from '@/components/section/dashboard/HelpCenter'
import CardParticipation from '@/components/card/CardParticipation.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    HelpCenter,
    CardParticipation,
    Pagination,
    Breadcrumb
  },
  mixins: [QueryBuilder],
  middleware: 'authenticated',
  data () {
    return {
      loading: false,
      endpoint: '/user/participations',
      queryParams: {
        include: 'conversation.latestMessage,mission.responsable.avatar,mission.structure'
      }
    }
  },
  methods: {
    handleClickParticipation (participation) {
      if (participation.conversation) {
        this.$router.push(`/messages/${participation.conversation.id}`)
      } else {
        this.$router.push(`${participation.mission.full_url}`)
      }
    }
  }
}
</script>
