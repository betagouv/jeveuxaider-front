<template>
  <div class="bg-blue-200">
    <div>Id: {{ organisation.id }}</div>
    <div>Nom: {{ organisation.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    organisation: {
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
