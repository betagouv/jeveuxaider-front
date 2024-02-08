<template>
  <div>
    <div class="flex space-x-4">
      <BaseFormControl html-for="start" class="flex-1">
        <BaseInput
          :modelValue="$route.query?.start"
          name="start"
          type="date"
          @update:modelValue="handleChangeStart"
        />
      </BaseFormControl>
      <div class="flex items-center text-[#7B7B7B]">au</div>
      <BaseFormControl html-for="end" class="flex-1">
        <BaseInput
          :modelValue="$route.query?.end"
          name="end"
          type="date"
          @update:modelValue="handleChangeEnd"
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
    handleChangeStart(value) {
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
    handleChangeEnd(value) {
      const date = new Date(value)
      if (!isNaN(date) && date.getFullYear() > 1970) {
        this.$router.push({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            end: value,
            page: undefined,
          },
        })
      }
    },
  },
})
</script>
