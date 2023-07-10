<template>
  <Container2Cols>
    <template #breadcrumb>
      <Breadcrumb
        :links="[
          { text: 'Mon espace', to: '/profile' },
          { text: 'Mes notifications' },
        ]"
      />
    </template>
    <template #header>
      <SectionHeading title="Vos dernières notifications 📣" :secondary-title="`Bonjour ${$store.state.auth.user.profile.first_name }`" />
    </template>
    <template #left>
      <SearchFilters class="">
        <Input
          name="search"
          placeholder="Recherche par mots clés..."
          icon="SearchIcon"
          variant="transparent"
          :value="$route.query['filter[search]']"
          clearable
          @input="changeFilter('filter[search]', $event)"
        />
        <template #prefilters>
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
            :key="`notifications-unread-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="$route.query['filter[unread]'] && $route.query['filter[unread]'] == 'true'"
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="changeFilter('filter[unread]', 'true')"
          >
            Non lues
          </Tag>
        </template>
      </SearchFilters>

      <div class="my-8 grid grid-cols-1 gap-8">
        <div v-for="notifications,key in resultsGroupedByDays" :key="key">
          <h3 class="text-xl text-gray-700 font-bold mb-2 first-letter:uppercase">
            {{ $dayjs(key).format('dddd D MMMM YYYY') }}
          </h3>
          <div class="grid grid-cols-1 gap-2">
            <NotificationListItem
              v-for="notification in notifications"
              :key="notification.id"
              :notification="notification"
              variant="card"
              class="bg-white"
              @refetch="$fetch()"
            />
          </div>
        </div>
      </div>

      <Pagination
        class="mt-12"
        :current-page="queryResult.current_page"
        :total-rows="queryResult.total"
        :per-page="queryResult.per_page"
        @page-change="changePage"
      />
    </template>
    <template #right>
      <HelpCenter />
    </template>
  </Container2Cols>
</template>

<script>
import _ from 'lodash'
import HelpCenter from '@/components/section/dashboard/HelpCenter'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import NotificationListItem from '@/components/notification/NotificationListItem.vue'
import QueryBuilder from '@/mixins/query-builder'
import Pagination from '@/components/dsfr/Pagination.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    HelpCenter,
    Breadcrumb,
    NotificationListItem,
    SearchFilters,
    Pagination,
    Tag
  },
  mixins: [QueryBuilder],
  middleware: 'authenticated',
  data () {
    return {
      endpoint: '/user/notifications'
    }
  },
  computed: {
    resultsGroupedByDays () {
      const results = this.queryResult.data?.map((item) => {
        return {
          ...item,
          day: this.$dayjs(item.created_at).format('YYYY-MM-DD')
        }
      })
      return _.groupBy(results, 'day')
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
