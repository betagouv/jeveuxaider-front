<template>
  <div>
    <div class="flex space-x-4">
      <BaseFormControl html-for="start" class="flex-1">
        <BaseInput
          :modelValue="$route.query?.start"
          name="start"
          type="date"
          @update:modelValue="handleChange"
        />
      </BaseFormControl>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  data() {
    return {}
  },
  methods: {
    handleChange(value) {
      const date = new Date(value)
      if (!isNaN(date) && date.getFullYear() > 1970) {
        this.$router.push({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            start: value,
            page: undefined,
          },
        })
      }
    },
  },
})
</script>
