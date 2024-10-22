<template>
  <div class="bg-white shadow-lg">
    <div class="p-4">
      <div class="flex flex-wrap gap-2">
        <DsfrTag>{{ type }}</DsfrTag>
        <DsfrTag v-for="activity in activities" :key="activity">
          {{ activity }}
        </DsfrTag>
        <DsfrTag>{{ commitment }}</DsfrTag>
      </div>
    </div>
    <div class="p-4 border-t">BTNS</div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    alert: {
      type: Object,
      default: null,
    },
  },
  computed: {
    type() {
      return this.alert.conditions.type_missions
    },
    activities() {
      return this.alert.conditions.activities
    },
    commitment() {
      return this.alert.conditions.commitment
    },
  },
})
</script>
