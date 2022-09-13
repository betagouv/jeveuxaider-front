<template>
  <div class="space-y-12">
    <Box padding="sm" :loading="loading" loading-text="Récupération des statistiques..." class="lg:col-span-2">
      <BoxHeadingStatistics title="Trafic & candidatures" class="mb-6" />
      <div class="grid grid-cols-1 lg:grid-cols-4 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
        <CardStatistic
          :value="statistics.outgoingTrafic"
          title="Trafic sortant"
          subtitle="vers les partenaires"
          infos-bulle="Trafic sortant de Je veux aider vers les partenaires"
        />
        <CardStatistic
          :value="statistics.incomingTrafic"
          title="Trafic entrant"
          subtitle="vers JVA"
          infos-bulle="Trafic entrant vers Je veux aider depuis les partenaires"
        />
        <CardStatistic
          :value="statistics.outgoingApplies"
          title="Candidatures générées"
          subtitle="chez les partenaires"
          infos-bulle="Candidatures générées chez les partenaires suite à une redirection depuis Je veux aider"
        />
        <CardStatistic
          :value="statistics.incomingApplies"
          title="Candidatures générées"
          subtitle="chez JVA"
          infos-bulle="Candidatures générées par le trafic provenant des partenaires"
        />
      </div>
    </Box>

    <Box padding="sm" :loading="loading" loading-text="Récupération des partenaires..." class="lg:col-span-2">
      <BoxHeadingStatistics title="Partenaires" class="mb-6" />
      <Table>
        <TableHead>
          <TableHeadCell>Nom</TableHeadCell>
          <TableHeadCell>Trafic sortant</TableHeadCell>
          <TableHeadCell>Trafic entrant</TableHeadCell>
          <TableHeadCell>Candidatures partenaires</TableHeadCell>
          <TableHeadCell>Candidatures JVA</TableHeadCell>
        </TableHead>
        <TableBody>
          <TableRow v-for="item,y in partners" :key="y">
            <TableRowCell>
              <span class="capitalize text-gray-600 font-semibold">
                {{ item.name }}
              </span>
            </TableRowCell>
            <TableRowCell>
              {{ item.outgoing_trafic|formatNumber }}
            </TableRowCell>
            <TableRowCell>
              {{ item.incoming_trafic|formatNumber }}
            </TableRowCell>
            <TableRowCell>
              {{ item.outgoing_applies|formatNumber }}
            </TableRowCell>
            <TableRowCell>
              {{ item.incoming_applies|formatNumber }}
            </TableRowCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  </div>
</template>

<script>
import _ from 'lodash'
import CardStatistic from '@/components/card/CardStatistic'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default {
  components: {
    CardStatistic,
    BoxHeadingStatistics
  },
  data () {
    return {
      loading: true,
      statistics: {},
      outgoingTraficFacets: null,
      incomingTraficFacets: null,
      outgoingAppliesFacets: null,
      incomingAppliesFacets: null
    }
  },
  async fetch () {
    this.loading = true
    await Promise.all([
      this.fetchOutgoingTrafic(),
      this.fetchIncomingTrafic(),
      this.fetchOutgoingApplies(),
      this.fetchIncomingApplies()
    ]).finally(() => {
      this.loading = false
    })
  },
  computed: {
    partners () {
      return Object.values(_.merge(
        _.keyBy(this.outgoingTraficFacets, 'name'),
        _.keyBy(this.incomingTraficFacets, 'name'),
        _.keyBy(this.outgoingAppliesFacets, 'name'),
        _.keyBy(this.incomingAppliesFacets, 'name')
      ))
    }
  },
  methods: {
    async fetchOutgoingTrafic () {
      await this.$axios.get('/statistics/api-engagement/outgoing-trafic', {
        params: this.$store.state.statistics.params
      }).then((response) => {
        this.outgoingTraficFacets = response.data.partners
        this.statistics.outgoingTrafic = response.data.total
      })
    },
    async fetchIncomingTrafic () {
      await this.$axios.get('/statistics/api-engagement/incoming-trafic', {
        params: this.$store.state.statistics.params
      }).then((response) => {
        this.incomingTraficFacets = response.data.partners
        this.statistics.incomingTrafic = response.data.total
      })
    },
    async fetchOutgoingApplies () {
      await this.$axios.get('/statistics/api-engagement/outgoing-applies', {
        params: this.$store.state.statistics.params
      }).then((response) => {
        this.outgoingAppliesFacets = response.data.partners
        this.statistics.outgoingApplies = response.data.total
      })
    },
    async fetchIncomingApplies () {
      await this.$axios.get('/statistics/api-engagement/incoming-applies', {
        params: this.$store.state.statistics.params
      }).then((response) => {
        this.incomingAppliesFacets = response.data.partners
        this.statistics.incomingApplies = response.data.total
      })
    }

  }
}

</script>
