<template>
  <div class="bg-yellow-200">
    <template v-if="variant === 'benevole'">
      <div>Fullname: {{ user.profile.full_name }}</div>
      <div>Zip: {{ user.profile.zip }}</div>
      <div>{{ user.profile.service_civique ? 'Service civique' : 'Pas service civique' }}</div>
      <div>Mobile: {{ user.profile.mobile }}</div>
      <div>Email: {{ user.profile.email }}</div>
      <div>
        Bouton Infos (Drawer ? Maquettes ?)
      </div>
    </template>
    <template v-if="variant === 'responsable'">
      <div>Fullname: {{ user.profile.full_name }}</div>
      <div>Responsable: structure.name</div>
      <div>Mobile: {{ user.profile.mobile }}</div>
      <div>Email: {{ user.profile.email }}</div>
    </template>
    <template v-if="variant === 'responsable'">
      <div>Fullname: {{ user.profile.full_name }}</div>
      <div>Référent du département: department.name</div>
      <div>Mobile: {{ user.profile.mobile }}</div>
      <div>Email: {{ user.profile.email }}</div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    variant: {
      type: String,
      required: true,
      validator: s => ['benevole', 'responsable', 'referent'].includes(s)
    }
  }
}
</script>

<style>

</style>
