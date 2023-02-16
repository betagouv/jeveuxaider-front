<template>
  <div class="bg-yellow-200">
    <div>Fullname: {{ user.profile.full_name }}</div>
    <div>Zip: {{ user.profile.zip }}</div>
    <div v-if="isBenevole">
      {{ user.profile.service_civique ? 'Service civique' : 'Pas service civique' }}
    </div>
    <div>Mobile: {{ user.profile.mobile }}</div>
    <div>Email: {{ user.profile.email }}</div>
    <div v-if="isBenevole">
      Bouton Infos (Drawer ? Maquettes ?)
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    isBenevole: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>
