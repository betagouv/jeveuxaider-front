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
            <SecondaryMenuSupport />
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
import SecondaryMenuSupport from '@/components/menu/SecondaryMenuSupport'

export default {
  name: 'Dashboard',
  components: {
    Header,
    Footer,
    SecondaryMenuSupport
  },
  middleware: 'admin'
}
</script>

<style scoped>

</style>
