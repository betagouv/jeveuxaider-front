<template>
  <div>
    <Banner :territoire="territoire" />

    <div v-if="territoire.type == 'city' && logo" class="bg-white pt-12">
      <img
        :src="logo"
        :alt="territoire.name"
        class="mx-auto"
        style="max-height: 110px"
      >
    </div>

    <Search :territoire="territoire" />

    <Promote :territoire="territoire" />

    <Cities
      v-if="territoire.type == 'city'"
      :territoire="territoire"
      :cities="cities"
    />

    <Associations
      v-if="territoire.promoted_organisations &&territoire.promoted_organisations.length"
      :territoire="territoire"
    />

    <Engagement :territoire="territoire" />
    <Subscribe :territoire="territoire" />
  </div>
</template>

<script>
import Banner from '@/components/section/territoire/Banner'
import Search from '@/components/section/territoire/Search'
import Promote from '@/components/section/territoire/Promote'
import Cities from '@/components/section/territoire/Cities'
import Associations from '@/components/section/territoire/Associations'
import Engagement from '@/components/section/territoire/Engagement'
import Subscribe from '@/components/section/territoire/Subscribe'

export default {
  components: {
    Banner, Promote, Cities, Associations, Engagement, Subscribe, Search
  },
  props: {
    territoire: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      cities: []
    }
  },
  async fetch () {
    if (this.territoire.type === 'city') {
      const { data: cities } = await this.$axios.get(`/territoire/${this.territoire.id}/cities`)
      this.cities = cities
    }
  },
  computed: {
    logo () {
      return this.territoire.logo?.thumb
    }
  }
}
</script>
