<template>
  <div>
    <div>Sélectionnez les activités pour lesquelles vous souhaitez aider</div>
    <div>
      <div>Quelques heures</div>
      <div>Quelques jours</div>
      <div>De manière récurrente</div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    selectableActivities: {
      type: Array,
      default () {
        return [1, 2, 3]
      }
    }
  },
  data () {

  },
  created () {
    // console.log('route', this.$route)
  }
}
</script>

<style>

</style>
