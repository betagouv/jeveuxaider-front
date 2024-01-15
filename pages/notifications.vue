<template>
  <BaseContainer2Cols>
    <template #breadcrumb>
      <DsfrBreadcrumb
        :links="[{ text: 'Mon espace', to: '/profile' }, { text: 'Mes notifications' }]"
      />
    </template>
    <template #header>
      <BaseSectionHeading title="Vos notifications" />
    </template>
    <template #left>
      <SearchFilters>
        <BaseInput
          name="search"
          placeholder="Recherche par mots clés..."
          icon="RiSearchLine"
          variant="transparent"
          :modelValue="$route.query['filter[search]']"
          clearable
          @update:modelValue="changeFilter('filter[search]', $event)"
        />
        <template #prefilters>
          <DsfrTag
            :key="`toutes-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-active="!hasActiveFilters"
            @click.native="deleteAllFilters"
          >
            Toutes
          </DsfrTag>

          <DsfrTag
            :key="`notifications-unread-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-active="$route.query['filter[unread]'] && $route.query['filter[unread]'] == 'true'"
            @click.native="changeFilter('filter[unread]', 'true')"
          >
            Non lues
          </DsfrTag>
        </template>
        <template #sorts>
          <DsfrButton
            v-if="$stores.notifications.unreadNotificationsCount > 0"
            type="tertiary"
            size="sm"
            :loading="loadingMarlAllAsRead"
            icon="RiCheckLine"
            @click="markAllAsRead()"
          >
            Tout marquer comme lu
          </DsfrButton>
        </template>
      </SearchFilters>

      <div class="grid grid-cols-1 gap-6 lg:gap-8">
        <div v-for="(notifications, key) in resultsGroupedByDays" :key="key">
          <h3
            class="text-xl lg:text-2xl text-gray-900 font-bold mb-2 lg:mb-4 first-letter:uppercase"
          >
            {{ $dayjs(key).format('dddd D MMMM YYYY') }}
          </h3>
          <div class="grid grid-cols-1 gap-4">
            <NotificationListItemFull
              v-for="notification in notifications"
              :key="notification.id"
              :notification="notification"
              @refetch="fetch()"
            />
          </div>
        </div>
      </div>

      <DsfrPagination
        :current-page="queryResult.current_page"
        :total-rows="queryResult.total"
        :per-page="queryResult.per_page"
        @page-change="changePage"
      />
    </template>
    <template #right>
      <HelpCenter class="lg:sticky lg:top-12" />
    </template>
  </BaseContainer2Cols>
</template>

<script>
import HelpCenter from '@/components/section/dashboard/HelpCenter.vue'
import NotificationListItemFull from '@/components/notification/NotificationListItemFull.vue'
import QueryBuilder from '@/mixins/query-builder'
import SearchFilters from '@/components/custom/SearchFilters.vue'

export default defineNuxtComponent({
  components: {
    HelpCenter,
    NotificationListItemFull,
    SearchFilters,
  },
  mixins: [QueryBuilder],
  setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })
  },
  data() {
    return {
      loadingMarlAllAsRead: false,
      endpoint: '/user/notifications',
    }
  },
  computed: {
    resultsGroupedByDays() {
      const results = this.queryResult.data?.map((item) => {
        return {
          ...item,
          day: this.$dayjs(item.created_at).format('YYYY-MM-DD'),
        }
      })
      return _groupBy(results, 'day')
    },
  },
  methods: {
    async markAllAsRead() {
      this.loadingMarlAllAsRead = true
      await apiFetch('/user/notifications/mark-all-as-read', {
        method: 'POST',
      })
      this.loadingMarlAllAsRead = false
      this.fetch()
      this.$stores.notifications.getUserUnreadNotificationsCount()
    },
  },
})
</script>

<style></style>
