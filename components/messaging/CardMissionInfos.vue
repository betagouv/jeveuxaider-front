<template>
  <div class="bg-blue-200">
    <div>Id: {{ mission.id }}</div>
    <div>Nom: {{ mission.name }}</div>
    <template v-if="mission.type == 'Mission à distance'">
      <div>Type: Mission à distance</div>
    </template>
    <template v-if="mission.type == 'Mission en présentiel'">
      <div>Type: Mission en présentiel</div>
      <div>Villes: {{ mission.city }} ({{ mission.zip }})</div>
    </template>
    <div>Places restantes: {{ mission.places_left }}</div>
  </div>
</template>

<script>
export default {
  props: {
    mission: {
      type: Object,
      required: true
    }
  },
  computed: {

  }
}
</script>

<style>

</style>
