<template>
  <div>
    <Box>
      <Heading as="h2" :level="3" class="mb-4 text-jva-gray-900">
        Radio
      </Heading>
      <FormControl
        label="Radio Buttons"
      >
        <RadioGroup v-model="form.type" :options="$labels.mission_types" />
      </FormControl>

      <RadioGroup v-model="form.duration" class="mt-8" :options="$labels.duration" />
    </Box>
  </div>
</template>

<script>

export default {
  layout: 'design-system',
  data () {
    return {
      form: {
      }
    }
  }

}
</script>
