<template>
  <div class="space-y-12">
    <Box padding="sm" :loading="loading" loading-text="Récupération des statistiques..." class="lg:col-span-2">
      <BoxHeadingStatistics title="Depuis nos partenaires" class="mb-6" />
      <div class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden">
        <CardStatistic
          :value="incomingTrafic"
          title="Trafic entrant"
          subtitle="vers JVA"
          infos-bulle="Trafic entrant vers Je veux aider depuis les partenaires"
        />

        <CardStatistic
          :value="incomingApplies"
          title="Mises en relation générées"
          subtitle="chez JVA"
          infos-bulle="Mises en relation générées par le trafic provenant des partenaires"
        />
        <CardStatistic
          :value="`${incomingConversionRate}%`"
          title="Taux de conversion"
          subtitle="chez JVA"
          infos-bulle="Rapport des mises en relation générées sur les redirections"
        />
      </div>
    </Box>

    <Box padding="sm" :loading="loading" loading-text="Récupération des partenaires..." class="lg:col-span-2">
      <BoxHeadingStatistics title="Redirections des partenaires vers JVA" class="mb-6" />
      <Table>
        <TableHead>
          <TableHeadCell>Nom</TableHeadCell>
          <TableHeadCell>Redirections</TableHeadCell>
          <TableHeadCell>Mises en relation générées</TableHeadCell>
          <TableHeadCell>Taux de conversion</TableHeadCell>
        </TableHead>
        <TableBody>
          <TableRow v-for="item,y in incomingPartners" :key="y">
            <TableRowCell>
              <span class="capitalize text-gray-600 font-semibold">
                {{ item.name }}
              </span>
            </TableRowCell>
            <TableRowCell>
              {{ item.incoming_trafic|formatNumber }}
            </TableRowCell>
            <TableRowCell>
              {{ item.incoming_applies|formatNumber }}
            </TableRowCell>
            <TableRowCell>
              <template v-if="item.incoming_applies && item.incoming_trafic">
                {{ calculateConversionRate(item.incoming_applies, item.incoming_trafic ) }}%
              </template>
              <template v-else>
                -
              </template>
            </TableRowCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>

    <Box padding="sm" :loading="loading" loading-text="Récupération des statistiques..." class="lg:col-span-2">
      <BoxHeadingStatistics title="Vers nos partenaires" class="mb-6" />
      <div class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden">
        <CardStatistic
          :value="outgoingTrafic"
          title="Trafic sortant"
          subtitle="vers les partenaires"
          infos-bulle="Trafic sortant de Je veux aider vers les partenaires"
        />
        <CardStatistic
          :value="outgoingApplies"
          title="Mises en relation générées"
          subtitle="chez les partenaires"
          infos-bulle="Mises en relation générées chez les partenaires suite à une redirection depuis Je veux aider"
        />
        <CardStatistic
          :value="`${outgoingConversionRate}%`"
          title="Taux de conversion"
          subtitle="chez les partenaires"
          infos-bulle="Rapport des mises en relation générées sur les redirections"
        />
      </div>
    </Box>

    <Box padding="sm" :loading="loading" loading-text="Récupération des partenaires..." class="lg:col-span-2">
      <BoxHeadingStatistics title="Redirections de JVA vers les partenaires" class="mb-6" />
      <Table>
        <TableHead>
          <TableHeadCell>Nom</TableHeadCell>
          <TableHeadCell>Redirections</TableHeadCell>
          <TableHeadCell>Mises en relation générées</TableHeadCell>
          <TableHeadCell>Taux de conversion</TableHeadCell>
        </TableHead>
        <TableBody>
          <TableRow v-for="item,y in outcomingPartners" :key="y">
            <TableRowCell>
              <span class="capitalize text-gray-600 font-semibold">
                {{ item.name }}
              </span>
            </TableRowCell>
            <TableRowCell>
              {{ item.outgoing_trafic|formatNumber }}
            </TableRowCell>
            <TableRowCell>
              {{ item.outgoing_applies|formatNumber }}
            </TableRowCell>
            <TableRowCell>
              <template v-if="item.outgoing_applies && item.outgoing_trafic">
                {{ calculateConversionRate(item.outgoing_applies, item.outgoing_trafic) }}%
              </template>
              <template v-else>
                -
              </template>
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
      outgoingTrafic: 0,
      outgoingTraficFacets: null,
      incomingTrafic: 0,
      incomingTraficFacets: null,
      outgoingApplies: 0,
      outgoingAppliesFacets: null,
      incomingApplies: 0,
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
    incomingPartners () {
      return Object.values(_.merge(
        _.keyBy(this.incomingTraficFacets, 'name'),
        _.keyBy(this.incomingAppliesFacets, 'name')
      ))
    },
    outcomingPartners () {
      return Object.values(_.merge(
        _.keyBy(this.outgoingTraficFacets, 'name'),
        _.keyBy(this.outgoingAppliesFacets, 'name')
      ))
    },
    incomingConversionRate () {
      return this.incomingTrafic ? ((this.incomingApplies / this.incomingTrafic) * 100).toFixed(2) : 0
    },
    outgoingConversionRate () {
      return this.outgoingTrafic ? ((this.outgoingApplies / this.outgoingTrafic) * 100).toFixed(2) : 0
    }
  },
  methods: {
    calculateConversionRate (value1, value2) {
      return value2 ? ((value1 / value2) * 100).toFixed(2) : 0
    },
    async fetchOutgoingTrafic () {
      await this.$axios.get('/statistics/api-engagement/outgoing-trafic', {
        params: this.$store.state.statistics.params
      }).then((response) => {
        this.outgoingTraficFacets = response.data.partners
        this.outgoingTrafic = response.data.total
      })
    },
    async fetchIncomingTrafic () {
      await this.$axios.get('/statistics/api-engagement/incoming-trafic', {
        params: this.$store.state.statistics.params
      }).then((response) => {
        this.incomingTraficFacets = response.data.partners
        this.incomingTrafic = response.data.total
      })
    },
    async fetchOutgoingApplies () {
      await this.$axios.get('/statistics/api-engagement/outgoing-applies', {
        params: this.$store.state.statistics.params
      }).then((response) => {
        this.outgoingAppliesFacets = response.data.partners
        this.outgoingApplies = response.data.total
      })
    },
    async fetchIncomingApplies () {
      await this.$axios.get('/statistics/api-engagement/incoming-applies', {
        params: this.$store.state.statistics.params
      }).then((response) => {
        this.incomingAppliesFacets = response.data.partners
        this.incomingApplies = response.data.total
      })
    }

  }
}

</script>
