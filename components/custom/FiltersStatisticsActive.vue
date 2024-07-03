<template>
  <div class="flex gap-4">
    <DsfrTag
      as="button"
      v-if="$route.query['start_date']"
      size="md"
      context="deletable"
      :is-active="!!$route.query['start_date']"
      @click.native="removeFilter('dates')"
    >
      {{ $route.query['start_date'] }} - {{ $route.query['end_date'] }}
    </DsfrTag>
    <DsfrTag
      as="button"
      v-if="$route.query['department']"
      size="md"
      context="deletable"
      :is-active="!!$route.query['department']"
      @click.native="removeFilter('department')"
    >
      {{ $route.query['department'] }}
    </DsfrTag>
  </div>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'

export default defineNuxtComponent({
  mixins: [QueryBuilder],
  props: {},
  data() {
    return {}
  },
  methods: {
    removeFilter(key) {
      if (key === 'dates') {
        this.$router.push({
          query: {
            ...this.$route.query,
            start_date: null,
            end_date: null,
          },
        })
      } else {
        this.$router.push({
          query: {
            ...this.$route.query,
            [key]: null,
          },
        })
      }
    },
  },
})
</script>
