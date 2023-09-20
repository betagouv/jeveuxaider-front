<template>
  <div class="space-y-12">
    <BaseBox
      padding="sm"
      :loading="loading"
      loading-text="Récupération des statistiques..."
      class="lg:col-span-2"
    >
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
    </BaseBox>

    <BaseBox
      padding="sm"
      :loading="loading"
      loading-text="Récupération des partenaires..."
      class="lg:col-span-2"
    >
      <BoxHeadingStatistics title="Redirections des partenaires vers JVA" class="mb-6" />
      <BaseTable>
        <BaseTableHead>
          <BaseTableHeadCell>Nom</BaseTableHeadCell>
          <BaseTableHeadCell>Redirections</BaseTableHeadCell>
          <BaseTableHeadCell>Mises en relation générées</BaseTableHeadCell>
          <BaseTableHeadCell>Taux de conversion</BaseTableHeadCell>
        </BaseTableHead>
        <BaseTableBody>
          <BaseTableRow v-for="(item, y) in incomingPartners" :key="y">
            <BaseTableRowCell>
              <span class="capitalize text-gray-600 font-semibold">
                {{ item.name }}
              </span>
            </BaseTableRowCell>
            <BaseTableRowCell>
              {{ $numeral(item.incoming_trafic) }}
            </BaseTableRowCell>
            <BaseTableRowCell>
              {{ $numeral(item.incoming_applies) }}
            </BaseTableRowCell>
            <BaseTableRowCell>
              <template v-if="item.incoming_applies && item.incoming_trafic">
                {{ calculateConversionRate(item.incoming_applies, item.incoming_trafic) }}%
              </template>
              <template v-else> - </template>
            </BaseTableRowCell>
          </BaseTableRow>
        </BaseTableBody>
      </BaseTable>
    </BaseBox>

    <BaseBox
      padding="sm"
      :loading="loading"
      loading-text="Récupération des statistiques..."
      class="lg:col-span-2"
    >
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
    </BaseBox>

    <BaseBox
      padding="sm"
      :loading="loading"
      loading-text="Récupération des partenaires..."
      class="lg:col-span-2"
    >
      <BoxHeadingStatistics title="Redirections de JVA vers les partenaires" class="mb-6" />
      <BaseTable>
        <BaseTableHead>
          <BaseTableHeadCell>Nom</BaseTableHeadCell>
          <BaseTableHeadCell>Redirections</BaseTableHeadCell>
          <BaseTableHeadCell>Mises en relation générées</BaseTableHeadCell>
          <BaseTableHeadCell>Taux de conversion</BaseTableHeadCell>
        </BaseTableHead>
        <BaseTableBody>
          <BaseTableRow v-for="(item, y) in outcomingPartners" :key="y">
            <BaseTableRowCell>
              <span class="capitalize text-gray-600 font-semibold">
                {{ item.name }}
              </span>
            </BaseTableRowCell>
            <BaseTableRowCell>
              {{ $numeral(item.outgoing_trafic) }}
            </BaseTableRowCell>
            <BaseTableRowCell>
              {{ $numeral(item.outgoing_applies) }}
            </BaseTableRowCell>
            <BaseTableRowCell>
              <template v-if="item.outgoing_applies && item.outgoing_trafic">
                {{ calculateConversionRate(item.outgoing_applies, item.outgoing_trafic) }}%
              </template>
              <template v-else> - </template>
            </BaseTableRowCell>
          </BaseTableRow>
        </BaseTableBody>
      </BaseTable>
    </BaseBox>
  </div>
</template>

<script>
import CardStatistic from '@/components/card/CardStatistic'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default defineNuxtComponent({
  components: {
    CardStatistic,
    BoxHeadingStatistics,
  },
  data() {
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
      incomingAppliesFacets: null,
    }
  },
  created() {
    this.fetch()
  },

  computed: {
    incomingPartners() {
      return Object.values(
        _merge(
          _keyBy(this.incomingTraficFacets, 'name'),
          _keyBy(this.incomingAppliesFacets, 'name')
        )
      )
    },
    outcomingPartners() {
      return Object.values(
        _merge(
          _keyBy(this.outgoingTraficFacets, 'name'),
          _keyBy(this.outgoingAppliesFacets, 'name')
        )
      )
    },
    incomingConversionRate() {
      return this.incomingTrafic
        ? ((this.incomingApplies / this.incomingTrafic) * 100).toFixed(2)
        : 0
    },
    outgoingConversionRate() {
      return this.outgoingTrafic
        ? ((this.outgoingApplies / this.outgoingTrafic) * 100).toFixed(2)
        : 0
    },
  },
  methods: {
    async fetch() {
      this.loading = true
      await Promise.all([
        this.fetchOutgoingTrafic(),
        this.fetchIncomingTrafic(),
        this.fetchOutgoingApplies(),
        this.fetchIncomingApplies(),
      ]).finally(() => {
        this.loading = false
      })
    },
    calculateConversionRate(value1, value2) {
      return value2 ? ((value1 / value2) * 100).toFixed(2) : 0
    },
    async fetchOutgoingTrafic() {
      await apiFetch('/statistics/api-engagement/outgoing-trafic', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.outgoingTraficFacets = response.partners
        this.outgoingTrafic = response.total
      })
    },
    async fetchIncomingTrafic() {
      await apiFetch('/statistics/api-engagement/incoming-trafic', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.incomingTraficFacets = response.partners
        this.incomingTrafic = response.total
      })
    },
    async fetchOutgoingApplies() {
      await apiFetch('/statistics/api-engagement/outgoing-applies', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.outgoingAppliesFacets = response.partners
        this.outgoingApplies = response.total
      })
    },
    async fetchIncomingApplies() {
      await apiFetch('/statistics/api-engagement/incoming-applies', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.incomingAppliesFacets = response.partners
        this.incomingApplies = response.total
      })
    },
  },
})
</script>
