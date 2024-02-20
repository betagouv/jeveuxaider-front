<template>
  <div class="h-full">
    <Header />
    <div class="container">
      <div class="min-h-[92px] md:min-h-[116px]">
        <div id="teleport-breadcrumb"></div>
      </div>
      <div class="grid lg:grid-cols-5 gap-6 lg:gap-12 pb-6 lg:pb-12">
        <aside class="relative lg:col-span-1">
          <div class="lg:block">
            <SecondaryMenuAdmin v-if="$stores.auth.contextRole === 'admin'" />
            <SecondaryMenuResponsable v-if="$stores.auth.contextRole === 'responsable'" />
            <SecondaryMenuTeteDeReseau v-if="$stores.auth.contextRole === 'tete_de_reseau'" />
          </div>
        </aside>
        <div class="lg:col-span-4 min-w-0">
          <NuxtPage />
          <div id="teleport-drawer" class="relative z-50"></div>
        </div>
      </div>
    </div>
    <Footer />
    <div id="teleport-body-end"></div>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import SecondaryMenuAdmin from '@/components/menu/SecondaryMenuAdmin.vue'
import SecondaryMenuResponsable from '@/components/menu/SecondaryMenuResponsable.vue'
import SecondaryMenuTeteDeReseau from '@/components/menu/SecondaryMenuTeteDeReseau.vue'
import MixinPlausible from '@/mixins/plausible.js'

export default {
  components: {
    Header,
    Footer,
    SecondaryMenuAdmin,
    SecondaryMenuResponsable,
    SecondaryMenuTeteDeReseau,
  },
  mixins: [MixinPlausible],
}
</script>
