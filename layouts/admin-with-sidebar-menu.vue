<template>
  <div class="h-full">
    <Header />
    <div class="container">
      <div class="min-h-[92px] md:min-h-[116px]">
        <portal-target name="breadcrumb" />
      </div>
      <div class="grid lg:grid-cols-5 gap-6 lg:gap-12 pb-6 lg:pb-12">
        <aside class="relative lg:col-span-1">
          <div class="lg:block">
            <SecondaryMenuAdmin v-if="$store.getters.contextRole === 'admin'" />
            <SecondaryMenuResponsable v-if="$store.getters.contextRole === 'responsable'" />
            <SecondaryMenuTeteDeReseau v-if="$store.getters.contextRole === 'tete_de_reseau'" />
          </div>
        </aside>
        <div class="lg:col-span-4 min-w-0">
          <Nuxt />
          <portal-target name="drawer" class="relative z-20" multiple />
        </div>
      </div>
    </div>
    <Footer />

    <client-only>
      <portal-target name="body-end" multiple />
    </client-only>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import SecondaryMenuAdmin from '@/components/menu/SecondaryMenuAdmin'
import SecondaryMenuResponsable from '@/components/menu/SecondaryMenuResponsable'
import SecondaryMenuTeteDeReseau from '@/components/menu/SecondaryMenuTeteDeReseau'
import MixinPlausible from '@/mixins/plausible.js'

export default {
  name: 'Dashboard',
  components: {
    Header,
    Footer,
    SecondaryMenuAdmin,
    SecondaryMenuResponsable,
    SecondaryMenuTeteDeReseau
  },
  mixins: [MixinPlausible],
  middleware: 'authenticated'
}
</script>
