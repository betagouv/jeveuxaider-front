<template>
  <div>
    <div class="flex gap-4">
      <SelectAdvanced
        v-model="form.period"
        name="role"
        placeholder="Période"
        :options="[
          {key : 'all', label: 'Depuis le début'},
          {key : 'year', label: 'Par année'},
          {key : 'month', label: 'Par mois'},
        ]"
        @changed="generate"
      />
      <SelectAdvanced
        v-if="form.period === 'month'"
        v-model="form.month"
        name="month"
        placeholder="Mois"
        :options="[
          {key : '01', label: 'Janvier'},
          {key : '02', label: 'Février'},
          {key : '03', label: 'Mars'},
          {key : '04', label: 'Avril'},
          {key : '05', label: 'Mai'},
          {key : '06', label: 'Juin'},
          {key : '07', label: 'Juillet'},
          {key : '08', label: 'Aout'},
          {key : '09', label: 'Septembre'},
          {key : '10', label: 'Octobre'},
          {key : '11', label: 'Novembre'},
          {key : '12', label: 'Décembre'},
        ]"
        @changed="generate"
      />
      <SelectAdvanced
        v-if="['year','month'].includes(form.period)"
        v-model="form.year"
        name="year"
        placeholder="Année"
        :options="yearOptions"
        @changed="generate"
      />
    </div>
  </div>
</template>

<script>

export default {
  props: {

  },
  data () {
    return {
      loading: false,
      form: { ...this.$store.state.statistics.params }
    }
  },
  computed: {
    yearOptions () {
      return [
        { key: 2018, label: '2018' },
        { key: 2019, label: '2019' },
        { key: 2020, label: '2020' },
        { key: 2021, label: '2021' },
        { key: 2022, label: '2022' },
        { key: 2023, label: '2023' }
      ]
    }
  },
  methods: {
    generate () {
      if (this.form.period === 'year' && !this.form.year) {
        this.form.year = this.$dayjs().year()
      }
      if (this.form.period === 'month' && !this.form.month) {
        console.log(this.$dayjs().format('MM'))
        this.form.year = this.$dayjs().year()
        this.form.month = this.$dayjs().format('MM')
      }
      this.$store.commit('statistics/setParams', { ...this.form })
      this.$emit('refetch')
    }
  }
}
</script>
