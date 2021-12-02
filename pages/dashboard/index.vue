<template>
  <div class="container">
    <div class="border-b">
      @TODO Breadcrumb
    </div>
    <div class="py-12">
      <Header>
        <div class="text-xl text-gray-600">
          Bonjour {{ $store.state.auth.user.profile.first_name }},
        </div>
        <Heading as="h1" :level="1">
          Ravi de vous retrouver 👋
        </Heading>
        <template #action>
          <div class="p-4 bg-white rounded-xl shadow-lg">
            {{ $options.filters.label($store.getters.contextRole, 'role', 'espace') }}
          </div>
        </template>
      </Header>
    </div>
  </div>
</template>

<script>
import Header from '@/components/dashboard/Header'

export default {
  components: {
    Header
  },
  middleware: 'authenticated'
}
</script>

<style>

</style>
