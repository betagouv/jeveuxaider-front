<template>
  <div>
    <client-only>
      <portal v-if="!territoire.is_published || territoire.state !== 'validated'" to="header-top">
        <transition name="fade">
          <Banner icon="ExclamationIcon">
            La page n'est pas visible car elle est {{ territoire.is_published ? 'en ligne' : 'hors ligne' }} et a le statut «{{ territoire.state | label('territoire_workflow_states') }}»
            <template #action>
              <nuxt-link :to="`/admin/contenus/territoires/${territoire.id}/edit`">
                <Button variant="white">
                  Gérer
                </Button>
              </nuxt-link>
            </template>
          </Banner>
        </transition>
      </portal>
    </client-only>

    <TerritoireBanner :territoire="territoire" />

    <div v-if="territoire.type == 'city' && logo" class="bg-white pt-12">
      <div class="container">
        <img
          :srcset="logo"
          :alt="territoire.name"
          class="mx-auto"
          style="max-height: 110px"
          @error="$event.target.remove()"
        >
      </div>
    </div>

    <Search :territoire="territoire" />

    <Promote :territoire="territoire" class="mb-24" />

    <Cities
      v-if="territoire.type == 'city'"
      :territoire="territoire"
      :cities="cities"
    />

    <Associations :territoire="territoire" />

    <Engagement :territoire="territoire" />

    <Subscribe :territoire="territoire" />
  </div>
</template>

<script>
import TerritoireBanner from '@/components/section/territoire/Banner'
import Search from '@/components/section/territoire/Search'
import Promote from '@/components/section/territoire/Promote'
import Cities from '@/components/section/territoire/Cities'
import Associations from '@/components/section/territoire/Associations'
import Engagement from '@/components/section/territoire/Engagement'
import Subscribe from '@/components/section/territoire/Subscribe'

export default {
  components: {
    TerritoireBanner, Promote, Cities, Associations, Engagement, Subscribe, Search
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
      const { data: cities } = await this.$axios.get(`/territoires/${this.territoire.id}/available-cities`)
      this.cities = cities
    }
  },
  computed: {
    logo () {
      return this.territoire.logo?.urls.small
    }
  }
}
</script>
