<template>
  <div class="h-full">
    <HeaderBanner />
    <Header />
    <div class="container">
      <portal-target name="breadcrumb" />
      <div class="grid grid-cols-5 py-12">
        <aside class="relative col-span-1">
          <div class="sticky top-12">
            <SecondaryMenuAdmin v-if="$store.getters.contextRole === 'admin'" />
            <SecondaryMenuResponsable v-if="$store.getters.contextRole === 'responsable'" />
            <SecondaryMenuTeteDeReseau v-if="$store.getters.contextRole === 'tete_de_reseau'" />
          </div>
        </aside>
        <div class="col-span-4">
          <Nuxt />
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
import HeaderBanner from '@/components/layout/HeaderBanner.vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import SecondaryMenuAdmin from '@/components/menu/SecondaryMenuAdmin'
import SecondaryMenuResponsable from '@/components/menu/SecondaryMenuResponsable'
import SecondaryMenuTeteDeReseau from '@/components/menu/SecondaryMenuTeteDeReseau'

export default {
  name: 'Dashboard',
  components: {
    HeaderBanner,
    Header,
    Footer,
    SecondaryMenuAdmin,
    SecondaryMenuResponsable,
    SecondaryMenuTeteDeReseau
  },
  middleware: 'authenticated'
}
</script>

<style scoped>

</style>
