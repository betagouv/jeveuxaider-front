<template>
  <div class="h-full">
    <HeaderBanner />
    <Header />
    <div class="container">
      <div class="min-h-[92px] md:min-h-[116px]">
        <portal-target name="breadcrumb" />
      </div>
      <div class="grid lg:grid-cols-5 gap-6 lg:gap-12 pb-6 lg:pb-12">
        <aside class="relative lg:col-span-1">
          <div class="lg:block">
            <SecondaryMenuStatisticsPublic />
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
import HeaderBanner from '@/components/layout/HeaderBanner.vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import SecondaryMenuStatisticsPublic from '@/components/menu/SecondaryMenuStatisticsPublic'

export default {
  name: 'Dashboard',
  components: {
    HeaderBanner,
    Header,
    Footer,
    SecondaryMenuStatisticsPublic
  }
}
</script>

<style scoped>

</style>
