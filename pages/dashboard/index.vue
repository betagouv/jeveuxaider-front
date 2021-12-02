<template>
  <div>
    <div>Breadcrumb</div>
    <div>Bonjour {{ $store.state.auth.user.profile.first_name }}</div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated'
}
</script>

<style>

</style>
