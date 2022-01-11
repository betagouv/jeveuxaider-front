<template>
  <div>
    <Box>
      <Heading as="h2" :level="3" class="mb-4 text-jva-gray-900">
        Textarea
      </Heading>
      <FormControl
        label="Présentation"
      >
        <Textarea
          v-model="form.information"
          placeholder="Quelques mots sur votre parcours"
        />
      </FormControl>
      <Heading as="h2" :level="3" class="mt-8 mb-4 text-jva-gray-900">
        Rich Editor
      </Heading>
      <FormControl
        label="Quelques mots pour motiver les bénévoles à participer"
      >
        <RichEditor
          v-model="form.information"
          placeholder="Incitez les bénévoles à candidater ..."
        />
      </FormControl>
      <FormControl
        label="Disabled"
        class="mt-8"
      >
        <RichEditor
          v-model="form.information_disabled"
          :disabled="true"
        />
      </FormControl>
    </Box>
  </div>
</template>

<script>

export default {
  layout: 'design-system',
  data () {
    return {
      form: {
        information_disabled: 'Vestibulum id tortor mattis, elementum tellus sodales, pulvinar orci. Ut at pellentesque leo. Proin suscipit rhoncus ex, sed rutrum urna feugiat vel. Proin eu convallis massa.'
      }
    }
  },
  methods: {
  }
}
</script>
