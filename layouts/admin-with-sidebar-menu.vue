<template>
  <div class="h-full">
    <HeaderBanner />
    <Header />
    <div class="container">
      <portal-target name="breadcrumb" />
      <div class="grid lg:grid-cols-5 gap-6 lg:gap-12 py-6 lg:py-12">
        <aside class="relative lg:col-span-1">
          <div class="hidden lg:block sticky top-12">
            <SecondaryMenuAdmin v-if="$store.getters.contextRole === 'admin'" />
            <SecondaryMenuResponsable v-if="$store.getters.contextRole === 'responsable'" />
            <SecondaryMenuTeteDeReseau v-if="$store.getters.contextRole === 'tete_de_reseau'" />
          </div>
          <div class="block lg:hidden">
            <div class="col-span-2 bg-yellow-100 p-4 text-sm rounded-lg">
              @TODO Menu dans select list
            </div>
          </div>
        </aside>
        <div class="lg:col-span-4">
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
