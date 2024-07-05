<template>
  <div class="flex gap-4">
    <template v-if="filters.includes('daterange')">
      <DsfrTag
        as="button"
        v-if="$route.query['start_date']"
        size="md"
        context="deletable"
        :is-active="!!$route.query['start_date']"
        @click.native="removeFilter('dates')"
      >
        {{ $dayjs($route.query['start_date']).format('DD MMM YYYY') }} au
        {{ $dayjs($route.query['end_date']).format('DD MMM YYYY') }}
      </DsfrTag>
    </template>
    <template v-if="filters.includes('department')">
      <DsfrTag
        as="button"
        v-if="$route.query['department']"
        size="md"
        context="deletable"
        :is-active="!!$route.query['department']"
        @click.native="removeFilter('department')"
      >
        {{ $route.query['department'] }} -
        {{ $filters.label($route.query['department'], 'departments') }}
      </DsfrTag>
    </template>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    filters: {
      type: Array,
      default: () => {
        return ['department', 'daterange']
      },
    },
  },
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
