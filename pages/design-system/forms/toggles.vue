<template>
  <div>
    <Box>
      <Heading as="h2" :level="3" class="mb-4 text-jva-gray-900">
        Toggles
      </Heading>
      <Toggle
        v-model="form.is_visible"
        :label="form.is_visible ? 'Visible des organisations' : 'Invisible des organisations'"
        description="Souhaitez-vous que les organisations de la plateforme vous proposent des missions ?"
      />
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
