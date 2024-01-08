<template>
  <BaseContainer2Cols
    class-left="flex flex-col lg:col-span-8 gap-8 lg:gap-12"
    class-right="lg:col-span-4 space-y-8 lg:space-y-12"
  >
    <template #breadcrumb>
      <DsfrBreadcrumb :links="[{ text: 'Mon espace', to: '/profile' }, { text: 'Mes missions' }]" />
    </template>
    <template #header>
      <BaseSectionHeading
        :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
          queryResult.total,
          'mission',
          'missions',
          false
        )}`"
        :secondary-title="`Bonjour ${$stores.auth.user.profile.first_name}`"
      >
        <template #action>
          <DsfrButton
            size="lg"
            icon="RiSearchLine"
            @click.native="$router.push('/missions-benevolat')"
          >
            Trouver une mission
          </DsfrButton>
        </template>
      </BaseSectionHeading>
    </template>
    <template #left>
      <div>
        <BaseInput
          name="search"
          placeholder="Recherche par responsables, missions, organisations..."
          icon="RiSearchLine"
          variant="transparent"
          :modelValue="$route.query['filter[search]']"
          clearable
          @update:modelValue="changeFilter('filter[search]', $event)"
        />
        <div class="hidden lg:flex gap-x-4 gap-y-4 mt-4 text-sm flex-wrap">
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
            :key="`state-validee-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="$route.query['filter[state]'] == 'Validée'"
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="changeFilter('filter[state]', 'Validée')"
          >
            Validées
          </DsfrTag>
        </div>
        <div class="my-8 space-y-8">
          <CardParticipation
            v-for="participation in queryResult.data"
            :key="participation.id"
            :participation="participation"
            display="responsable"
            @click.native="handleClickParticipation(participation)"
            @refetch="fetch()"
          />
        </div>

        <DsfrPagination
          class="mt-8"
          :current-page="queryResult.current_page"
          :total-rows="queryResult.total"
          :per-page="queryResult.per_page"
          @page-change="changePage"
        />
      </div>
    </template>
    <template #right>
      <HelpCenter class="lg:sticky lg:top-12" />
    </template>
  </BaseContainer2Cols>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import HelpCenter from '@/components/section/dashboard/HelpCenter.vue'
import CardParticipation from '@/components/card/CardParticipation.vue'

export default defineNuxtComponent({
  components: {
    HelpCenter,
    CardParticipation,
  },
  mixins: [QueryBuilder],
  setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })
  },
  data() {
    return {
      loading: false,
      endpoint: '/user/participations',
      queryParams: {
        include:
          'conversation.latestMessage,mission.responsable.avatar,mission.structure,temoignage',
      },
    }
  },
  methods: {
    handleClickParticipation(participation) {
      if (participation.conversation) {
        this.$router.push(`/messages/${participation.conversation.id}`)
      } else {
        this.$router.push(`${participation.mission.full_url}`)
      }
    },
  },
})
</script>
