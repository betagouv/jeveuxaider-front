<template>
  <div>
    <div v-if="title" class="mb-2 font-bold">
      {{ title }}
    </div>
    <div class="">
      {{ message }}
    </div>
    <ul v-if="errors" class="text-sm list-disc pl-4 mt-2">
      <!-- from setErrors() -->
      <template v-if="Array.isArray(errors)">
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </template>
      <!-- from useFetcher -->
      <template v-else>
        <li v-for="(error, index) in Object.entries(errors)" :key="index">
          {{ error[1][0] }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    errors: {
      type: [Object, Array],
      default: null,
    },
  },
})
</script>
