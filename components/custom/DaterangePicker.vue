<template>
  <Dropdown ref="dropdown">
    <template #button>
      <div class="bg-white border border-gray-300 px-4 py-3 text-sm text-gray-500">
        <span class="text-gray-900 font-medium">{{ $dayjs($store.state.statistics.params.startDate).format('DD/MM/YYYY') }}</span>
        -
        <span class="font-medium text-gray-900">{{ $dayjs($store.state.statistics.params.endDate).format('DD/MM/YYYY') }}</span>
      </div>
    </template>

    <template #items>
      <div class="py-4 px-6 space-y-4">
        <div class="flex spaxe-y-4 gap-4">
          <div class="w-[180px]">
            <div class="text-gray-500 mb-4 font-semibold">
              Préfiltres
            </div>
            <div class="space-y-2 text-sm">
              <div v-for="filter, i in filters" :key="i" class="py-1 cursor-pointer text-gray-600 hover:text-jva-blue-500" @click="onFilterClick(filter.key)">
                {{ filter.label }}
              </div>
            </div>
          </div>
          <div>
            <div class="text-gray-500 mb-4 font-semibold">
              À partir de <span class="text-gray-800">{{ $dayjs(form.startDate).format('DD/MM/YYYY') }}</span>
            </div>
            <v-date-picker ref="calendarStart" v-model="form.startDate" :attributes="attributesStartDate" />
          </div>
          <div>
            <div class="text-gray-500 mb-4 font-semibold">
              Jusqu'au <span class="text-gray-800">{{ $dayjs(form.endDate).format('DD/MM/YYYY') }}</span>
            </div>
            <v-date-picker ref="calendarEnd" v-model="form.endDate" :attributes="attributesEndDate" />
          </div>
        </div>
        <div class="flex justify-end">
          <Button @click.native="onSubmit">
            Appliquer
          </Button>
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script>

export default {
  data () {
    return {
      filters: [
        { key: 'current_year', label: 'Cette année' },
        { key: 'last_year', label: 'L\'année dernière' },
        { key: 'current_month', label: 'Ce mois-ci' },
        { key: 'last_month', label: 'Le mois dernier' },
        { key: 'current_week', label: 'Cette semaine' },
        { key: 'last_week', label: 'La semaine dernière' },
        { key: 'all', label: 'Depuis le début' }
      ],
      form: {
        startDate: this.$dayjs(this.$store.state.statistics.params.startDate).toDate(),
        endDate: this.$dayjs(this.$store.state.statistics.params.endDate).toDate()
      }
    }
  },
  computed: {
    attributesStartDate () {
      return [
        {
          highlight: {
            fillMode: 'solid',
            contentClass: '!bg-jva-blue-500 focus:!bg-jva-blue-500'
          },
          dates: this.form.startDate
        }
      ]
    },
    attributesEndDate () {
      return [
        {
          highlight: {
            fillMode: 'solid',
            contentClass: '!bg-jva-blue-500 focus:!bg-jva-blue-500'
          },
          dates: this.form.endDate
        }
      ]
    }
  },
  methods: {
    async onFilterClick (filter) {
      const calendarStart = this.$refs.calendarStart
      const calendarEnd = this.$refs.calendarEnd

      switch (filter) {
        case 'current_year':
          this.form.startDate = this.$dayjs().startOf('year').toDate()
          this.form.endDate = this.$dayjs().toDate()
          await calendarStart.move({ month: 1, year: this.$dayjs().year() })
          await calendarEnd.move({ month: this.$dayjs().month() + 1, year: this.$dayjs().year() })
          break
        case 'last_year':
          this.form.startDate = this.$dayjs().subtract(1, 'year').startOf('year').toDate()
          this.form.endDate = this.$dayjs().startOf('year').subtract(1, 'day').toDate()
          await calendarStart.move({ month: 1, year: this.$dayjs().subtract(1, 'year').year() })
          await calendarEnd.move({ month: 12, year: this.$dayjs().subtract(1, 'year').year() })
          break
        case 'current_month':
          this.form.startDate = this.$dayjs().startOf('month').toDate()
          this.form.endDate = this.$dayjs().toDate()
          await calendarStart.move({ month: this.$dayjs().month() + 1, year: this.$dayjs().year() })
          await calendarEnd.move({ month: this.$dayjs().month() + 1, year: this.$dayjs().year() })
          break
        case 'last_month':
          this.form.startDate = this.$dayjs().subtract(1, 'month').startOf('month').toDate()
          this.form.endDate = this.$dayjs().startOf('month').subtract(1, 'day').toDate()
          await calendarStart.move({ month: this.$dayjs().subtract(1, 'month').month() + 1, year: this.$dayjs().subtract(1, 'month').year() })
          await calendarEnd.move({ month: this.$dayjs().subtract(1, 'month').month() + 1, year: this.$dayjs().subtract(1, 'month').year() })
          break
        case 'current_week':
          this.form.startDate = this.$dayjs().startOf('week').toDate()
          this.form.endDate = this.$dayjs().toDate()
          await calendarStart.move({ month: this.$dayjs().month() + 1, year: this.$dayjs().year() })
          await calendarEnd.move({ month: this.$dayjs().month() + 1, year: this.$dayjs().year() })
          break
        case 'last_week':
          this.form.startDate = this.$dayjs().subtract(1, 'week').startOf('week').toDate()
          this.form.endDate = this.$dayjs().startOf('week').subtract(1, 'day').toDate()
          await calendarStart.move({ month: this.$dayjs().subtract(1, 'week').month() + 1, year: this.$dayjs().subtract(1, 'week').year() })
          await calendarEnd.move({ month: this.$dayjs().subtract(1, 'week').month() + 1, year: this.$dayjs().subtract(1, 'week').year() })
          break
        case 'all':
          this.form.startDate = new Date(2020, 0, 1)
          this.form.endDate = this.$dayjs().toDate()
          await calendarStart.move({ month: 1, year: 2020 })
          await calendarEnd.move({ month: this.$dayjs().month() + 1, year: this.$dayjs().year() })
          break
      }
    },
    onSubmit () {
      this.$emit('changed', {
        startDate: this.$dayjs(this.form.startDate).format('YYYY-MM-DD'),
        endDate: this.$dayjs(this.form.endDate).format('YYYY-MM-DD')
      })
      this.$refs.dropdown.close()
    }
  }
}
</script>

<style lang="postcss" scoped>
:deep(.vc-highlight) {
  background: #090391!important;
}
</style>
