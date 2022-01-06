<template>
  <div>
    <div>
      {{ message }}
    </div>
    <ul v-if="errors" class="text-sm list-disc pl-4">
      <template v-if="Array.isArray(errors)">
        <li v-for="error, index in errors" :key="index">
          {{ error }}
        </li>
      </template>
      <template v-else>
        <li v-for="error, index in Object.entries(errors)" :key="index">
          {{ error[1][0] }}
        </li>
      </template>
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
      type: [Object, Array], default: null
    }
  }
}
</script>

<style>

</style>
