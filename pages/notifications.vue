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
      <SectionHeading title="Vos notifications" />
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
        <template #sorts>
          <Button
            v-if="$store.getters['notifications/unreadNotificationsCount'] > 0"
            type="tertiary"
            size="sm"
            :loading="loadingMarlAllAsRead"
            icon="RiCheckLine"
            @click="markAllAsRead()"
          >
            Tout marquer comme lu
          </Button>
        </template>
      </SearchFilters>

      <div class="grid grid-cols-1 gap-6 lg:gap-8">
        <div v-for="notifications,key in resultsGroupedByDays" :key="key">
          <h3 class="text-xl lg:text-2xl text-gray-900 font-bold mb-2 lg:mb-4 first-letter:uppercase">
            {{ $dayjs(key).format('dddd D MMMM YYYY') }}
          </h3>
          <div class="grid grid-cols-1 gap-4">
            <NotificationListItemFull
              v-for="notification in notifications"
              :key="notification.id"
              :notification="notification"
              @refetch="$fetch()"
            />
          </div>
        </div>
      </div>

      <Pagination
        :current-page="queryResult.current_page"
        :total-rows="queryResult.total"
        :per-page="queryResult.per_page"
        @page-change="changePage"
      />
    </template>
    <template #right>
      <HelpCenter class="lg:sticky lg:top-12" />
    </template>
  </Container2Cols>
</template>

<script>
import _ from 'lodash'
import HelpCenter from '@/components/section/dashboard/HelpCenter'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import NotificationListItemFull from '@/components/notification/NotificationListItemFull.vue'
import QueryBuilder from '@/mixins/query-builder'
import Pagination from '@/components/dsfr/Pagination.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Tag from '@/components/dsfr/Tag.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    HelpCenter,
    Breadcrumb,
    NotificationListItemFull,
    SearchFilters,
    Pagination,
    Tag,
    Button
  },
  mixins: [QueryBuilder],
  middleware: 'authenticated',
  data () {
    return {
      loadingMarlAllAsRead: false,
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
    async markAllAsRead () {
      this.loadingMarlAllAsRead = true
      await this.$axios.post('/user/notifications/mark-all-as-read')
      this.loadingMarlAllAsRead = false
      this.$fetch()
      this.$store.dispatch('notifications/getUserUnreadNotificationsCount')
    }
  }
}
</script>

<style>

</style>
