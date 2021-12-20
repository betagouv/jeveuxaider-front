<template>
  <div>
    <Box class="space-y-4">
      <Heading as="h2" :level="3" class="mb-8 text-jva-gray-900">
        Inputs
      </Heading>
      <div>
        <FormLabel html-for="input1">
          E-mail
        </FormLabel>
        <Input
          v-model="form.input1"
          name="input1"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <FormLabel html-for="input2">
          With suffix
        </FormLabel>
        <Input
          v-model="form.input2"
          name="input2"
          type="number"
          placeholder="1"
          suffix="bénévoles"
        />
      </div>
      <div>
        <FormLabel html-for="input3">
          Mot de passe
        </FormLabel>
        <Input
          v-model="form.input3"
          name="input3"
          type="password"
          placeholder="Votre mot de passe"
        />
      </div>
      <div>
        <FormLabel html-for="input4">
          LinkedIn
        </FormLabel>
        <Input
          v-model="form.input4"
          name="input4"
          placeholder="https://linkedin.com/"
          icon="LinkIcon"
        />
      </div>
      <div>
        <FormLabel html-for="input5">
          Clearable
        </FormLabel>
        <Input
          v-model="form.input5"
          name="input5"
          placeholder="Profession"
          clearable
        />
      </div>
    </Box>
  </div>
</template>

<script>

export default {
  layout: 'design-system',
  data () {
    return {
      form: {
        firstname: 'Nicolas',
        state: 'validated',
        notifications: ['comments'],
        domaines: [1, 5],
        select_advanced: 'waiting',
        select_advanced_id: 4
      },
      geoSelected: null,
      autocompleteOptions: []
    }
  }
}
</script>
