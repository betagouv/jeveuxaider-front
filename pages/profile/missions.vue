<template>
  <Container2Cols>
    <template #breadcrumb>
      <Breadcrumb
        :links="[
          { text: 'Mon espace', to: '/profile' },
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
          <Button size="lg" icon="RiSearchLine" @click.native="$router.push('/missions-benevolat')">
            Trouver une mission
          </Button>
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
        <div class="hidden lg:flex gap-x-4 gap-y-4 mt-4 text-sm flex-wrap">
          <Tag
            :key="`toutes-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="hasActiveFilters()"
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="deleteAllFilters"
          >
            Toutes
          </Tag>

          <Tag
            :key="`state-validee-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="$route.query['filter[state]'] == 'Validée'"
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="changeFilter('filter[state]', 'Validée')"
          >
            Validées
          </Tag>
        </div>
        <div class="my-8 space-y-8">
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
import Button from '@/components/dsfr/Button.vue'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    HelpCenter,
    CardParticipation,
    Pagination,
    Breadcrumb,
    Button,
    Tag
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
