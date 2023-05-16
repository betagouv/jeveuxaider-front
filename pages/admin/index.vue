<template>
  <div>
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Administration' },
          { text: `Quelles sont les news ?` },
        ]"
      />
    </portal>
    <SectionHeading :title="`Quelles sont les news ?`" :secondary-title="`Bonjour ${$store.state.auth.user.profile.first_name }`" />
    <div class="space-y-12 mt-12">
      <div>
        <Heading as="h2" size="xl" class="mb-6">
          🚀 Objectifs
        </Heading>
        <JVAGoals class="col-span-6" />
      </div>
      <div>
        <Heading as="h2" size="xl" class="mb-6">
          💥 Pages les plus consultées
        </Heading>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <PlausiblePageViews title="Missions" params-filters="event:page==/missions-benevolat/*/benevolat-*" />
          <PlausiblePageViews title="Blog" params-filters="event:page==/engagement/**" />
        </div>
      </div>
      <div>
        <Heading as="h2" size="xl" class="mb-6">
          🔥 Trending
        </Heading>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <MissionsTrending />
          <OrganisationsTrending />
        </div>
      </div>
      <div>
        <Heading as="h2" size="xl" class="mb-6">
          🌟 Topito
        </Heading>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <TopitoAdmins />
          <TopitoReferents />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import TopitoAdmins from '~/components/section/admin/TopitoAdmins.vue'
import TopitoReferents from '~/components/section/admin/TopitoReferents.vue'
import MissionsTrending from '@/components/section/admin/MissionsTrending.vue'
import OrganisationsTrending from '@/components/section/admin/OrganisationsTrending.vue'
import PlausiblePageViews from '~/components/section/admin/PlausiblePageViews.vue'
import JVAGoals from '~/components/section/admin/JVAGoals.vue'
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    Breadcrumb,
    MissionsTrending,
    OrganisationsTrending,
    JVAGoals,
    Heading,
    TopitoAdmins,
    TopitoReferents,
    PlausiblePageViews
  },
  layout: 'admin-with-sidebar-menu',
  middleware: 'admin',
  data () {
    return {
    }
  }
}
</script>
