<template>
  <div>
    <div>
      {{ message }}
    </div>
    <ul v-if="errors" class="text-sm list-disc pl-4">
      <li v-for="error, index in Object.entries(errors)" :key="index">
        {{ error[1][0] }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String, required: true
    },
    errors: {
      type: Object, default: null
    }
  }
}
</script>

<style>

</style>
